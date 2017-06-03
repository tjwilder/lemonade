let lemonade = window.lemonade;
lemonade = {
  day: 1,
  cupCost: 0.05,
  signCost: 0.15,
  allTimeProfit: 0,
  dailyProfit: 0,
  profits: lemonade.cups * lemonade.price,
  sold: lemonade.signs * lemonade.cups * lemonade.randomNum,
  expenses: (lemonade.signs * lemonade.signCost) + (lemonade.cups * cupCost),
  cups: document.getElementById('cups')
    .value,
  price: document.getElementById('price')
    .value,
  signs: document.getElementById('signs')
    .value,
  randomNum: Math.random,
  weatherPool: ['Sunny', 'Cloudy', 'Hot and Dry'],
  weatherToday: lemonade.weatherPool[0],
  play: function dayPlay(balance) {
    lemonade.dailyProfit = (lemonade.profits - lemonade.expenses);
    lemonade.allTimeProfit += lemonade.dailyProfit;

    Materialize.toast('Day: ' + lemonade.day, 5000);
    Materialize.toast('Cups Sold: ' + lemonade.sold, 5000);
    Materialize.toast('Expenses: $' + lemonade.expenses, 5000);
    Materialize.toast('Profits: $' + lemonade.profits, 5000);
    Materialize.toast('All-time Profit: $' + lemonade.allTimeProfit, 5000);
    lemonade.dailyProfit = 0;
    lemonade.day++;
    document.getElementById('cups')
      .value = 75;
    document.getElementById('signs')
      .value = 4;
    document.getElementById('price')
      .value = 0.1;
  }
};

document.getElementById('cups')
  .addEventListener('click', lemonade.cups);
document.getElementById('signs')
  .addEventListener('click', lemonade.signs);
document.getElementById('price')
  .addEventListener('click', lemonade.price);
document.getElementById('play')
  .addEventListener('click', lemonade.play);
