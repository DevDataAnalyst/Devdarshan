var rocky = require('rocky');

var COLORS = {
  background: '#FFF0B3',
  black: '#111111',
  blue: '#00589C',
  gray: '#77715F',
  pale: '#D8CCA0',
  sun: '#D3A228'
};

var SAMPLE = {
  sunrise: '6:42',
  temperature: '8',
  low: '5',
  high: '14',
  morningBars: [3, 5, 8, 11, 14, 17, 20, 23, 24, 23, 21, 17],
  forecastBars: [21, 18, 15, 13, 11, 10, 9, 8, 9, 12, 16, 20]
};

var DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function pad(value) {
  return value < 10 ? '0' + value : String(value);
}

function fillRect(ctx, color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawHeader(ctx, date) {
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.font = '17px bold';
  ctx.fillStyle = COLORS.blue;
  ctx.fillText(DAYS[date.getDay()], 7, 15);

  ctx.fillStyle = COLORS.black;
  ctx.fillText(MONTHS[date.getMonth()] + ' ' + date.getDate(), 55, 15);

  fillRect(ctx, COLORS.black, 129, 8, 8, 15);
  fillRect(ctx, COLORS.background, 131, 10, 1, 11);
  fillRect(ctx, COLORS.background, 134, 10, 1, 11);
}

function drawSunrise(ctx) {
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '11px bold';
  ctx.fillStyle = COLORS.gray;
  ctx.fillText('SUNRISE IN', 7, 34);

  ctx.font = '23px bold numbers';
  ctx.fillStyle = COLORS.black;
  ctx.fillText(SAMPLE.sunrise, 7, 53);

  var x = 81;
  var baseY = 58;
  var i;
  for (i = 0; i < SAMPLE.morningBars.length; i += 1) {
    var height = SAMPLE.morningBars[i] * 0.38;
    fillRect(ctx, i === 0 ? COLORS.blue : COLORS.pale, x + i * 4, baseY - height, 2, height);
  }
}

function drawTime(ctx, date, width) {
  var time = pad(date.getHours()) + ':' + pad(date.getMinutes());
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = COLORS.black;
  ctx.font = '51px bold numbers';
  ctx.fillText(time, width / 2, 91);
}

function drawWeatherIcon(ctx) {
  var x = 8;
  var y = 124;

  fillRect(ctx, COLORS.blue, x + 12, y, 2, 3);
  fillRect(ctx, COLORS.blue, x + 5, y + 3, 2, 2);
  fillRect(ctx, COLORS.blue, x + 20, y + 3, 2, 2);
  fillRect(ctx, COLORS.blue, x + 2, y + 8, 2, 2);
  fillRect(ctx, COLORS.blue, x + 23, y + 8, 2, 2);
  fillRect(ctx, COLORS.sun, x + 9, y + 4, 9, 8);

  fillRect(ctx, COLORS.blue, x + 4, y + 13, 22, 2);
  fillRect(ctx, COLORS.blue, x + 2, y + 10, 2, 5);
  fillRect(ctx, COLORS.blue, x + 6, y + 8, 2, 6);
  fillRect(ctx, COLORS.blue, x + 8, y + 6, 5, 2);
  fillRect(ctx, COLORS.blue, x + 13, y + 8, 2, 5);
  fillRect(ctx, COLORS.blue, x + 15, y + 10, 8, 2);

  fillRect(ctx, COLORS.background, x + 6, y + 11, 17, 2);
  fillRect(ctx, COLORS.background, x + 9, y + 9, 4, 2);
  fillRect(ctx, COLORS.background, x + 15, y + 10, 6, 2);
}

function drawTriangle(ctx, x, y, direction, color) {
  var row;
  for (row = 0; row < 3; row += 1) {
    var offset = direction === 'up' ? 2 - row : row;
    fillRect(ctx, color, x + offset, y + row * 2, 5 - offset * 2, 2);
  }
}

function drawForecast(ctx) {
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '15px bold';
  ctx.fillStyle = COLORS.gray;
  ctx.fillText('NEXT 12H', 82, 124);

  var baseline = 153;
  var i;
  for (i = 0; i < SAMPLE.forecastBars.length; i += 1) {
    fillRect(ctx, i < 2 ? COLORS.blue : COLORS.gray, 82 + i * 4, baseline - SAMPLE.forecastBars[i], 3, SAMPLE.forecastBars[i]);
  }
}

function drawTemperatures(ctx) {
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '13px bold';
  ctx.fillStyle = COLORS.blue;
  drawTriangle(ctx, 8, 156, 'down', COLORS.blue);
  ctx.fillStyle = COLORS.black;
  ctx.fillText(SAMPLE.low, 18, 158);

  drawTriangle(ctx, 49, 156, 'up', COLORS.blue);
  ctx.fillStyle = COLORS.black;
  ctx.fillText(SAMPLE.high, 59, 158);
}

rocky.on('draw', function (event) {
  var ctx = event.context;
  var bounds = event.bounds;
  var date = new Date();
  var width = bounds.size.w;
  var height = bounds.size.h;

  fillRect(ctx, COLORS.background, 0, 0, width, height);
  fillRect(ctx, COLORS.black, 0, 0, width, 2);
  fillRect(ctx, COLORS.black, 0, height - 2, width, 2);
  fillRect(ctx, COLORS.black, 0, 0, 2, height);
  fillRect(ctx, COLORS.black, width - 2, 0, 2, height);

  drawHeader(ctx, date);
  drawSunrise(ctx);
  drawTime(ctx, date, width);
  drawWeatherIcon(ctx);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '34px bold numbers';
  ctx.fillStyle = COLORS.black;
  ctx.fillText(SAMPLE.temperature + '\u00b0', 37, 139);

  drawForecast(ctx);
  drawTemperatures(ctx);
});

rocky.on('minutechange', function () {
  rocky.requestDraw();
});
