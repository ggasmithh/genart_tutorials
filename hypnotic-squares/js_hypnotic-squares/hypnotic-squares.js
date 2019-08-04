var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var mirror = document.getElementById('mirror');

var size = 800;
var dpr = window.devicePixelRatio;
canvas.width = mirror.width = size * dpr;
canvas.height = mirror.width = size * dpr;
context.scale(dpr, dpr);

context.lineWidth = 2;

var baseStepSize = Math.ceil(size * 0.01);
var finalSize = Math.floor(size * 0.02);
var startSteps;
var offset = 2;
var tileStep = (size - offset * 2) / 7;
var startSize = tileStep;
var directions = [-1, 0, 1];

function draw(x, y, width, height, xMovement, yMovement, steps) {
    context.beginPath();
    context.rect(x, y, width, height);
    context.stroke();

    if (steps >= 0) {
        var newSize = (startSize) * (steps / startSteps) + finalSize;
        var newX = x + (width - newSize) / 2;
        var newY = y + (height - newSize) / 2;
        newX -= ((x - newX) / (steps + 2)) * xMovement;
        newY -= ((y - newY) / (steps + 2)) * yMovement;

        draw(newX, newY, newSize, newSize, xMovement, yMovement, steps - 1);
    }
}

for (var x = offset; x < size - offset; x += tileStep) {
    for (var y = offset; y < size - offset; y += tileStep) {
        startSteps = (baseStepSize - 1) + Math.ceil(Math.random() * baseStepSize);
        var xDirection = directions[Math.floor(Math.random() * directions.length)]
        var yDirection = directions[Math.floor(Math.random() * directions.length)]
        draw(x, y, startSize, startSize, xDirection, yDirection, startSteps - 1);
    }
}





mirror.addEventListener('contextmenu', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    mirror.src = dataURL;
});
