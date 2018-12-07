const fs = require('fs');

const path = require('path');

const getFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDir = fs.statSync(name).isDirectory();
    const nestedFiles = isDir ? getFiles(name) : [name];

    return [...files, ...nestedFiles];
  }, []);
};

// 000 are flags for label, agent, and explanation
const experiments = {
  '000': [],
  '001': [],
  '010': [],
  '011': [],
  100: [],
  101: [],
  110: [],
  111: [],
};

// Loads a file of type "something/something/file.something"
const loadExperiment = (filename) => {
  const baseFile = filename.split('/')[2].split('.')[0];
  const split = baseFile.split('-');
  const experimentType = split[0];
  const id = split[1];

  const experiment = JSON.parse(fs.readFileSync(filename, 'utf8'));
  experiment.id = id;

  experiments[experimentType].push(experiment);
};

const loadExperiments = () => {
  const files = getFiles('./data');
  for (const key in files) {
    loadExperiment(files[key]);
  }
};

// From the game
const cupsSold = (data) => {
  const cupFactor = 0.5;
  // At least half as many lemons as cups
  const lemonFactor = data.lemons / data.cups > 0.5 ? 1.3 : 0.8;
  // More sugar than lemons
  const sugarFactor = data.sugar > data.lemons ? 1.3 : 0.8;
  // Basic check for "enough" ice
  const lemonIce = (0.5 * (data.ice + data.cups)) / data.ice;
  const iceFactor = Math.min(1 / lemonIce, 1.3);

  const priceFactor = 1.2 / data.price;

  // Sell at least one based on the ceiling of the factors
  return Math.max(Math.ceil(
    data.cups
          * cupFactor
          * lemonFactor
          * sugarFactor
          * iceFactor
          * priceFactor
  ),
  1);
};

// From game
const profitForDay = (data) => {
  const expenses = data.cups * 0.5
    + data.lemons * 0.5
    + data.sugar * 0.25
    + data.ice * 0.05;
  return parseFloat(cupsSold(data) * data.price - expenses).toFixed(2);
};

const tookRecommendation = (data, day) => {
  const recommendations = [
    {
      cups: 5,
      lemons: 3,
      sugar: 5,
      ice: 10,
      price: 1.3,
    },
    {
      cups: 5,
      lemons: 3,
      sugar: 3,
      ice: 2,
      price: 1.3,
    },
    {
      cups: 8,
      lemons: 3,
      sugar: 5,
      ice: 10,
      price: 1.5,
    },
    {
      cups: 3,
      lemons: 2,
      sugar: 1,
      ice: 0,
      price: 0.6,
    },
    {
      cups: 7,
      lemons: 3,
      sugar: 5,
      ice: 10,
      price: 2.0,
    },
    {
      cups: 9,
      lemons: 4,
      sugar: 5,
      ice: 13,
      price: 1.3,
    },
    {
      cups: 10,
      lemons: 6,
      sugar: 7,
      ice: 11,
      price: 1.8,
    },
  ];

  return JSON.stringify(recommendations[day]) === JSON.stringify(data);
};

const experimentsToDays = () => {
  const allDays = {};
  for (const experimentType in experiments) {
    allDays[experimentType] = [];
    for (const expKey in experiments[experimentType]) {
      const exp = experiments[experimentType][expKey];
      exp.days = [];
      const data = {
        cups: 0,
        lemons: 0,
        sugar: 0,
        ice: 0,
        price: 0,
      };
      let curDay = 0;
      for (const eventKey in exp.events) {
        const event = exp.events[eventKey];
        if (event.type === 'onChange') {
          data[event.id] = event.value;
        } else if (event.type === 'nextDay') {
          data.cups = event.cups;
          data.lemons = event.lemons;
          data.sugar = event.sugar;
          data.ice = event.ice;
          data.price = event.price;
          const dayResults = {
            cups: data.cups,
            lemons: data.lemons,
            sugar: data.sugar,
            ice: data.ice,
            price: data.price,
            profit: profitForDay(data),
            recommendation: tookRecommendation(data, curDay),
          };
          exp.days.push(dayResults);
          curDay += 1;
        }
      }
      // Add the last day which there is no event for
      exp.days.push({
        cups: data.cups,
        lemons: data.lemons,
        sugar: data.sugar,
        ice: data.ice,
        price: data.price,
        profit: profitForDay(data),
        recommendation: tookRecommendation(data, curDay),
      });

      exp.events = undefined;
      if (exp.days.length === 7) {
        allDays[experimentType].push(exp);
      }
    }
  }
  return allDays;
};

const aggregateDays = (days) => {
  const allAggregates = {};
  for (const experimentType in days) {
    const experiment = experiments[experimentType];
    const aggregates = {
      cups: 0,
      lemons: 0,
      sugar: 0,
      ice: 0,
      price: 0,
      profit: 0,
      recommendations: 0,
      days: 0,
    };
    for (const expKey in experiment) {
      const exp = experiment[expKey];
      for (const dayKey in exp.days) {
        const day = exp.days[dayKey];
        aggregates.cups += parseInt(day.cups, 0);
        aggregates.lemons += parseInt(day.lemons, 0);
        aggregates.sugar += parseInt(day.sugar, 0);
        aggregates.ice += parseInt(day.ice, 0);
        aggregates.price += parseFloat(day.price, 0);
        aggregates.profit += parseFloat(day.profit, 0);
        aggregates.recommendations += day.recommendation ? 1 : 0;
        aggregates.days += 1;
      }
    }
    aggregates.cups /= aggregates.days;
    aggregates.lemons /= aggregates.days;
    aggregates.sugar /= aggregates.days;
    aggregates.ice /= aggregates.days;
    aggregates.price /= aggregates.days;
    aggregates.profit /= aggregates.days;
    aggregates.recommendationPercent = aggregates.recommendations / aggregates.days;
    allAggregates[experimentType] = aggregates;
  }
  return allAggregates;
};

loadExperiments();

const days = experimentsToDays();
// console.log(JSON.stringify(days));
const aggregates = aggregateDays(days);
console.log(JSON.stringify(aggregates));
