var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var mirror = document.getElementById('mirror');

var size = 1000;
var dpr = window.devicePixelRatio;
canvas.width = mirror.width = size * dpr;
canvas.height = mirror.width = size * dpr;
context.scale(dpr, dpr);

context.lineWidth = 2;

var step = 10;
var lines = [];

// make the lines
for (var i = step; i <= size - step; i += step) {
	var line = [];
	for (var j = step; j <= size - step; j += step) {
		var distanceToCenter = Math.abs(j - (size / 2));
		var variance = Math.max((size / 2) - (size / 10) - distanceToCenter);
		var random = ((Math.random() * variance) / 2) * -1;
		var point = {x: j, y: i + random}
		line.push(point);
	}
	lines.push(line);
}

// draw the lines
for (var i = Math.floor(size * (1/64)); i < lines.length; i++) {
	context.beginPath();
	context.moveTo(lines[i][0].x, lines[i][0].y);

	for (var j = 0; j < lines[i].length - 2; j++) {
		var xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
		var yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
		context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);

		if (i % 3 == 0) {
			context.lineTo(lines[i][j].x, lines[i][j + 1].y);
			if (i % 5 == 0) {
				context.lineTo(lines[i][j].y, lines[i][j + 1].x)
			}
		}
		
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
	context.save();
	context.globalCompositeOperation = 'destination-out';
	context.fill();
	context.restore();
	context.stroke();
}

mirror.addEventListener('contextmenu', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    mirror.src = dataURL;
});
