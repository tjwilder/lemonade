window.lemonade = {
  day: 1,
  cupCost: 0.05,
  signCost: 0.15,
  allTimeProfit: 0,
  dailyProfit: 0,
  randomNum: function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  weather: ['Cloudy', 'Sunny', 'Hot and Dry']
};

let tomorrowWeatherVariant = 3;
let tomorrowForecast = lemonade.weather[tomorrowWeatherVariant];
let todayWeatherVariant = tomorrowWeatherVariant;
let todayForecast = tomorrowForecast;

function nextDay() {
  const cups = document.getElementById('cups')
    .value;
  const price = document.getElementById('price')
    .value;
  const signs = document.getElementById('signs')
    .value;
  if (lemonade.day < 2) {

  }
  todayWeatherVariant = tomorrowWeatherVariant;
  todayForecast = tomorrowForecast;

  const marketing = Math.round((signs / price) * ((todayWeatherVariant / 1.5) + 1));
  let sold = marketing;
  if (marketing > cups) { sold = cups; }
  const profits = Math.round((sold * price) * 100) / 100;
  const expenses = Math.round(((signs * lemonade.signCost) + (cups * lemonade.cupCost)) * 100) / 100;
  lemonade.dailyProfit = Math.round((profits - expenses) * 100) / 100;
  lemonade.allTimeProfit = (Math.round(lemonade.allTimeProfit * 100) / 100) + lemonade.dailyProfit;
  Materialize.toast('Day: ' + lemonade.day, 5000);
  Materialize.toast('Cups Sold: ' + sold, 5000);
  Materialize.toast('Expenses: $' + expenses, 5000);
  Materialize.toast('Profits: $' + profits, 5000);
  Materialize.toast('All-time Profit: $' + lemonade.allTimeProfit, 5000);
  tomorrowWeatherVariant = lemonade.randomNum(0, 3);
  tomorrowForecast = lemonade.weather[tomorrowWeatherVariant];
  Materialize.toast('Forecast: ' + tomorrowForecast, 5000);
  lemonade.dailyProfit = 0;
  lemonade.day++;
}

document.getElementById('play')
  .addEventListener('click', nextDay);
