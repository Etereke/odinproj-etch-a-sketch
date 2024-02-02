const canvas = document.querySelector('.canvas');
const buttonPixel = document.querySelector('.button-pixel');
const buttonColor = document.querySelector('.button-color');

// const canvasWidth = canvas.clientWidth;
// const canvasHeight = canvas.clientHeight;
// const canvasPixelWidth = canvas.clientWidth / resolution + 'px';
// const canvasPixelHeight = canvas.clientHeight / resolution + 'px';

// const baseColor = '#eeeceb';
// const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
// let currentRes = 16;
let color = 'black';
function createCanvas(resolution) {
    const divList = document.querySelectorAll('.canvas > div');
    const canvasPixelWidth = canvas.clientWidth / resolution + 'px';
    const canvasPixelHeight = canvas.clientHeight / resolution + 'px';
    divList.forEach((div) => {
        // div.removeEventListener()
        div.remove();
    });
    // currentRes = resolution;
    for (let i = 0; i < resolution * resolution; i++) {
        const div = document.createElement('div');
        div.style.width = canvasPixelWidth;
        div.style.height = canvasPixelHeight;
        // div.style.flex = `1 0 ${canvasPixelWidth}`;
        div.addEventListener('mouseenter', handleMouse);
        canvas.appendChild(div);
    }

}

buttonPixel.addEventListener('click', () => {
    let res = 0;
    while(res < 2 || res > 100) {
        res = +prompt("Please choose a resolution (2-100, default: 16)", "");
    }
    createCanvas(res);
});

function handleMouse(event) {
    event.target.style.backgroundColor = color;
}

createCanvas(16);