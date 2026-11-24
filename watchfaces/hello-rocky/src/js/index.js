var rocky = require('rocky');

function pad(value) {
  return value < 10 ? '0' + value : String(value);
}

rocky.on('draw', function (event) {
  var ctx = event.context;
  var bounds = event.bounds;
  var now = new Date();
  var time = pad(now.getHours()) + ':' + pad(now.getMinutes());

  ctx.clearRect(0, 0, bounds.size.w, bounds.size.h);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, bounds.size.w, bounds.size.h);
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '36px bold';
  ctx.fillText(time, bounds.size.w / 2, bounds.size.h / 2);
});

rocky.on('minutechange', function () {
  rocky.requestDraw();
});
