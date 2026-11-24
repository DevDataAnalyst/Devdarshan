var rocky = require('rocky');

rocky.on('draw', function (event) {
  var ctx = event.context;
  var bounds = event.bounds;

  ctx.clearRect(0, 0, bounds.size.w, bounds.size.h);
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '24px bold';
  ctx.fillText('Your watchface', bounds.size.w / 2, bounds.size.h / 2);
});
