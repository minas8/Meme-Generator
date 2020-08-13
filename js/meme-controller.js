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

    // window.addEventListener('resize', (ev) => {
    //     resizeCanvas();
    // });
}

function clearTxtInput() {
    const elInput = document.querySelector('.input-text');
    elInput.value = '';
    elInput.focus();
}

// -------- User Actions funcs -------- //

function onAddLine() {
    // update model
    addLine();
    clearTxtInput();
    // render canvas
    drawImgFromlocal(true);
}
function onDeleteLineByLineIdx() {
    // update model
    const lineIdx = getSelectedLineIdx();
    deleteLine(lineIdx);
    clearTxtInput();
    // render canvas
    drawImgFromlocal(true);
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
            clearTxtInput();
            break;

        default:
            break;
    }

    // render canvas
    drawImgFromlocal(true);
}

function onDownload(elDownload) {
    // render canvas to clean rectangle
    // drawImgFromlocal(false);
    let imageData = gCanvas.toDataURL('image/jpg');
    elDownload.href = imageData;
    elDownload.download = 'canvas.jpg';
}

// -------- Canvas funcs -------- //

function initCanvas() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');

    gCanvas.addEventListener('mousedown', function (e) {
        const { x, y } = getCursorPosition(e);
        const lineIdx = getLineIdxByLocation(y);
        if (lineIdx > -1) {
            updateSelectedLineByLineIdx(lineIdx);
            drawImgFromlocal(true);
        }
    });

    drawImgFromlocal(true);
}

// e. Create a Canvas with a single image – the image shall be taken from gMeme (managed by a memeService)
function drawImgFromlocal(isShowRect) {
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

                if (lineIdx === idx && isShowRect) {
                    drawRect(y, size);
                }
                // else if (lineIdx === idx && isShowRect) {
                //     downloadImg();
                // }

                drawText(txt, font, size, align, strokecolor, fillcolor, x, y);
            });
        }
    }
    const selectedImg = getSelectedImg();
    img.src = selectedImg.url;
}

// f. Draw a text line on it with IMPACT font at the top of the image.
function drawText(txt, font, size, align, strokecolor, fillcolor, x, y) {
    txt = !txt ? '' : txt;
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = strokecolor;
    gCtx.fillStyle = fillcolor;
    gCtx.font = `${size}px ${font}, sans-serif`;
    gCtx.textAlign = align;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function getRectByYSize(yPos, size) {
    return {
        x: 10,
        y: yPos - size,
        width: gCanvas.width - 20,
        height: size + 10
    };
}
function drawRect(yPos, size) {
    const { x, y, width, height } = getRectByYSize(yPos, size);
    gCtx.beginPath();
    gCtx.rect(x, y, width, height); /// x, y, width, height
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
}

function getCursorPosition(event) {
    const rect = gCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y)
    return { x, y };
}

// ***************** window event ***************** //

// function resizeCanvas() {
//     const elCanvas = document.querySelector('#meme-canvas');
//     // Note: changing the canvas dimension this way clears the canvas
//     gCanvas.width = elCanvas.width - 0;
//     gCanvas.height = elCanvas.height - 0;

//     // render canvas
//     drawImgFromlocal(true);
// }