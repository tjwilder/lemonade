window.lemonade = {
  day: 0,
  cupCost: 0.05,
  signCost: 0.15,
  allTimeProfit: 12,
  dailyProfit: 0,
  bar: document.getElementById('percentageBar'),
  play: document.getElementById('play'),

  randomNumber: function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  weather: ['mdi mdi-weather-lightning-rainy mdi-36px', 'mdi mdi-weather-cloudy mdi-36px', 'mdi mdi-weather-partlycloudy mdi-36px', 'mdi mdi-weather-sunny mdi-36px'],
  tomorrowWeatherVariant: 3,
  tomorrowForecast: '',
  todayWeatherVariant: 3,
  todayForecast: '',
  emotionBank: ['mdi mdi-emoticon-dead mdi-36px', 'mdi mdi-emoticon-sad mdi-36px', 'mdi mdi-emoticon-neutral mdi-36px', 'mdi mdi-emoticon mdi-36px', 'mdi mdi-emoticon-excited mdi-36px', 'mdi mdi-emoticon-cool mdi-36px'],
  firstDay: function firstDay() {
    lemonade.day = 0;
    lemonade.tomorrowWeatherVariant = 3;
    lemonade.todayWeatherVariant = 3;
    lemonade.sold = 0;
    lemonade.allTimeProfit = 10;
    lemonade.dailyProfit = 0;
    lemonade.emotion.className = lemonade.emotionBank[3];
    lemonade.play.removeEventListener('click', lemonade.firstDay);
    lemonade.play.addEventListener('click', lemonade.nextDay);
    lemonade.displayUpdate();
  },
  emotion: document.getElementById('emotionDisplay'),
  sold: 0,
  forecastDisplay: document.getElementById('forecastDisplay'),
  nextDay: function nextDay() {
    const cups = document.getElementById('cups')
      .value;
    const price = document.getElementById('price')
      .value;
    const signs = document.getElementById('signs')
      .value;


    lemonade.todayWeatherVariant = lemonade.tomorrowWeatherVariant;
    lemonade.todayForecast = lemonade.tomorrowForecast;
    const expenses = Math.round(((signs * lemonade.signCost) + (cups * lemonade.cupCost)) * 100) / 100;
    if (expenses > lemonade.allTimeProfit) {
      Materialize.toast("You can't afford $" + expenses + '!', 6000);
    } else {
      const marketingResult = (((signs * 1.35) + (lemonade.randomNumber(14.4, 94.2) / 70)) / price) * ((lemonade.todayWeatherVariant / 2.5) + 0.08);
      lemonade.sold = Math.round(marketingResult);
      if (marketingResult > cups) { lemonade.sold = cups; }
      if (lemonade.sold > 0) {
        lemonade.bar.style.width = ((lemonade.sold / cups) * 100) + '%';
      } else {
        lemonade.bar.style.width = 0;
      }
      const profits = Math.round((lemonade.sold * price) * 100) / 100;
      lemonade.dailyProfit = Math.round((profits - expenses) * 100) / 100;
      lemonade.allTimeProfit += lemonade.dailyProfit;
      lemonade.allTimeProfit = Math.round(lemonade.allTimeProfit * 100) / 100;
      Materialize.toast('Profit: $' + profits + ' | Expense: $' + expenses + ' | Net: $' + lemonade.dailyProfit, 6000);
      if (lemonade.allTimeProfit < 0.01) {
        lemonade.emotion.className = lemonade.emotionBank[0];
        Materialize.toast('Bankrupt!', 6000);
        lemonade.play.removeEventListener('click', lemonade.nextDay);
        lemonade.play.addEventListener('click', lemonade.firstDay);
      } else if (lemonade.allTimeProfit < 29) {
        lemonade.emotion.className = lemonade.emotionBank[1];
      } else if (lemonade.allTimeProfit < 99) {
        lemonade.emotion.className = lemonade.emotionBank[2];
      } else if (lemonade.allTimeProfit < 199) {
        lemonade.emotion.className = lemonade.emotionBank[3];
      } else if (lemonade.allTimeProfit < 199) {
        lemonade.emotion.className = lemonade.emotionBank[4];
      } else if (lemonade.allTimeProfit > 399) {
        lemonade.emotion.className = lemonade.emotionBank[4];
      }

      lemonade.tomorrowWeatherVariant = lemonade.randomNumber(0, 4);
      // lemonade.tomorrowWeatherVariant = 1;

      lemonade.day++;
      lemonade.displayUpdate();
    }
  },
  displayUpdate: function displayUpdate() {
    lemonade.tomorrowForecast = lemonade.weather[lemonade.tomorrowWeatherVariant];
    lemonade.forecastDisplay.className = lemonade.tomorrowForecast;

    document.getElementById('dayDisplay')
      .innerText = 'Day ' + lemonade.day;
    document.getElementById('cupsSoldDisplay')
      .innerText = "Today's Sales: " + lemonade.sold;
    document.getElementById('grandTotalDisplay')
      .innerText = '$' + lemonade.allTimeProfit;
  }
};
lemonade.play.addEventListener('click', lemonade.nextDay);

window.onload = function () {
  play.className += ' scale-in';
};
