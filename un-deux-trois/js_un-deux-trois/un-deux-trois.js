var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var mirror = document.getElementById('mirror');

var size = 800;
var dpr = window.devicePixelRatio;
canvas.width = mirror.width = size * dpr;
canvas.height = mirror.width = size * dpr;
context.scale(dpr, dpr);

context.lineWidth = 4;
context.lineCap = 'round';

var step = size / 20;
var aThirdOfHeight = size / 3;

function draw(x, y, width, height, positions) {
	context.save();
	context.translate(x + (width / 2), y + (height / 2));
	context.rotate(Math.random() * 5);
	context.translate(-1 * (width / 2), -1 * (height / 2));

	for (var i = 0; i <= positions.length; i ++) {
		var randomConst = 20 * Math.random()
		context.beginPath();
		context.moveTo(positions[i] * width, 0);
		//context.lineTo(positions[i] * width, height);
		context.bezierCurveTo(positions[i] * width + randomConst, (width / 2),  positions[i] * width + randomConst, height + (height / 2), positions[i] * width, height)
		context.strokeStyle = "hsl(" + 360 * Math.random() + ',' +
			(100 + 10 * Math.random()) + '%,' + 
			(65 + 5 * Math.random()) + '%)';
		context.stroke();
	}

	context.restore();
}

for (var y = step; y < size - step; y += step) {
	for (var x = step; x < size - step; x += step) {
		if (y < aThirdOfHeight) {
			draw(x, y, step, step, [0.5]);
		} else if (y < aThirdOfHeight * 2) {
			draw(x, y, step, step, [0.2, 0.8]);
		} else {
			draw(x, y, step, step, [0.1, 0.5, 0.9]);
		}
		
	}
}

mirror.addEventListener('contextmenu', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    mirror.src = dataURL;
});
