var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var mirror = document.getElementById('mirror');

var size = 900;
var dpr = window.devicePixelRatio;
canvas.width = mirror.width = size * dpr;
canvas.height = mirror.width = size * dpr;
context.scale(dpr, dpr);
context.lineJoin = 'bevel';

var line, dot,
	odd = false,
	lines = [],
	gap = size / 32;

for (var y = gap / 2; y <= size; y += gap) {
	odd = !odd;
	line = [];
	for (var x = gap / 4; x <= size; x += gap) {
		line.push({
			x: x + (Math.random()*0.8 - 0.2) * gap  + (odd ? gap/2 : 0),
			y: y + (Math.random()*0.8 - 0.2) * gap
		  });
	}
	lines.push(line);
}

function drawTriangle(pointA, pointB, pointC) {
	context.beginPath();
	context.moveTo(pointA.x, pointA.y);
	context.lineTo(pointB.x, pointB.y);
	context.lineTo(pointC.x, pointC.y);
	context.lineTo(pointA.x, pointA.y);
	context.closePath();

	// prettier colors :)
	context.fillStyle = "hsl(" + 360 * Math.random() + ',' +
		(70 + 70 * Math.random()) + '%,' + 
		(60 + 10 * Math.random()) + '%)';

	context.fill();

	context.stroke();
}

var dotLine;
odd = true;

for (var y = 0; y < lines.length - 1; y++) {
	odd = !odd;
	dotLine = [];
	for (var i = 0; i < lines[y].length; i++) {
		dotLine.push(odd ? lines[y][i] : lines[y + 1][i]);
		dotLine.push(odd ? lines[y + 1][i] : lines[y][i]);
	}
	for (var i = 0; i < dotLine.length - 2; i++) {
		drawTriangle(dotLine[i], dotLine[i + 1], dotLine[i + 2]);
	}
}

mirror.addEventListener('contextmenu', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    mirror.src = dataURL;
});
