const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = {
    earth: 'earth.png',
    moon: 'moon.png',
    mars: 'mars.png',
    solarSystem: 'solar_system.png'
};

let zoom = 1;
let imagesLoaded = {};

function loadImages(callback) {
    let loaded = 0;
    let keys = Object.keys(images);
    keys.forEach(key => {
        let img = new Image();
        img.src = images[key];
        img.onload = () => {
            imagesLoaded[key] = img;
            loaded++;
            if (loaded === keys.length) callback();
            console.log(canvas.width, canvas.height);
        };
    });
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (zoom < 1.5) {
        drawImageCentered(imagesLoaded.earth, canvas.width / 2, canvas.height / 2, 300 / zoom);
    } else if (zoom < 3) {
        drawImageCentered(imagesLoaded.moon, canvas.width / 2 - 100, canvas.height / 2, 100 / zoom);
        drawImageCentered(imagesLoaded.earth, canvas.width / 2, canvas.height / 2, 300 / zoom);
    } else if (zoom < 6) {
        drawImageCentered(imagesLoaded.mars, canvas.width / 2 + 150, canvas.height / 2, 150 / zoom);
        drawImageCentered(imagesLoaded.moon, canvas.width / 2 - 100, canvas.height / 2, 100 / zoom);
        drawImageCentered(imagesLoaded.earth, canvas.width / 2, canvas.height / 2, 300 / zoom);
    } else {
        drawImageCentered(imagesLoaded.solarSystem, canvas.width / 2, canvas.height / 2, 800 / zoom);
    }
}

function drawImageCentered(img, x, y, size) {
    ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
}

window.addEventListener('wheel', (event) => {
    zoom += event.deltaY * -0.01;
    zoom = Math.max(0.5, Math.min(10, zoom));
    drawScene();
});

loadImages(drawScene);