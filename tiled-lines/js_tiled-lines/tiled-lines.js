var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var mirror = document.getElementById('mirror');

//var size = wind;
var size = 500;
var step = 20;
var dpr = window.devicePixelRatio;
canvas.width = mirror.width = size * dpr;
canvas.height = mirror.width = size * dpr;
context.scale(dpr, dpr);

context.lineCap = 'square';
context.lineWidth = 2;

function draw(x, y, width, height) {
	var leftToRight = Math.random() >= 0.5;

	if (leftToRight) {
		context.moveTo(x, y);
		context.lineTo(x + width, y + height);
	} else {
		context.moveTo(x + width, y);
		context.lineTo(x, y + height);	
	}
	context.stroke();
	
}

for (var x = 0; x < size; x += step) {
	for (var y = 0; y < size; y += step) {
		draw(x, y, step, step);
	}
}

mirror.addEventListener('contextmenu', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    mirror.src = dataURL;
});
