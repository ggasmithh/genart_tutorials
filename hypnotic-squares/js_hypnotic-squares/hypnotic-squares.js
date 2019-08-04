var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var mirror = document.getElementById('mirror');

var size = 800;
var dpr = window.devicePixelRatio;
canvas.width = mirror.width = size * dpr;
canvas.height = mirror.width = size * dpr;
context.scale(dpr, dpr);

context.lineWidth = 2;

mirror.addEventListener('contextmenu', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    mirror.src = dataURL;
});
