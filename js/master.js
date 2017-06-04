window.lemonade = {
  day: 1,
  cupCost: 0.05,
  signCost: 0.15,
  allTimeProfit: 0,
  dailyProfit: 0,
  randomNum: function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  weather: ['Cloudy', 'Sunny', 'Hot and Dry'],
  tomorrowWeatherVariant: 3,
  tomorrowForecast: 'Hot and Dry',
  todayWeatherVariant: 3,
  todayForecast: 'Hot and Dry',
  nextDay: function nextDay() {
    const cups = document.getElementById('cups')
      .value;
    const price = document.getElementById('price')
      .value;
    const signs = document.getElementById('signs')
      .value;
    if (lemonade.day < 2) {
      lemonade.todayWeatherVariant = 3;
      lemonade.todayForecast = 'Hot and Dry';
    } else {
      lemonade.todayWeatherVariant = lemonade.tomorrowWeatherVariant;
      lemonade.todayForecast = lemonade.tomorrowForecast;
    }
    const marketing = Math.round(((((signs / 1.2) + (lemonade.randomNum(1, 5) / 4.8)) / price) * ((lemonade.todayWeatherVariant / 2.8) + 0.5)));
    let sold = Math.round(marketing);
    if (marketing > cups) { sold = cups; }
    const profits = Math.round((sold * price) * 100) / 100;
    const expenses = Math.round(((signs * lemonade.signCost) + (cups * lemonade.cupCost)) * 100) / 100;
    lemonade.dailyProfit = Math.round((profits - expenses) * 100) / 100;
    lemonade.allTimeProfit += lemonade.dailyProfit;
    lemonade.allTimeProfit = (Math.round(lemonade.allTimeProfit * 100) / 100);
    Materialize.toast('Profits: $' + profits, 5000);
    Materialize.toast('Expenses: $' + expenses, 5000);
    Materialize.toast('Net Total: $' + lemonade.dailyProfit, 5000);

    lemonade.tomorrowWeatherVariant = lemonade.randomNum(0, 3);
    lemonade.tomorrowForecast = lemonade.weather[lemonade.tomorrowWeatherVariant];

    lemonade.dailyProfit = 0;
    lemonade.day++;
    document.getElementById('dayDisplay')
      .innerText = 'Lemonade Day ' + lemonade.day;
    document.getElementById('weatherDisplay')
      .innerText = lemonade.tomorrowForecast + ' Forecast';
    document.getElementById('cupsSoldDisplay')
      .innerText = 'Cups Sold: ' + sold;
    document.getElementById('grandTotalDisplay')
      .innerText = 'Earnings: $' + lemonade.allTimeProfit;
  },
};

document.getElementById('play')
  .addEventListener('click', lemonade.nextDay);
