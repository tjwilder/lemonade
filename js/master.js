window.lemonade = {
  day: 0,
  cupCost: 1,
  signCost: 0.50,
  allTimeProfit: 20,
  dailyProfit: 0,
  confidence: 0,
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
    lemonade.displayUpdate();
  },
  emotion: document.getElementById('emotionDisplay'),
  sold: 0,
  forecastDisplay: document.getElementById('forecastDisplay'),
  nextDay: function nextDay() {
    lemonade.cups = document.getElementById('cups')
      .valueAsNumber;
    lemonade.price = document.getElementById('price')
      .valueAsNumber;
    lemonade.signs = document.getElementById('signs')
      .valueAsNumber;


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
        6000);
      if (lemonade.allTimeProfit < 5) {
        lemonade.emotion.className = lemonade.emotionBank[0];
        Materialize.toast('Bankrupt! Press play to try again...', 10000);
        lemonade.play.removeEventListener('click', lemonade.nextDay);
        lemonade.play.addEventListener('click', lemonade.firstDay);
      } else if (lemonade.allTimeProfit < 29) {
        lemonade.emotion.className = lemonade.emotionBank[1];
        lemonade.confidence = 1;
      } else if (lemonade.allTimeProfit < 99) {
        lemonade.emotion.className = lemonade.emotionBank[2];
        lemonade.confidence = 2;
      } else if (lemonade.allTimeProfit < 199) {
        lemonade.emotion.className = lemonade.emotionBank[3];
        lemonade.confidence = 3;
      } else if (lemonade.allTimeProfit < 399) {
        lemonade.emotion.className = lemonade.emotionBank[4];
        lemonade.confidence = 4;
      } else if (lemonade.allTimeProfit > 699) {
        lemonade.emotion.className = lemonade.emotionBank[5];
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

    document.getElementById('dayDisplay')
      .innerText = 'Day ' + lemonade.day;
    document.getElementById('cupsSoldDisplay')
      .innerText = "Today's Sales: " + lemonade.sold + ' Cups | $' + lemonade.dailyProfit;
    document.getElementById('grandTotalDisplay')
      .innerText = '$' + lemonade.allTimeProfit;
  }
};
lemonade.play.addEventListener('click', lemonade.nextDay);
lemonade.displayUpdate();
window.onload = function () {
  play.className += ' scale-in';
};
