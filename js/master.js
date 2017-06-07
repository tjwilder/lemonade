window.lemonade = {
  day: 0,
  cupCost: 1,
  signCost: 0.50,
  allTimeProfit: 20,
  dailyProfit: 0,
  confidence: 3,
  bar: document.getElementById('percentageBar'),
  play: document.getElementById('play'),

  randomNumber: function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  weather: ['mdi mdi-weather-lightning-rainy mdi-36px', 'mdi mdi-weather-cloudy mdi-36px',
    'mdi mdi-weather-partlycloudy mdi-36px', 'mdi mdi-weather-sunny mdi-36px'
  ],
  tomorrowWeatherVariant: 3,
  tomorrowForecast: '',
  todayWeatherVariant: 3,
  todayForecast: '',
  emotionBank: ['mdi mdi-emoticon-dead mdi-36px', 'mdi mdi-emoticon-sad mdi-36px',
    'mdi mdi-emoticon-neutral mdi-36px', 'mdi mdi-emoticon mdi-36px', 'mdi mdi-emoticon-excited mdi-36px',
    'mdi mdi-emoticon-cool mdi-36px'
  ],
  firstDay: function firstDay() {
    lemonade.day = 0;
    lemonade.tomorrowWeatherVariant = 3;
    lemonade.todayWeatherVariant = 3;
    lemonade.sold = 0;
    lemonade.allTimeProfit = 20;
    lemonade.dailyProfit = 0;
    lemonade.emotion.className = lemonade.emotionBank[3];
    lemonade.play.removeEventListener('click', lemonade.firstDay);
    lemonade.play.addEventListener('click', lemonade.nextDay);
    lemonade.emotion.className = lemonade.emotionBank[3];
    lemonade.confidence = 3;
    cups.valueAsNumber = 75;
    signs.valueAsNumber = 10;
    price.valueAsNumber = 4;
    lemonade.displayUpdate();
  },
  emotion: document.getElementById('emotionDisplay'),
  sold: 0,
  forecastDisplay: document.getElementById('forecastDisplay'),
  clean: function clean() {
    if (range1.children.length === 2) {
      range1.children[1].remove();
    }
    if (range2.children.length === 2) {
      range2.children[1].remove();
    }
    if (range3.children.length === 2) {
      range3.children[1].remove();
    }
  },
  nextDay: function nextDay() {
    lemonade.cups = document.getElementById('cups')
      .valueAsNumber;
    lemonade.price = document.getElementById('price')
      .valueAsNumber;
    lemonade.signs = document.getElementById('signs')
      .valueAsNumber;
    lemonade.clean();
    lemonade.todayWeatherVariant = lemonade.tomorrowWeatherVariant;
    lemonade.todayForecast = lemonade.tomorrowForecast;
    lemonade.expenses = Math.round(
      ((lemonade.signs * lemonade.signCost) + (lemonade.cups * lemonade.cupCost)) * 100) / 100;
    if (lemonade.expenses > lemonade.allTimeProfit) {
      Materialize.toast("You can't afford $" + lemonade.expenses + '! $' +
        lemonade.cupCost + '/Cup | $' + lemonade.signCost + '/Sign', 6000);
      cups.valueAsNumber = lemonade.allTimeProfit - 2;
      signs.valueAsNumber = 2;
    } else {
      const marketingResult = (
        ((lemonade.signs * 6) +
          (lemonade.randomNumber(1, 3) * lemonade.confidence)
        ) /
        (lemonade.price * 3)) * ((lemonade.todayWeatherVariant * 3) + 0.08);
      lemonade.sold = Math.round(marketingResult);
      if (marketingResult > lemonade.cups) { lemonade.sold = lemonade.cups; }
      if (lemonade.sold > 0) {
        lemonade.bar.style.width = ((lemonade.sold / lemonade.cups) * 100) + '%';
      } else {
        lemonade.bar.style.width = 0;
      }
      lemonade.profits = Math.round((lemonade.sold * lemonade.price) * 100) / 100;
      lemonade.dailyProfit = Math.round((lemonade.profits - lemonade.expenses) * 100) / 100;
      lemonade.allTimeProfit += lemonade.dailyProfit;
      lemonade.allTimeProfit = Math.round(lemonade.allTimeProfit * 100) / 100;
      Materialize.toast(
        'Profit: $' + lemonade.profits + ' | Expense: $' + lemonade.expenses,
        4000);
      if (lemonade.allTimeProfit < 10) {
        lemonade.emotion.className = lemonade.emotionBank[0];
        Materialize.toast('Bankrupt! Press play to try again...', 20000);
        lemonade.play.removeEventListener('click', lemonade.nextDay);
        lemonade.play.addEventListener('click', lemonade.firstDay);
      } else if (lemonade.allTimeProfit < 100) {
        lemonade.confidence = 1;
      } else if (lemonade.allTimeProfit < 200) {
        lemonade.confidence = 2;
      } else if (lemonade.allTimeProfit < 400) {
        lemonade.confidence = 3;
      } else if (lemonade.allTimeProfit < 800) {
        lemonade.confidence = 4;
      } else if (lemonade.allTimeProfit > 1200) {
        lemonade.confidence = 5;
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
    lemonade.emotion.className = lemonade.emotionBank[lemonade.confidence];
    lemonade.confidence = 3;
    document.getElementById('dayDisplay')
      .innerText = 'Day ' + lemonade.day;
    document.getElementById('cupsSoldDisplay')
      .innerText = lemonade.sold + ' Cups | $' + lemonade.dailyProfit;
    document.getElementById('grandTotalDisplay')
      .innerText = '$' + lemonade.allTimeProfit;
  }
};
lemonade.play.addEventListener('click', lemonade.nextDay);
lemonade.displayUpdate();
window.onload = function () {
  loader.remove();
  play.className += ' scale-in';

};
