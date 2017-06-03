require('./jquery-3.2.1.min.js');
require('./materialize.min.js');

const lemonade = {
  print: function print(text, duration) {
    return Materialize.toast(text, duration);
  },
  day: 0,
  cups: 0,
  price: 0,
  weather: 'Sunny',
};


lemonade.print(lemonade.day, 4000);
