window.lemonade = {
  day: 1,
  cupCost: 0.05,
  signCost: 0.15,
  allTimeProfit: 10,
  dailyProfit: 0,
  bar: document.getElementById('percentageBar'),
  randomNumber: function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  weather: ['mdi mdi-weather-lightning-rainy mdi-36px', 'mdi mdi-weather-cloudy mdi-36px', 'mdi mdi-weather-partlycloudy mdi-36px', 'mdi mdi-weather-sunny mdi-36px'],
  tomorrowWeatherVariant: 3,
  tomorrowForecast: '',
  todayWeatherVariant: 3,
  todayForecast: '',
  emotionBank: ['mdi mdi-emoticon-dead mdi-36px', 'mdi mdi-emoticon-neutral mdi-36px', 'mdi mdi-emoticon mdi-36px', 'mdi mdi-emoticon-excited mdi-36px'],
  nextDay: function nextDay() {
    const cups = document.getElementById('cups')
      .value;
    const price = document.getElementById('price')
      .value;
    const signs = document.getElementById('signs')
      .value;
    const forecastDisplay = document.getElementById('forecastDisplay');
    const emotion = document.getElementById('emotionDisplay');
    if (lemonade.day < 2) {
      lemonade.todayWeatherVariant = 3;
      lemonade.todayForecast = 'Hot/Dry';
    } else {
      lemonade.todayWeatherVariant = lemonade.tomorrowWeatherVariant;
      lemonade.todayForecast = lemonade.tomorrowForecast;
    }
    const marketingResult = (((signs * 1.35) + (lemonade.randomNumber(14.4, 94.2) / 70)) / price) * ((lemonade.todayWeatherVariant / 2.5) + 0.08);
    let sold = Math.round(marketingResult);
    if (marketingResult > cups) { sold = cups; }
    if (sold > 0) {
      lemonade.bar.style.width = ((sold / cups) * 100) + '%';
    } else {
      lemonade.bar.style.width = 0;
    }
    const profits = Math.round((sold * price) * 100) / 100;
    const expenses = Math.round(((signs * lemonade.signCost) + (cups * lemonade.cupCost)) * 100) / 100;
    lemonade.dailyProfit = Math.round((profits - expenses) * 100) / 100;
    lemonade.allTimeProfit += lemonade.dailyProfit;
    lemonade.allTimeProfit = Math.round(lemonade.allTimeProfit * 100) / 100;
    Materialize.toast('Profit: $' + profits + ' | Expense: $' + expenses + ' | Net: $' + lemonade.dailyProfit, 6000);
    if (lemonade.allTimeProfit < 0.01) {
      emotion.className = lemonade.emotionBank[0];
      Materialize.toast('Bankrupt!', 6000);
    } else if (lemonade.allTimeProfit < 12) {
      emotion.className = lemonade.emotionBank[1];
    } else if (lemonade.allTimeProfit < 34) {
      emotion.className = lemonade.emotionBank[2];
    } else if (lemonade.allTimeProfit > 74) {
      emotion.className = lemonade.emotionBank[3];
    }

    lemonade.tomorrowWeatherVariant = lemonade.randomNumber(0, 4);
    // lemonade.tomorrowWeatherVariant = 1;
    lemonade.tomorrowForecast = lemonade.weather[lemonade.tomorrowWeatherVariant];
    forecastDisplay.className = lemonade.tomorrowForecast;

    lemonade.day++;
    document.getElementById('dayDisplay')
      .innerText = 'Day ' + lemonade.day;
    document.getElementById('cupsSoldDisplay')
      .innerText = 'Cups Sold Today: ' + sold;
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
