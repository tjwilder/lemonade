webpackJsonp([1],{

/***/ 10:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

window.lemonade = {
  day: 0,
  cupCost: 1,
  signCost: 0.5,
  allTimeProfit: 10,
  dailyProfit: 0,
  confidence: 3,
  tomorrowWeatherVariant: 3,
  tomorrowForecast: "",
  todayWeatherVariant: 3,
  todayForecast: "",
  sold: 0,
  emotion: document.getElementById("emotionDisplay"),
  forecastDisplay: document.getElementById("forecastDisplay"),
  bar: document.getElementById("percentageBar"),
  play: document.getElementById("play"),
  cupsVar: document.getElementById("cups"),
  signsVar: document.getElementById("signs"),
  priceVar: document.getElementById("price"),
  strawVar: () => document.getElementById("straw"),
  lemonVar: () => document.getElementById("lemon"),
  glassTopVar: () => document.getElementById("glassTop"),
  glassBottomVar: () => document.getElementById("glassBottom"),
  lemonade1: document.getElementById("lemonade1"),
  lemonade2: document.getElementById("lemonade2"),
  dayDisplayVar: document.getElementById("dayDisplay"),
  cupsSoldDisplayVar: document.getElementById("cupsSoldDisplay"),
  grandTotalDisplayVar: document.getElementById("grandTotalDisplay"),
  weather: [
    "mdi mdi-weather-lightning-rainy mdi-36px",
    "mdi mdi-weather-cloudy mdi-36px",
    "mdi mdi-weather-partlycloudy mdi-36px",
    "mdi mdi-weather-sunny mdi-36px"
  ],
  emotionBank: [
    "mdi mdi-emoticon-dead mdi-36px",
    "mdi mdi-emoticon-sad mdi-36px",
    "mdi mdi-emoticon-neutral mdi-36px",
    "mdi mdi-emoticon mdi-36px",
    "mdi mdi-emoticon-excited mdi-36px",
    "mdi mdi-emoticon-cool mdi-36px"
  ],
  diagnostic: signs => {
    console.debug(
      `${lemonade.signsVar.valueAsNumber} signs market: ${lemonade.stringRound(
        signs
      )} Cost: $${lemonade.stringRound(
        lemonade.priceVar.valueAsNumber
      )} Weather ${lemonade.todayWeatherVariant} Sold ${lemonade.sold} cups`
    );
  },
  whenLoaded: () => {
    lemonade.pourIn();
    lemonade.play.addEventListener("click", lemonade.nextDay);
    lemonade.displayUpdate();
    document.getElementById("loader").remove();
    document.getElementById("play").className += " scale-in";
    window.Materialize.toast("It's a nice day to sell Lemonade!", 5000);
    // lemonade.cheat(); // Enable cheating
  },
  cheat: () => {
    lemonade.cheating = true;
    window.Materialize.toast("Cheat enabled", 4000);
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
    return "You are cheating!";
  },
  marketingResult: () => {
    let signs = lemonade.signs ** 2 / Math.log1p(lemonade.signs);
    if (isNaN(signs) || signs < 1) signs = 0;
    if (lemonade.cheating) lemonade.diagnostic(signs);
    const confidence = lemonade.randomNumber(1, 3.5) * lemonade.confidence;
    const price = lemonade.price;
    const weather = lemonade.todayWeatherVariant ** 2 + 1;
    const result = (signs + confidence) / price * weather;
    return result;
  },
  toastVar: () => document.getElementById("toast-container").innerHTML,
  randomNumber: (min, max) => Math.floor(Math.random() * (max - min)) + min,
  stringRound: equation => equation.toFixed(2),
  twoDecimals: equation => Math.round(equation * 100) / 100,
  average: () => (lemonade.allTimeProfit - lemonade.dailyProfit) / lemonade.day,
  determineConfidence: () => {
    if (lemonade.allTimeProfit < 10) {
      lemonade.confidence = 0;
      lemonade.clearToast();
      window.Materialize.toast("Bankrupt! Better luck next time!", 30000);
      lemonade.play.removeEventListener("click", lemonade.nextDay);
      lemonade.play.addEventListener("click", lemonade.newGame);
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
        (lemonade.dailyProfit - lemonade.average()) / 20 + 2
      );
      // console.log('option 2 ' + lemonade.confidence);
    } else {
      lemonade.confidence = 5;
      // console.log('option 3 ' + lemonade.confidence);
    }
    return lemonade.confidence;
  },
  newGame: () => {
    lemonade.play.removeEventListener("click", lemonade.newGame);
    lemonade.day = 0;
    lemonade.tomorrowWeatherVariant = 3;
    lemonade.todayWeatherVariant = 3;
    lemonade.sold = 0;
    lemonade.allTimeProfit = 20;
    lemonade.dailyProfit = 0;
    lemonade.emotion.className = lemonade.emotionBank[3];
    lemonade.emotion.className = lemonade.emotionBank[3];
    lemonade.confidence = 3;
    lemonade.cupsVar.valueAsNumber = 5;
    lemonade.signsVar.valueAsNumber = 1;
    lemonade.priceVar.valueAsNumber = 1.5;
    lemonade.clearToast();
    window.Materialize.toast("It's a nice day to sell Lemonade!", 5000);
    lemonade.displayUpdate();
    lemonade.pourIn();
    lemonade.play.addEventListener("click", lemonade.nextDay);
  },
  nextDay: () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(60);
    }
    lemonade.cups = lemonade.cupsVar.valueAsNumber;
    lemonade.signs = lemonade.signsVar.valueAsNumber;
    lemonade.price = lemonade.priceVar.valueAsNumber;
    lemonade.todayWeatherVariant = lemonade.tomorrowWeatherVariant;
    lemonade.todayForecast = lemonade.tomorrowForecast;
    lemonade.expenses = lemonade.twoDecimals(
      lemonade.signs * lemonade.signCost + lemonade.cups * lemonade.cupCost
    );
    if (lemonade.expenses > lemonade.allTimeProfit) {
      lemonade.clearToast();
      lemonade.clean();
      window.Materialize.toast(
        `You can't afford $${lemonade.stringRound(lemonade.expenses)}!`,
        2000
      );
      window.Materialize.toast(
        `$${lemonade.stringRound(
          lemonade.cupCost
        )} per Cup | $${lemonade.stringRound(lemonade.signCost)} per Sign`,
        6000
      );
      lemonade.cupsVar.valueAsNumber = lemonade.allTimeProfit - 2;
      lemonade.signsVar.valueAsNumber = 2;
    } else {
      lemonade.sold = Math.round(lemonade.marketingResult());
      if (lemonade.sold > 0 && lemonade.sold < lemonade.cups) {
        lemonade.bar.style.width = `${lemonade.sold / lemonade.cups * 100}%`;
      } else if (lemonade.sold === 0) {
        lemonade.bar.style.width = 0;
      } else {
        lemonade.sold = lemonade.cups;
        lemonade.bar.style.width = `${lemonade.sold / lemonade.cups * 100}%`;
      }
      lemonade.profits = lemonade.twoDecimals(lemonade.sold * lemonade.price);
      lemonade.dailyProfit = lemonade.twoDecimals(
        lemonade.profits - lemonade.expenses
      );
      lemonade.allTimeProfit += lemonade.dailyProfit;
      lemonade.allTimeProfit = lemonade.twoDecimals(lemonade.allTimeProfit);
      window.Materialize.toast(
        `Profit: $${lemonade.stringRound(
          lemonade.profits
        )} | Expense: $${lemonade.stringRound(lemonade.expenses)}`,
        6000
      );
      lemonade.determineConfidence();
      lemonade.tomorrowWeatherVariant = lemonade.randomNumber(0, 4);
      if (lemonade.cheating) {
        lemonade.tomorrowWeatherVariant = lemonade.cheatWeather;
      }
      lemonade.day += 1;
      lemonade.displayUpdate();
    }
  },
  displayUpdate: () => {
    lemonade.values();
    lemonade.tomorrowForecast =
      lemonade.weather[lemonade.tomorrowWeatherVariant];
    lemonade.forecastDisplay.className = lemonade.tomorrowForecast;
    lemonade.emotion.className = lemonade.emotionBank[lemonade.confidence];
    lemonade.dayDisplayVar.innerText = `Day ${lemonade.day}`;
    lemonade.cupsSoldDisplayVar.innerText = `${lemonade.sold} Cups | $${lemonade.stringRound(
      lemonade.dailyProfit
    )}`;
    lemonade.grandTotalDisplayVar.innerText = `$${lemonade.stringRound(
      lemonade.allTimeProfit
    )}`;
  },
  clearToast: () => {
    lemonade.toastVar = "";
  },
  clean: () => {
    if (document.getElementById("range1").children.length > 1) {
      document.getElementById("range1").children[1].remove();
    }
    if (document.getElementById("range2").children.length > 1) {
      document.getElementById("range2").children[1].remove();
    }
    if (document.getElementById("range3").children.length > 1) {
      document.getElementById("range3").children[1].remove();
    }
  },
  resetAnimation: () => {
    lemonade.strawVar().classList.remove("straw2");
    lemonade.lemonVar().classList.remove("lemon2");
    document.getElementById("lemonade1").classList.remove("liquid2");
    document.getElementById("lemonade2").classList.remove("liquid2");
    for (let i = 1; i < 6; i += 1) {
      document.getElementById(`cube${i}`).classList.remove("cubes2");
    }
    lemonade.strawVar().classList.remove("straw");
    lemonade.lemonVar().classList.remove("lemon");
    lemonade.glassTopVar().classList.remove("glass");
    lemonade.glassBottomVar().classList.remove("glass");
    document.getElementById("lemonade1").classList.remove("liquid");
    document.getElementById("lemonade2").classList.remove("liquid");
    for (let cubesOut = 1; cubesOut < 6; cubesOut += 1) {
      document.getElementById(`cube${cubesOut}`).classList.remove("cubes");
    }
  },
  pourIn: () => {
    lemonade.resetAnimation();
    setTimeout(() => {
      lemonade.strawVar().classList.add("straw");
      lemonade.lemonVar().classList.add("lemon");
      document.getElementById("lemonade1").classList.add("liquid");
      document.getElementById("lemonade2").classList.add("liquid");
      for (let i = 1; i < 6; i += 1) {
        document.getElementById(`cube${i}`).classList.add("cubes");
      }
    }, 5);
  },
  pourOut: () => {
    lemonade.resetAnimation();
    setTimeout(() => {
      lemonade.strawVar().classList.add("straw2");
      lemonade.lemonVar().classList.add("lemon2");
      lemonade.glassTopVar().classList.add("glass2");
      lemonade.glassBottomVar().classList.add("glass2");
      lemonade.lemonade1.classList.add("liquid2");
      lemonade.lemonade2.classList.add("liquid2");
      for (let cubesIn = 1; cubesIn < 6; cubesIn += 1) {
        document.getElementById(`cube${cubesIn}`).classList.add("cubes2");
      }
    }, 5);
  },
  values: () => {
    if (lemonade.allTimeProfit < 100) {
      lemonade.cupsVar.max = 15;
      lemonade.signsVar.max = 3;
      lemonade.priceVar.max = 2.99;
      if (lemonade.level < 1) {
        window.Materialize.toast("Level 1", 6000);
        lemonade.level = 1;
        lemonade.clean();
      }
      if (lemonade.level > 1) {
        window.Materialize.toast("Level 1 Downgrade", 6000);
        window.Materialize.toast("Less cups, signs and lower price.", 6000);
        lemonade.level = 1;
        lemonade.clean();
      }
    } else if (lemonade.allTimeProfit < 500) {
      lemonade.cupsVar.max = 50;
      lemonade.signsVar.max = 10;
      lemonade.priceVar.max = 3.99;
      if (lemonade.level < 2) {
        window.Materialize.toast("Level 2 Upgrade!", 6000);
        window.Materialize.toast("More cups, signs and higher price!", 6000);
        lemonade.level = 2;
        lemonade.clean();
      }
      if (lemonade.level > 2) {
        window.Materialize.toast("Level 2 Downgrade", 6000);
        window.Materialize.toast("Less cups, signs and lower price.", 6000);
        lemonade.level = 2;
        lemonade.clean();
      }
    } else if (lemonade.allTimeProfit < 5000) {
      lemonade.cupsVar.max = 140;
      lemonade.signsVar.max = 25;
      lemonade.priceVar.max = 6.99;
      if (lemonade.level < 3) {
        window.Materialize.toast("Level 3 Upgrade!", 6000);
        window.Materialize.toast("More cups, signs and higher price!", 6000);
        lemonade.level = 3;
        lemonade.clean();
      }
      if (lemonade.level > 3) {
        window.Materialize.toast("Level 3 Downgrade", 6000);
        window.Materialize.toast("Less cups, signs and lower price.", 6000);
        lemonade.level = 3;
        lemonade.clean();
      }
    } else if (lemonade.allTimeProfit < 10000) {
      lemonade.cupsVar.max = 400;
      lemonade.signsVar.max = 40;
      lemonade.priceVar.max = 9.99;
      if (lemonade.level < 4) {
        window.Materialize.toast("Level 4 Upgrade!", 6000);
        window.Materialize.toast("More cups, signs and higher price!", 6000);
        lemonade.level = 4;
        lemonade.clean();
      }
      if (lemonade.level > 4) {
        window.Materialize.toast("Level 4 Downgrade", 6000);
        window.Materialize.toast("Less cups, signs and lower price.", 6000);
        lemonade.level = 4;
        lemonade.clean();
      }
    }
  },
  level: 0
};
window.lemonade = lemonade;
lemonade.values();


/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

// require("./node_modules/materialize-css/dist/js/materialize");
__webpack_require__(1);
// require("./node_modules/materialize-css/dist/css/materialize.css");
__webpack_require__(2);
__webpack_require__(3);
// require("../node_modules/mdi/fonts/materialdesignicons-webfont.svg");
// require("../node_modules/mdi/css/materialdesignicons.min.css");
__webpack_require__(10);
__webpack_require__(11);
// require("./js/startGame");


/***/ })

},[9]);
//# sourceMappingURL=entry.js.map?ea61822d99cf15f723b9