const lemonade = {
  day: 1,
  cupCost: 0.5,
  lemonCost: 0.5,
  sugarCost: 0.25,
  iceCost: 0.05,
  allTimeProfit: 150,
  dailyProfit: 0,
  confidence: 3,
  tomorrowWeatherVariant: 3,
  tomorrowForecast: '',
  todayWeatherVariant: 3,
  todayForecast: '',
  sold: 0,
  eventList: [],
  label: 'Recommendation Agent',
  emotion: document.getElementById('emotionDisplay'),
  // forecastDisplay: document.getElementById("forecastDisplay"),
  bar: document.getElementById('percentageBar'),
  play: document.getElementById('play'),
  cupsVar: document.getElementById('cups'),
  lemonsVar: document.getElementById('lemons'),
  sugarVar: document.getElementById('sugar'),
  iceVar: document.getElementById('ice'),
  priceVar: document.getElementById('price'),
  // Recommendation variables
  recommendationVar: document.getElementsByClassName('recommendation')[0],
  recommendationPageVar: document.getElementById('recommendation-page'),
  explanationPageVar: document.getElementById('explanation-page'),
  recommendationLabelVar: document.getElementById('recommendation-label'),
  infoButtonVar: document.getElementById('info-button'),
  agentVar: document.getElementById('agent'),
  speechVar: document.getElementById('speech'),
  cupsRecVar: document.getElementById('cups-rec'),
  lemonsRecVar: document.getElementById('lemons-rec'),
  sugarRecVar: document.getElementById('sugar-rec'),
  iceRecVar: document.getElementById('ice-rec'),
  priceRecVar: document.getElementById('price-rec'),
  explanationErrorChanceVar: document.getElementById(
    'explanation-page-error-chance',
  ),
  // Alert variables
  alertVar: document.getElementById('alert-modal'),
  alertTextVar: document.getElementById('alert-text'),
  alertCloseVar: document.getElementById('alert-close'),
  // Animation variables
  strawVar: () => document.getElementById('straw'),
  lemonVar: () => document.getElementById('lemon'),
  glassTopVar: () => document.getElementById('glassTop'),
  glassBottomVar: () => document.getElementById('glassBottom'),
  lemonade1: document.getElementById('lemonade1'),
  lemonade2: document.getElementById('lemonade2'),
  dayDisplayVar: document.getElementById('dayDisplay'),
  cupsSoldDisplayVar: document.getElementById('cupsSoldDisplay'),
  grandTotalDisplayVar: document.getElementById('grandTotalDisplay'),
  weather: [
    'mdi mdi-weather-lightning-rainy mdi-36px',
    'mdi mdi-weather-cloudy mdi-36px',
    'mdi mdi-weather-partlycloudy mdi-36px',
    'mdi mdi-weather-sunny mdi-36px',
  ],
  emotionBank: [
    'mdi mdi-emoticon-dead mdi-36px',
    'mdi mdi-emoticon-sad mdi-36px',
    'mdi mdi-emoticon-neutral mdi-36px',
    'mdi mdi-emoticon mdi-36px',
    'mdi mdi-emoticon-excited mdi-36px',
    'mdi mdi-emoticon-cool mdi-36px',
  ],
  recommendations: [
    {
      cups: 5,
      lemons: 3,
      sugar: 5,
      ice: 10,
      price: 1.3,
      explanation_error_chance: 4.6,
    },
    {
      cups: 5,
      lemons: 3,
      sugar: 3,
      ice: 2,
      price: 1.3,
      explanation_error_chance: 5.0,
    },
    {
      cups: 8,
      lemons: 3,
      sugar: 5,
      ice: 10,
      price: 1.5,
      explanation_error_chance: 4.1,
    },
    {
      cups: 3,
      lemons: 2,
      sugar: 1,
      ice: 0,
      price: 0.6,
      explanation_error_chance: 4.3,
    },
    {
      cups: 7,
      lemons: 3,
      sugar: 5,
      ice: 10,
      price: 2.0,
      explanation_error_chance: 4.2,
    },
    {
      cups: 9,
      lemons: 4,
      sugar: 5,
      ice: 13,
      price: 1.3,
      explanation_error_chance: 5.1,
    },
    {
      cups: 10,
      lemons: 6,
      sugar: 7,
      ice: 11,
      price: 1.8,
      explanation_error_chance: 4.7,
    },
  ],
  recommendationIndex: 0,
  // TJ: Disabled diagnostics
  // diagnostic: signs => {
  //   console.debug(
  //     `${lemonade.signsVar.valueAsNumber} signs market: ${lemonade.stringRound(
  //       signs
  //     )} Cost: $${lemonade.stringRound(
  //       lemonade.priceVar.valueAsNumber
  //     )} Weather ${lemonade.todayWeatherVariant} Sold ${lemonade.sold} cups`
  //   );
  // },
  setLabel: (label) => {
    lemonade.recommendationLabelVar.innerText = label;
  },
  toggleAgent: () => {
    if (lemonade.agentVar.style.display === 'none') {
      lemonade.agentVar.style.display = 'block';
      lemonade.recommendationVar.classList.add('bubble');
      lemonade.speechVar.style.display = 'block';
    } else {
      lemonade.agentVar.style.display = 'none';
      lemonade.recommendationVar.classList.remove('bubble');
      lemonade.speechVar.style.display = 'none';
    }
  },
  toggleExplanation: () => {
    if (lemonade.infoButtonVar.style.display === 'none') {
      lemonade.infoButtonVar.style.display = 'block';
    } else {
      lemonade.infoButtonVar.style.display = 'none';
    }
  },
  nextPage: () => {
    const disp = lemonade.recommendationPageVar.style.display;
    lemonade.recommendationPageVar.style.display = disp === 'none' ? 'block' : 'none';
    lemonade.explanationPageVar.style.display = disp === 'none' ? 'none' : 'block';
  },
  changeEvent: (event) => {
    lemonade.eventList.push({
      type: 'onChange',
      timestamp: new Date().getTime(),
      id: event.target.id,
      value: event.target.value,
    });
  },
  inputEvent: (event) => {
    const { min, max, value } = event.target;

    const range = max - min;
    const position = ((value - min) / range) * 100;
    const offset = position / 5;

    const output = event.target.nextSibling.nextSibling.nextSibling;

    output.style.left = `calc(${position}% - ${offset}px)`;
    output.innerText = value;
  },
  addEventListeners: () => {
    // Input event to force first update of thumbs
    const inputEvent = document.createEvent('HTMLEvents');
    inputEvent.initEvent('input', true, true);

    lemonade.infoButtonVar.addEventListener('click', lemonade.nextPage);
    lemonade.play.addEventListener('click', lemonade.alertNextDay);

    lemonade.cupsVar.addEventListener('change', lemonade.changeEvent);
    lemonade.cupsVar.addEventListener('input', lemonade.inputEvent);
    lemonade.cupsVar.dispatchEvent(inputEvent);

    lemonade.lemonsVar.addEventListener('change', lemonade.changeEvent);
    lemonade.lemonsVar.addEventListener('input', lemonade.inputEvent);
    lemonade.lemonsVar.dispatchEvent(inputEvent);

    lemonade.sugarVar.addEventListener('change', lemonade.changeEvent);
    lemonade.sugarVar.addEventListener('input', lemonade.inputEvent);
    lemonade.sugarVar.dispatchEvent(inputEvent);

    lemonade.iceVar.addEventListener('change', lemonade.changeEvent);
    lemonade.iceVar.addEventListener('input', lemonade.inputEvent);
    lemonade.iceVar.dispatchEvent(inputEvent);

    lemonade.priceVar.addEventListener('change', lemonade.changeEvent);
    lemonade.priceVar.addEventListener('input', lemonade.inputEvent);
    lemonade.priceVar.dispatchEvent(inputEvent);
  },
  whenLoaded: () => {
    lemonade.pourIn();
    lemonade.addEventListeners();
    lemonade.displayUpdate();
    document.getElementById('loader').remove();
    document.getElementById('play').className += ' scale-in';
    lemonade.getExperiment();
    window.Materialize.toast("It's a nice day to sell Lemonade!", 5000);
  },
  getExperiment: () => {
    fetch('/experiment', { method: 'POST' })
      .then(res => res.json())
      .then((json) => {
        if (json.label) lemonade.setLabel(lemonade.label);
        if (json.agent) lemonade.toggleAgent();
        if (json.explanation) lemonade.toggleExplanation();
        lemonade.id = json.id;
      });
  },
  putExperiment: () => {
    fetch(`/experiment/${lemonade.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ events: lemonade.eventList }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => console.log('PUT Experiment'));
  },
  // TJ: No need for cheats
  cheat: () => {
    lemonade.cheating = true;
    window.Materialize.toast('Cheat enabled', 4000);
    lemonade.day = 40000;
    lemonade.allTimeProfit = 40000;
    lemonade.confidence = 3;
    lemonade.tomorrowForecast = lemonade.cheatWeather;
    lemonade.cupsVar.valueAsNumber = 300;
    lemonade.signsVar.valueAsNumber = 0;
    lemonade.priceVar.valueAsNumber = 2.5;
    lemonade.cheatWeather = 2;
    // lemonade.randomNumber = () => 3;
    lemonade.displayUpdate();
    for (let i = 14; i > 0; i -= 1) {
      // lemonade.cupsVar.valueAsNumber += 2;
      lemonade.priceVar.valueAsNumber += 0.5;
      // lemonade.cheatWeather -= 1;
      lemonade.nextDay();
    }
    return 'You are cheating!';
  },
  // Disable marketing
  // marketingResult: () => {
  //   let signs = lemonade.signs ** 2 / Math.log1p(lemonade.signs);
  //   if (isNaN(signs) || signs < 1) signs = 0;
  //   if (lemonade.cheating) lemonade.diagnostic(signs);
  //   const confidence = lemonade.randomNumber(1, 3.5) * lemonade.confidence;
  //   const price = lemonade.price;
  //   const weather = lemonade.todayWeatherVariant ** 2 + 1;
  //   const result = ((signs + confidence) / price) * weather;
  //   return result;
  // },
  toastVar: () => document.getElementById('toast-container').innerHTML,
  randomNumber: (min, max) => Math.floor(Math.random() * (max - min)) + min,
  stringRound: equation => equation.toFixed(2),
  twoDecimals: equation => Math.round(equation * 100) / 100,
  average: () => (lemonade.allTimeProfit - lemonade.dailyProfit) / lemonade.day,
  determineConfidence: () => {
    if (lemonade.allTimeProfit < 0) {
      lemonade.confidence = 0;
      lemonade.clearToast();
      window.Materialize.toast('Bankrupt! Better luck next time!', 30000);
      lemonade.play.removeEventListener('click', lemonade.nextDay);
      lemonade.play.addEventListener('click', lemonade.newGame);
      lemonade.pourOut();
      lemonade.clean();
    } else if (lemonade.dailyProfit === 0) {
      lemonade.confidence = 2;
      // console.log('option 0 ' + lemonade.confidence);
    } else if (lemonade.dailyProfit < lemonade.average()) {
      lemonade.confidence = 1;
      // console.log('option 1 ' + lemonade.confidence);
    } else if (lemonade.dailyProfit - lemonade.average() < 60) {
      lemonade.confidence = Math.round(
        (lemonade.dailyProfit - lemonade.average()) / 20 + 2,
      );
      // console.log('option 2 ' + lemonade.confidence);
    } else {
      lemonade.confidence = 5;
      // console.log('option 3 ' + lemonade.confidence);
    }
    return lemonade.confidence;
  },
  newGame: () => {
    lemonade.play.removeEventListener('click', lemonade.newGame);
    lemonade.day = 1;
    lemonade.tomorrowWeatherVariant = 3;
    lemonade.todayWeatherVariant = 3;
    lemonade.sold = 0;
    lemonade.allTimeProfit = 150;
    lemonade.dailyProfit = 0;
    // lemonade.emotion.className = lemonade.emotionBank[3];
    lemonade.confidence = 3;
    lemonade.cupsVar.valueAsNumber = 5;
    lemonade.priceVar.valueAsNumber = 1.5;
    lemonade.clearToast();
    window.Materialize.toast("It's a nice day to sell Lemonade!", 5000);
    lemonade.displayUpdate();
    lemonade.pourIn();
    lemonade.play.addEventListener('click', lemonade.nextDay);
  },
  cupsSold: () => {
    const cupFactor = 0.5;
    // At least half as many lemons as cups
    const lemonFactor = lemonade.lemons / lemonade.cups > 0.5 ? 1.3 : 0.8;
    // More sugar than lemons
    const sugarFactor = lemonade.sugar > lemonade.lemons ? 1.3 : 0.8;
    // Basic check for "enough" ice
    const lemonIce = (0.5 * (lemonade.ice + lemonade.cups)) / lemonade.ice;
    const iceFactor = Math.min(1 / lemonIce, 1.3);

    const priceFactor = 1.2 / lemonade.price;

    // Sell at least one based on the ceiling of the factors
    return Math.max(Math.ceil(
      lemonade.cups
          * cupFactor
          * lemonFactor
          * sugarFactor
          * iceFactor
          * priceFactor,
    ),
    1);
  },
  alert: (text, closeText, callback) => {
    lemonade.alertVar.style.display = 'block';
    lemonade.alertTextVar.innerText = text;
    lemonade.alertCloseVar.innerText = closeText;
    lemonade.alertCloseVar.onclick = () => {
      callback();
    };
  },
  alertNextDay: () => {
    // if end of game
    if (lemonade.day === 7) {
      lemonade.alertEndGame();
      return;
    }

    lemonade.alert('Simulating game and recalculating recommendations...',
      'Continue', lemonade.nextDay);
  },
  alertEndGame: () => {
    lemonade.putExperiment();
    let profit = lemonade.allTimeProfit - 150;
    const negative = profit < 0 ? '-' : '';
    profit = lemonade.twoDecimals(Math.abs(profit));
    lemonade.alert(`Congratulations, you finished the game! You earned ${negative}$${profit}.`
      + ` Please copy this code "${lemonade.id}" and paste it into the survey in the "Experiment Identifier".`,
    'Do the survey',
    lemonade.openSurvey);
  },
  openSurvey: () => {
    const newUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScDlXWASwgQMWKGUclkqcuYzbXsQD2d6DIjl7nZkAxxLiZxOg'
      + `/viewform?usp=pp_url&entry.979570377=${lemonade.id}`;
    window.open(newUrl);
  },
  nextDay: () => {
    lemonade.alertVar.style.display = 'none';
    if (window.navigator.vibrate) {
      window.navigator.vibrate(60);
    }
    lemonade.cups = lemonade.cupsVar.valueAsNumber;
    lemonade.lemons = lemonade.lemonsVar.valueAsNumber;
    lemonade.sugar = lemonade.sugarVar.valueAsNumber;
    lemonade.ice = lemonade.iceVar.valueAsNumber;
    lemonade.price = lemonade.priceVar.valueAsNumber;

    lemonade.eventList.push({
      type: 'nextDay',
      timestamp: new Date().getTime(),
      cups: lemonade.cups,
      lemons: lemonade.lemons,
      sugar: lemonade.sugar,
      ice: lemonade.ice,
      price: lemonade.price,
    });

    lemonade.todayWeatherVariant = lemonade.tomorrowWeatherVariant;
    lemonade.todayForecast = lemonade.tomorrowForecast;
    lemonade.expenses = lemonade.twoDecimals(
      lemonade.cups * lemonade.cupCost
        + +lemonade.lemons * lemonade.lemonCost
        + +lemonade.sugar * lemonade.sugarCost
        + +lemonade.ice * lemonade.iceCost,
    );
    if (lemonade.expenses > lemonade.allTimeProfit) {
      lemonade.clearToast();
      lemonade.clean();
      // TJ: If they can't afford it, just tell them
      window.Materialize.toast(
        `You can't afford $${lemonade.stringRound(lemonade.expenses)}!`,
        2000,
      );
      // window.Materialize.toast(
      //   `$${lemonade.stringRound(
      //     lemonade.cupCost
      //   )} per Cup | $${lemonade.stringRound(lemonade.signCost)} per Sign`,
      //   6000
      // );
      // lemonade.cupsVar.valueAsNumber = lemonade.allTimeProfit - 2;
      // lemonade.signsVar.valueAsNumber = 2;
    } else {
      // TJ: changed cups sold to be random
      // lemonade.sold = Math.round(lemonade.marketingResult());
      lemonade.sold = lemonade.cupsSold();
      if (lemonade.sold > 0 && lemonade.sold < lemonade.cups) {
        lemonade.bar.style.width = `${(lemonade.sold / lemonade.cups) * 100}%`;
      } else if (lemonade.sold === 0) {
        lemonade.bar.style.width = 0;
      } else {
        lemonade.sold = lemonade.cups;
        lemonade.bar.style.width = `${(lemonade.sold / lemonade.cups) * 100}%`;
      }
      lemonade.profits = lemonade.twoDecimals(lemonade.sold * lemonade.price);
      lemonade.dailyProfit = lemonade.twoDecimals(
        lemonade.profits - lemonade.expenses,
      );
      lemonade.allTimeProfit += lemonade.dailyProfit;
      lemonade.allTimeProfit = lemonade.twoDecimals(lemonade.allTimeProfit);
      window.Materialize.toast(
        `Revenue: $${lemonade.stringRound(
          lemonade.profits,
        )} | Expense: $${lemonade.stringRound(lemonade.expenses)}`,
        6000,
      );
      lemonade.determineConfidence();
      // TJ: Consistent Weather
      lemonade.tomorrowWeatherVariant = 3; // lemonade.randomNumber(0, 4);
      if (lemonade.cheating) {
        lemonade.tomorrowWeatherVariant = lemonade.cheatWeather;
      }
      lemonade.day += 1;
      lemonade.displayUpdate();
    }
  },
  displayUpdate: () => {
    lemonade.values();
    lemonade.tomorrowForecast = lemonade.weather[lemonade.tomorrowWeatherVariant];
    // lemonade.forecastDisplay.className = lemonade.tomorrowForecast;
    // TJ: Disabled updating the confidence emotion
    // lemonade.emotion.className = lemonade.emotionBank[lemonade.confidence];
    lemonade.dayDisplayVar.innerText = `Day ${lemonade.day}`;
    lemonade.cupsSoldDisplayVar.innerText = `${
      lemonade.sold
    } Cups | $${lemonade.stringRound(lemonade.dailyProfit)} profit`;
    lemonade.grandTotalDisplayVar.innerText = `$${lemonade.stringRound(
      lemonade.allTimeProfit,
    )}`;
    lemonade.updateRecommendations();
  },
  updateRecommendations: () => {
    if (lemonade.recommendationIndex >= lemonade.recommendations.length) {
      lemonade.recommendationIndex = 0;
    }
    const recommendation = lemonade.recommendations[lemonade.recommendationIndex];
    lemonade.recommendationIndex += 1;

    lemonade.explanationErrorChanceVar.innerHTML = recommendation.explanation_error_chance;
    lemonade.cupsRecVar.innerText = `Cups: ${recommendation.cups}`;
    lemonade.lemonsRecVar.innerText = `Lemons: ${recommendation.lemons}`;
    lemonade.sugarRecVar.innerText = `Sugar: ${recommendation.sugar}`;
    lemonade.iceRecVar.innerText = `Ice: ${recommendation.ice}`;
    lemonade.priceRecVar.innerText = `Price: $${recommendation.price.toFixed(2)}`;
  },
  clearToast: () => {
    lemonade.toastVar = '';
  },
  clean: () => {
    if (document.getElementById('range1').children.length > 1) {
      document.getElementById('range1').children[1].remove();
    }
    if (document.getElementById('range2').children.length > 1) {
      document.getElementById('range2').children[1].remove();
    }
    if (document.getElementById('range3').children.length > 1) {
      document.getElementById('range3').children[1].remove();
    }
  },
  resetAnimation: () => {
    lemonade.strawVar().classList.remove('straw2');
    lemonade.lemonVar().classList.remove('lemon2');
    document.getElementById('lemonade1').classList.remove('liquid2');
    document.getElementById('lemonade2').classList.remove('liquid2');
    for (let i = 1; i < 6; i += 1) {
      document.getElementById(`cube${i}`).classList.remove('cubes2');
    }
    lemonade.strawVar().classList.remove('straw');
    lemonade.lemonVar().classList.remove('lemon');
    lemonade.glassTopVar().classList.remove('glass');
    lemonade.glassBottomVar().classList.remove('glass');
    document.getElementById('lemonade1').classList.remove('liquid');
    document.getElementById('lemonade2').classList.remove('liquid');
    for (let cubesOut = 1; cubesOut < 6; cubesOut += 1) {
      document.getElementById(`cube${cubesOut}`).classList.remove('cubes');
    }
  },
  pourIn: () => {
    lemonade.resetAnimation();
    setTimeout(() => {
      lemonade.strawVar().classList.add('straw');
      lemonade.lemonVar().classList.add('lemon');
      document.getElementById('lemonade1').classList.add('liquid');
      document.getElementById('lemonade2').classList.add('liquid');
      for (let i = 1; i < 6; i += 1) {
        document.getElementById(`cube${i}`).classList.add('cubes');
      }
    }, 1);
  },
  pourOut: () => {
    lemonade.resetAnimation();
    setTimeout(() => {
      lemonade.strawVar().classList.add('straw2');
      lemonade.lemonVar().classList.add('lemon2');
      lemonade.glassTopVar().classList.add('glass2');
      lemonade.glassBottomVar().classList.add('glass2');
      lemonade.lemonade1.classList.add('liquid2');
      lemonade.lemonade2.classList.add('liquid2');
      for (let cubesIn = 1; cubesIn < 6; cubesIn += 1) {
        document.getElementById(`cube${cubesIn}`).classList.add('cubes2');
      }
    }, 1);
  },
  values: () => {
    lemonade.cupsVar.max = 15;
    lemonade.lemonsVar.max = 15;
    lemonade.sugarVar.max = 15;
    lemonade.iceVar.max = 15;
    lemonade.priceVar.max = 2.99;
    lemonade.level = 1;
    // else if (lemonade.allTimeProfit < 500) {
    //   lemonade.cupsVar.max = 50;
    //   lemonade.signsVar.max = 10;
    //   lemonade.priceVar.max = 3.99;
    //   if (lemonade.level < 2) {
    //     window.Materialize.toast("Level 2 Upgrade!", 6000);
    //     window.Materialize.toast("More cups, signs and higher price!", 6000);
    //     lemonade.level = 2;
    //     lemonade.clean();
    //   }
    //   if (lemonade.level > 2) {
    //     window.Materialize.toast("Level 2 Downgrade", 6000);
    //     window.Materialize.toast("Less cups, signs and lower price.", 6000);
    //     lemonade.level = 2;
    //     lemonade.clean();
    //   }
    // } else if (lemonade.allTimeProfit < 5000) {
    //   lemonade.cupsVar.max = 140;
    //   lemonade.signsVar.max = 25;
    //   lemonade.priceVar.max = 6.99;
    //   if (lemonade.level < 3) {
    //     window.Materialize.toast("Level 3 Upgrade!", 6000);
    //     window.Materialize.toast("More cups, signs and higher price!", 6000);
    //     lemonade.level = 3;
    //     lemonade.clean();
    //   }
    //   if (lemonade.level > 3) {
    //     window.Materialize.toast("Level 3 Downgrade", 6000);
    //     window.Materialize.toast("Less cups, signs and lower price.", 6000);
    //     lemonade.level = 3;
    //     lemonade.clean();
    //   }
    // } else if (lemonade.allTimeProfit < 10000) {
    //   lemonade.cupsVar.max = 400;
    //   lemonade.signsVar.max = 40;
    //   lemonade.priceVar.max = 9.99;
    //   if (lemonade.level < 4) {
    //     window.Materialize.toast("Level 4 Upgrade!", 6000);
    //     window.Materialize.toast("More cups, signs and higher price!", 6000);
    //     lemonade.level = 4;
    //     lemonade.clean();
    //   }
    //   if (lemonade.level > 4) {
    //     window.Materialize.toast("Level 4 Downgrade", 6000);
    //     window.Materialize.toast("Less cups, signs and lower price.", 6000);
    //     lemonade.level = 4;
    //     lemonade.clean();
    //   }
    // }
  },
  level: 0,
  loadEndOfGamePage: null,
};
window.lemonade = lemonade;
lemonade.values();
