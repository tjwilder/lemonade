window.lemonade = {
  day: 0,
  cupCost: 1,
  signCost: 0.50,
  allTimeProfit: 20,
  dailyProfit: 0,
  confidence: 3,
  tomorrowWeatherVariant: 3,
  tomorrowForecast: '',
  todayWeatherVariant: 3,
  todayForecast: '',
  sold: 0,
  emotion: document.getElementById('emotionDisplay'),
  forecastDisplay: document.getElementById('forecastDisplay'),
  bar: document.getElementById('percentageBar'),
  play: document.getElementById('play'),
  weather: ['mdi mdi-weather-lightning-rainy mdi-36px', 'mdi mdi-weather-cloudy mdi-36px',
    'mdi mdi-weather-partlycloudy mdi-36px', 'mdi mdi-weather-sunny mdi-36px',
  ],
  emotionBank: ['mdi mdi-emoticon-dead mdi-36px', 'mdi mdi-emoticon-sad mdi-36px',
    'mdi mdi-emoticon-neutral mdi-36px', 'mdi mdi-emoticon mdi-36px', 'mdi mdi-emoticon-excited mdi-36px',
    'mdi mdi-emoticon-cool mdi-36px',
  ],
  whenLoaded: () => {
    // lemonade.cheat(); // Enable cheating
    lemonade.play.addEventListener('click', lemonade.nextDay);
    lemonade.displayUpdate();
    document.getElementById('loader')
      .remove();
    document.getElementById('play')
      .className += ' scale-in';
    lemonade.pourIn('');
    Materialize.toast("It's a nice day to sell Lemonade!", 5000);
  },
  cheat: () => {
    lemonade.cheating = true;
    lemonade.day = 1000;
    lemonade.allTimeProfit = 2000;
    lemonade.confidence = 3;
    lemonade.tomorrowForecast = lemonade.cheatWeather;
    document.getElementById('cups')
      .valueAsNumber = 150;
    document.getElementById('signs')
      .valueAsNumber = 20;
    document.getElementById('price')
      .valueAsNumber = 1;
    lemonade.cheatWeather = 1;
    lemonade.displayUpdate();
    lemonade.nextDay();
    lemonade.nextDay();
    lemonade.nextDay();
    Materialize.toast('Cheat enabled', 4000);
    return 'You are cheating!';
  },
  randomNumber: (min, max) => Math.floor(Math.random() * (max - min)) + min,
  stringRound: equation => equation.toFixed(2),
  twoDecimals: equation => Math.round(equation * 100) / 100,
  marketingResult: () => {
    const signs = lemonade.signs ** 5;
    const confidence = lemonade.randomNumber(1, 3) * lemonade.confidence;
    const price = (lemonade.price) ** 6;
    const weather = lemonade.todayWeatherVariant ** 2;
    const result = ((signs + confidence) / price) * weather;
    return result + 0.08;
  },
  determineConfidence: () => {
    if (lemonade.allTimeProfit < 10) {
      lemonade.confidence = 0;
      lemonade.clearToast();
      Materialize.toast('Bankrupt! Better luck next time!', 30000);
      lemonade.play.removeEventListener('click', lemonade.nextDay);
      lemonade.play.addEventListener('click', lemonade.newGame);
      lemonade.pourOut();
    } else if (lemonade.dailyProfit === 0) {
      lemonade.confidence = 2;
      // console.log('option 0 ' + lemonade.confidence);
    } else if (lemonade.dailyProfit < lemonade.average()) {
      lemonade.confidence = 1;
      // console.log('option 1 ' + lemonade.confidence);
    } else if (lemonade.dailyProfit - lemonade.average() < 60) {
      lemonade.confidence = Math.round(((lemonade.dailyProfit - lemonade.average()) / 20) + 2);
      // console.log('option 2 ' + lemonade.confidence);
    } else {
      lemonade.confidence = 5;
      // console.log('option 3 ' + lemonade.confidence);
    }
    return lemonade.confidence;
  },
  clearToast: () => {
    document.getElementById('toast-container')
      .innerHTML = '';
  },
  clean: () => {
    if (document.getElementById('range1')
      .children.length > 1) {
      document.getElementById('range1')
        .children[1].remove();
    }
    if (document.getElementById('range2')
      .children.length > 1) {
      document.getElementById('range2')
        .children[1].remove();
    }
    if (document.getElementById('range3')
      .children.length > 1) {
      document.getElementById('range3')
        .children[1].remove();
    }
  },
  resetAnimation: () => {
    document.getElementById('straw')
      .classList.remove('straw2');
    document.getElementById('lemon')
      .classList.remove('lemon2');
    document.getElementById('lemonade1')
      .classList.remove('liquid2');
    document.getElementById('lemonade2')
      .classList.remove('liquid2');
    for (let i = 1; i < 6; i += 1) {
      document.getElementById(`cube${i}`)
        .classList.remove('cubes2');
    }
    document.getElementById('straw')
      .classList.remove('straw');
    document.getElementById('lemon')
      .classList.remove('lemon');
    document.getElementById('glassTop')
      .classList.remove('glass');
    document.getElementById('glassBottom')
      .classList.remove('glass');
    document.getElementById('lemonade1')
      .classList.remove('liquid');
    document.getElementById('lemonade2')
      .classList.remove('liquid');
    for (let cubesOut = 1; cubesOut < 6; cubesOut += 1) {
      document.getElementById(`cube${cubesOut}`)
        .classList.remove('cubes');
    }
  },
  pourIn: () => {
    lemonade.resetAnimation();
    setTimeout(() => {
      document.getElementById('straw')
        .classList.add('straw');
      document.getElementById('lemon')
        .classList.add('lemon');
      document.getElementById('lemonade1')
        .classList.add('liquid');
      document.getElementById('lemonade2')
        .classList.add('liquid');
      for (let i = 1; i < 6; i += 1) {
        document.getElementById(`cube${i}`)
          .classList.add('cubes');
      }
    }, 5);
  },
  pourOut: () => {
    lemonade.resetAnimation();
    setTimeout(() => {
      document.getElementById('straw')
        .classList.add('straw2');
      document.getElementById('lemon')
        .classList.add('lemon2');
      document.getElementById('glassTop')
        .classList.add('glass2');
      document.getElementById('glassBottom')
        .classList.add('glass2');
      document.getElementById('lemonade1')
        .classList.add('liquid2');
      document.getElementById('lemonade2')
        .classList.add('liquid2');
      for (let cubesIn = 1; cubesIn < 6; cubesIn += 1) {
        document.getElementById(`cube${cubesIn}`)
          .classList.add('cubes2');
      }
    }, 5);
  },
  newGame: () => {
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
    document.getElementById('cups')
      .valueAsNumber = 75;
    document.getElementById('signs')
      .valueAsNumber = 10;
    document.getElementById('price')
      .valueAsNumber = 4;
    lemonade.displayUpdate();
    lemonade.pourIn();
    Materialize.toast("It's a nice day to sell Lemonade!", 5000);
  },
  average: () => ((lemonade.allTimeProfit - lemonade.dailyProfit) / lemonade.day),
  nextDay: () => {
    lemonade.cups = document.getElementById('cups')
      .valueAsNumber;
    lemonade.price = document.getElementById('price')
      .valueAsNumber;
    lemonade.signs = document.getElementById('signs')
      .valueAsNumber;
    lemonade.clean();
    lemonade.todayWeatherVariant = lemonade.tomorrowWeatherVariant;
    lemonade.todayForecast = lemonade.tomorrowForecast;
    lemonade.expenses = lemonade.twoDecimals(
      (lemonade.signs * lemonade.signCost) + (lemonade.cups * lemonade.cupCost));
    if (lemonade.expenses > lemonade.allTimeProfit) {
      lemonade.clearToast();
      Materialize.toast(`You can't afford $${lemonade.stringRound(lemonade.expenses)}!`, 2000);
      Materialize.toast(`$${lemonade.stringRound(lemonade.cupCost)} per Cup | $${lemonade.stringRound(lemonade.signCost)} per Sign`, 6000);
      document.getElementById('cups')
        .valueAsNumber = lemonade.allTimeProfit - 2;
      document.getElementById('signs')
        .valueAsNumber = 2;
    } else {
      lemonade.sold = Math.round(lemonade.marketingResult());
      if (lemonade.marketingResult() > lemonade.cups) { lemonade.sold = lemonade.cups; }
      if (lemonade.sold > 0) {
        lemonade.bar.style.width = `${(lemonade.sold / lemonade.cups) * 100}%`;
      } else {
        lemonade.bar.style.width = 0;
      }
      lemonade.profits = lemonade.twoDecimals(lemonade.sold * lemonade.price);
      lemonade.dailyProfit = lemonade.twoDecimals(lemonade.profits - lemonade.expenses);
      lemonade.allTimeProfit += lemonade.dailyProfit;
      lemonade.allTimeProfit = lemonade.twoDecimals(lemonade.allTimeProfit);
      Materialize.toast(
        `Profit: $${lemonade.stringRound(lemonade.profits)} | Expense: $${lemonade.stringRound(lemonade.expenses)}`,
        3000);
      lemonade.determineConfidence();
      lemonade.tomorrowWeatherVariant = lemonade.randomNumber(0, 4);
      if (lemonade.cheating) { lemonade.tomorrowWeatherVariant = lemonade.cheatWeather; }
      lemonade.day += 1;
      lemonade.displayUpdate();
    }
  },
  displayUpdate: () => {
    lemonade.tomorrowForecast = lemonade.weather[lemonade.tomorrowWeatherVariant];
    lemonade.forecastDisplay.className = lemonade.tomorrowForecast;
    lemonade.emotion.className = lemonade.emotionBank[lemonade.confidence];
    document.getElementById('dayDisplay')
      .innerText = `Day ${lemonade.day}`;
    document.getElementById('cupsSoldDisplay')
      .innerText = `${lemonade.sold} Cups | $${lemonade.stringRound(lemonade.dailyProfit)}`;
    document.getElementById('grandTotalDisplay')
      .innerText = `$${lemonade.stringRound(lemonade.allTimeProfit)}`;
  },
};
window.onload = () => {
  lemonade.whenLoaded();
};
