'use strict'

const DEFAULT_TEXT_COLOR = 'white';
const DEFAULT_BORDER_COLOR = 'black';
const DEFAULT_FONT = 'Impact';

var gMemeSelected;
var gCanvas;
var gCtx;

function initMeme(imgId) {
    // console.log('MEME');

    // update model
    updateSelectedImg(imgId);
    // init canvas with selected img
    onInitCanvas();
}


// -------- User Actions funcs -------- //

function onInitCanvas() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');

    drawImgFromlocal();
}

function onTextChange(txt) {
    // update model
    const lineIdx = getSelectedLineIdx();
    updateLine(lineIdx, txt);
    // render canvas
    drawImgFromlocal();
}

// -------- Canvas funcs -------- //

// e. Create a Canvas with a single image – the image shall be taken from gMeme (managed by a memeService)
function drawImgFromlocal(txt) {
    var img = new Image();
    img.onload = () => {
        // using image aspect-ratio to calculate canvas height from its width
        gCanvas.height = Math.round((img.height / img.width) * gCanvas.width);
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,xend,yend

        const lineIdx = getSelectedLineIdx();
        // destructuring vars from selectedLine
        const { txt, size, align, color, x, y } = getSelectedLineByIdx(lineIdx);

        drawText(txt, size, align, color, x, y);
    }
    const selectedImg = getSelectedImg();
    img.src = selectedImg.url;
}

// f. Draw a text line on it with IMPACT font at the top of the image.
function drawText(txt, size, align, color, x, y) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = DEFAULT_BORDER_COLOR;
    gCtx.fillStyle = DEFAULT_TEXT_COLOR;
    gCtx.font = `40px ${DEFAULT_FONT}, sans-serif`;
    gCtx.textAlign = 'center';
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}