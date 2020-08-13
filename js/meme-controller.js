'use strict'
// console.log('MEME');

var gMemeSelected;
var gCanvas;
var gCtx;

function initMeme(imgId) {
    // update model
    updateSelectedImg(imgId);
    // init canvas with selected img
    initCanvas();
}

// -------- User Actions funcs -------- //

function onAddLine() {
    // update model
    addLine();
    // render canvas
    drawImgFromlocal();
}

// actionDesc = action description
function onTextChange(actionDesc, value) {
    const lineIdx = getSelectedLineIdx();

    // update model
    switch (actionDesc) {
        case 'input-text':
            updateLineText(lineIdx, value);
            break;
        // a. Implement text size increase / decrease
        case 'increase':
        case 'decrease':
            updateLineSize(lineIdx, value);
            break;
        // b. Implement moving lines up/down
        case 'move-up':
        case 'move-down':
            updateLineY(lineIdx, value);
            break;
        case 'align-left':
        case 'align-center':
        case 'align-right':
            updateLineAlign(lineIdx, value);
            break;
        case 'stroke-color':
            updateLineStrokeColor(lineIdx, value);
            break;
        case 'fill-color':
            updateLineFillColor(lineIdx, value);
            break;
        case 'switch-lines':
            switchLines(lineIdx, value);
            break;

        default:
            break;
    }

    // render canvas
    drawImgFromlocal();
}

// -------- Canvas funcs -------- //

function initCanvas() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');

    gCanvas.addEventListener('mousedown', function (e) {
        getCursorPosition(e);
    });

    drawImgFromlocal();
}

// e. Create a Canvas with a single image – the image shall be taken from gMeme (managed by a memeService)
function drawImgFromlocal(txt) {
    var img = new Image();
    img.onload = () => {
        // using image aspect-ratio to calculate canvas height from its width
        gCanvas.height = Math.round((img.height / img.width) * gCanvas.width);
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,xend,yend

        const lineIdx = getSelectedLineIdx();
        let lines = getMemeLines();
        if (lines || lines.length > 0) {
            lines.map((line, idx) => {
                // destructuring vars from selectedLine
                const { txt, font, size, align, strokecolor, fillcolor, x, y } = line;

                if (lineIdx === idx) drawRect(y, size);

                drawText(txt, font, size, align, strokecolor, fillcolor, x, y);
            });
        }
    }
    const selectedImg = getSelectedImg();
    img.src = selectedImg.url;
}

// f. Draw a text line on it with IMPACT font at the top of the image.
function drawText(txt, font, size, align, strokecolor, fillcolor, x, y) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = strokecolor;
    gCtx.fillStyle = fillcolor;
    gCtx.font = `${size}px ${font}, sans-serif`;
    gCtx.textAlign = align;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function drawRect(y, size) {
    gCtx.beginPath();
    gCtx.rect(10, y - size, gCanvas.width - 20, size + 10); /// x, y, width, height
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
}

function getCursorPosition(event) {
    const rect = gCanvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    // console.log("x: " + x + " y: " + y)
}