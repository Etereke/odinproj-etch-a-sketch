const canvas = document.querySelector('.canvas');
const buttonPixel = document.querySelector('.button-pixel');
const buttonColor = document.querySelector('.button-color');
let color = buttonColor.value;

buttonPixel.addEventListener('click', () => {
    let res = 0;
    while(res < 2 || res > 100) {
        res = +prompt("Please choose a resolution (2-100, default: 16)", "");
    }
    createCanvas(res);
});
buttonColor.addEventListener('input', (e) => {
    color = e.target.value;
});

createCanvas(16);

function createCanvas(resolution) {
    const divList = document.querySelectorAll('.canvas > div');
    const canvasPixelWidth = canvas.clientWidth / resolution + 'px';
    const canvasPixelHeight = canvas.clientHeight / resolution + 'px';
    divList.forEach((div) => {
        div.remove();
    });
    for (let i = 0; i < resolution * resolution; i++) {
        const div = document.createElement('div');
        div.style.width = canvasPixelWidth;
        div.style.height = canvasPixelHeight;
        div["data-color"] = "";
        div.addEventListener('mouseenter', handleMouse);
        canvas.appendChild(div);
    }
}

function makeColorDarker(targetColor, originalColor) {
    //originalColor is HEX format
    let r = parseInt(originalColor.substr(1,2), 16);
    let g = parseInt(originalColor.substr(3,2), 16);
    let b = parseInt(originalColor.substr(5,2), 16);

    //targetColor is 'rgb(x, x, x)' format
    let colorArray = targetColor.split(",");
    let newR = parseInt(colorArray[0].replace('rgb', '').replace('a', '').replace('(', ''));
    let newG = parseInt(colorArray[1].trim());
    let newB = parseInt(colorArray[2].trim().replace(')', ''));
    
    newR = newR - (r / 10) > 0
            ? Math.floor(newR - (r / 10))
            : 0;
    newG = newG - (g / 10) > 0
            ? Math.floor(newG - (g / 10))
            : 0;
    newB = newB - (b / 10) > 0
            ? Math.floor(newB - (b / 10))
            : 0;

    return '#' + newR.toString(16).padStart(2, '0')  + newG.toString(16).padStart(2, '0')  + newB.toString(16).padStart(2, '0')
}

function handleMouse(event) {
    if (event.target["data-color"] !== color) {
        event.target["data-color"] = color;
        event.target.style.backgroundColor = color;
    } else {
        event.target.style.backgroundColor = makeColorDarker(event.target.style.backgroundColor, color);
    }
}
