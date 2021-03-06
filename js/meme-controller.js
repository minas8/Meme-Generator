'use strict'

var gMemeSelected;
var gCanvas;
var gCtx;

function initMeme(imgId) {
    // update model
    updateSelectedImg(imgId);

    // init canvas with selected img
    initCanvas();

    // if mobile => resizeCanvas()
    const winWidth = window.innerWidth;
    if (winWidth <= 680) resizeCanvas();

    window.addEventListener('resize', (ev) => {
        resizeCanvas();
    });
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
        case 'select-font':
            updateLineFont(lineIdx, value);
            break;

        default:
            break;
    }

    // render canvas
    drawImgFromlocal(true);
}

function onDownload(elLink) {
    // render canvas to clean rectangle
    for (let i = 0; i < 2; i++) {
        updateSelectedLineByLineIdx(-1);
        drawImgFromlocal();
    }

    setTimeout(() => downloadImg(elLink), 2000);
}

function downloadImg(elLink) {
    const imageData = gCanvas.toDataURL('image/jpg');
    elLink.href = imageData;
    elLink.download = 'canvas.jpg';
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
function drawImgFromlocal() {
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

                drawText(txt, font, size, align, strokecolor, fillcolor, x, y);
                if (lineIdx === idx && lineIdx > -1) {
                    drawRect(y, size);
                }
            });
        }
    }
    // const selectedImg = getSelectedImgUrl();
    img.src = getSelectedImgUrl(); //selectedImg.url;
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
function drawRect(lineY, size) {
    const { x, y, width, height } = getRectByYSize(lineY, size);
    gCtx.beginPath();
    gCtx.rect(x, y, width, height); /// x, y, width, height
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
}

function getCursorPosition(event) {
    const rect = gCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // console.log("x: " + x + " y: " + y)
    return { x, y };
}

// ***************** window event ***************** //

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    const winWidth = window.innerWidth;
    if (winWidth <= 680) {
        gCanvas.height = Math.round((gCanvas.height / gCanvas.width) * (winWidth - 20));
        gCanvas.width = winWidth - 20;
    } else {
        gCanvas.height = Math.round((gCanvas.height / gCanvas.width) * (winWidth / 2));
        gCanvas.width = winWidth / 2; //elContainer.offsetWidth;
    }
    // render canvas
    drawImgFromlocal(true);
}