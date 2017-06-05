window.lemonade = {
  day: 1,
  cupCost: 0.05,
  signCost: 0.15,
  allTimeProfit: 0,
  dailyProfit: 0,
  randomNumber: function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  weather: ['Cloudy', 'Sunny', 'Hot/Dry'],
  tomorrowWeatherVariant: 3,
  tomorrowForecast: 'Hot/Dry',
  todayWeatherVariant: 3,
  todayForecast: 'Hot/Dry',
  nextDay: function nextDay() {
    const cups = document.getElementById('cups')
      .value;
    const price = document.getElementById('price')
      .value;
    const signs = document.getElementById('signs')
      .value;
    if (lemonade.day < 2) {
      lemonade.todayWeatherVariant = 3;
      lemonade.todayForecast = 'Hot/Dry';
    } else {
      lemonade.todayWeatherVariant = lemonade.tomorrowWeatherVariant;
      lemonade.todayForecast = lemonade.tomorrowForecast;
    }
    const marketingResult = (((signs / 1.2) + (lemonade.randomNumber(1, 5) / 4.8)) / price) * ((lemonade.todayWeatherVariant / 2.8) + 0.5);
    let sold = Math.round(marketingResult);
    if (marketingResult > cups) { sold = cups; }
    const profits = Math.round((sold * price) * 100) / 100;
    const expenses = Math.round(((signs * lemonade.signCost) + (cups * lemonade.cupCost)) * 100) / 100;
    lemonade.dailyProfit = Math.round((profits - expenses) * 100) / 100;
    lemonade.allTimeProfit += lemonade.dailyProfit;
    lemonade.allTimeProfit = Math.round(lemonade.allTimeProfit * 100) / 100;
    Materialize.toast('Profit: $' + profits + ' | Expense: $' + expenses + ' | Net: $' + lemonade.dailyProfit, 6000);

    lemonade.tomorrowWeatherVariant = lemonade.randomNumber(0, 3);
    lemonade.tomorrowForecast = lemonade.weather[lemonade.tomorrowWeatherVariant];

    lemonade.day++;
    document.getElementById('dayDisplay')
      .innerText = 'Day ' + lemonade.day;
    document.getElementById('weatherDisplay')
      .innerText = lemonade.tomorrowForecast;
    document.getElementById('cupsSoldDisplay')
      .innerText = sold;
    document.getElementById('grandTotalDisplay')
      .innerText = '$' + lemonade.allTimeProfit;
  },
};
const play = document.getElementById('play');

play.addEventListener('click', lemonade.nextDay);

window.onload = function () {
  play.className += ' scale-in';
  Materialize.fadeInImage('#lemonadeImage');
};
