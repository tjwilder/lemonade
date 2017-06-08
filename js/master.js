window.lemonade = {
  day: 0,
  cupCost: 1,
  signCost: 0.50,
  allTimeProfit: 20,
  dailyProfit: 0,
  confidence: 3,
  bar: document.getElementById('percentageBar'),
  play: document.getElementById('play'),
  clearToast: function clearToast() {
    document.getElementById('toast-container')
      .innerHTML = '';
  },
  resetAnimation: function resetAnimation() {
    straw.classList.remove('straw2');
    lemon.classList.remove('lemon2');
    lemonade1.classList.remove('liquid2');
    lemonade2.classList.remove('liquid2');
    for (let i = 1; i < 6; i++) {
      document.getElementById('cube' + i)
        .classList.remove('cubes2');
    }
    straw.classList.remove('straw');
    lemon.classList.remove('lemon');
    glassTop.classList.remove('glass');
    glassBottom.classList.remove('glass');
    lemonade1.classList.remove('liquid');
    lemonade2.classList.remove('liquid');
    for (let cubesOut = 1; cubesOut < 6; cubesOut++) {
      document.getElementById('cube' + cubesOut)
        .classList.remove('cubes');
    }
  },
  pourIn: function pourIn() {
    lemonade.resetAnimation();
    setTimeout(function () {
      straw.classList.add('straw');
      lemon.classList.add('lemon');
      lemonade1.classList.add('liquid');
      lemonade2.classList.add('liquid');
      for (let i = 1; i < 6; i++) {
        document.getElementById('cube' + i)
          .classList.add('cubes');
      }
    }, 5);
  },
  pourOut: function pourOut() {
    lemonade.resetAnimation();
    setTimeout(function () {
      straw.classList.add('straw2');
      lemon.classList.add('lemon2');
      glassTop.classList.add('glass2');
      glassBottom.classList.add('glass2');
      lemonade1.classList.add('liquid2');
      lemonade2.classList.add('liquid2');
      for (let cubesIn = 1; cubesIn < 6; cubesIn++) {
        document.getElementById('cube' + cubesIn)
          .classList.add('cubes2');
      }
    }, 5);
  },
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
  newGame: function newGame() {
    lemonade.clearToast();
    lemonade.day = 0;
    lemonade.tomorrowWeatherVariant = 3;
    lemonade.todayWeatherVariant = 3;
    lemonade.sold = 0;
    lemonade.allTimeProfit = 20;
    lemonade.dailyProfit = 0;
    lemonade.emotion.className = lemonade.emotionBank[3];
    lemonade.play.removeEventListener('click', lemonade.newGame);
    lemonade.play.addEventListener('click', lemonade.nextDay);
    lemonade.emotion.className = lemonade.emotionBank[3];
    lemonade.confidence = 3;
    cups.valueAsNumber = 75;
    signs.valueAsNumber = 10;
    price.valueAsNumber = 4;
    lemonade.displayUpdate();
    lemonade.pourIn();
    Materialize.toast("It's a nice day to sell Lemonade!", 5000);
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
  round2: function round2(equation) {
    const result = equation.toFixed(2);
    return result;
  },
  round0: function round0(equation) {
    const result = Math.round((equation) * 100) / 100;
    return result;
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
    lemonade.expenses = lemonade.round0(
      (lemonade.signs * lemonade.signCost) + (lemonade.cups * lemonade.cupCost));
    if (lemonade.expenses > lemonade.allTimeProfit) {
      lemonade.clearToast();
      Materialize.toast("You can't afford $" + lemonade.round2(lemonade.expenses) + '!', 2000);
      Materialize.toast('$' + lemonade.round2(lemonade.cupCost) + ' per Cup | $' + lemonade.round2(lemonade.signCost) + ' per Sign', 6000);
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
      lemonade.profits = lemonade.round0(lemonade.sold * lemonade.price);
      lemonade.dailyProfit = lemonade.round0(lemonade.profits - lemonade.expenses);
      lemonade.allTimeProfit += lemonade.dailyProfit;
      lemonade.allTimeProfit = lemonade.round0(lemonade.allTimeProfit);
      Materialize.toast(
        'Profit: $' + lemonade.round2(lemonade.profits) + ' | Expense: $' + lemonade.round2(lemonade.expenses),
        3000);
      if (lemonade.allTimeProfit < 10) {
        lemonade.confidence = 0;
        lemonade.clearToast();
        Materialize.toast('Bankrupt! Better luck next time!', 30000);
        lemonade.play.removeEventListener('click', lemonade.nextDay);
        lemonade.play.addEventListener('click', lemonade.newGame);
        lemonade.pourOut();
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
      .innerText = lemonade.sold + ' Cups | $' + lemonade.round2(lemonade.dailyProfit);
    document.getElementById('grandTotalDisplay')
      .innerText = '$' + lemonade.round2(lemonade.allTimeProfit);
  }
};
lemonade.play.addEventListener('click', lemonade.nextDay);
lemonade.displayUpdate();
window.onload = function () {
  loader.remove();
  play.className += ' scale-in';
  lemonade.pourIn('');
  Materialize.toast("It's a nice day to sell Lemonade!", 5000);
};
