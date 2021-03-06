'use strict'

const DEFAULT_TEXT_COLOR = 'white';
const DEFAULT_BORDER_COLOR = 'black';
const DEFAULT_FONT = 'Impact';

var gKeywordsRate = {
    'happy': 0, 'crazy': 0, 'sarcastic': 0, 'sad': 0,
    'animal': 0, 'cute': 0, 'spooky': 0, 'seleb': 0,
    'funny': 0
};

var gImgs = [
    { id: 1, url: 'img/gallery/1.jpg', keywords: ['crazy'] },
    { id: 2, url: 'img/gallery/2.jpg', keywords: ['animal', 'cute'] },
    { id: 3, url: 'img/gallery/3.jpg', keywords: ['animal'] },
    { id: 4, url: 'img/gallery/4.jpg', keywords: ['animal'] },
    { id: 5, url: 'img/gallery/5.jpg', keywords: ['cute'] },
    { id: 6, url: 'img/gallery/6.jpg', keywords: ['crazy'] },
    { id: 7, url: 'img/gallery/7.jpg', keywords: ['spooky'] },
    { id: 8, url: 'img/gallery/8.jpg', keywords: ['seleb'] },
    { id: 9, url: 'img/gallery/9.jpg', keywords: ['spooky'] },
    { id: 13, url: 'img/gallery/13.jpg', keywords: ['seleb'] },
    { id: 16, url: 'img/gallery/16.jpg', keywords: ['funny'] },
    { id: 18, url: 'img/gallery/18.jpg', keywords: ['cute'] }
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter your text',
            size: 40,
            align: 'center',
            fillcolor: DEFAULT_TEXT_COLOR,
            strokecolor: DEFAULT_BORDER_COLOR,
            font: DEFAULT_FONT,
            x: 275,
            y: 50
        }
        // {
        //     txt: 'Second line',
        //     size: 40,
        //     align: 'center',
        //     fillcolor: DEFAULT_TEXT_COLOR,
        //     strokecolor: DEFAULT_BORDER_COLOR,
        //     font: DEFAULT_FONT,
        //     x: 275,
        //     y: 500
        // }
    ]
}

// Imgs //
function getSelectedImgUrl() {
    const selectedImg = gImgs.find((img) => {
        return img.id === gMeme.selectedImgId;
    });
    return selectedImg.url;
}
function updateSelectedImg(imgId) {
    gMeme.selectedImgId = imgId;
}

// Meme //
function getMemeLines() {
    return gMeme.lines;
}
function getSelectedLineIdx() {
    return gMeme.selectedLineIdx;
}
function getSelectedLineByIdx(lineIdx) {
    return gMeme.lines[lineIdx];
}
function getLineIdxByLocation(yPos) {
    return gMeme.lines.findIndex((line) => {

        const lineY = line.y - line.size;
        const lineHeight = line.y + 5;

        return (yPos > lineY && yPos < lineHeight);
    });
}
function addLine(txt, size = 40, align = 'center', fillcolor = DEFAULT_TEXT_COLOR,
    strokecolor = DEFAULT_BORDER_COLOR, font = DEFAULT_FONT) {
    // if first line => up 
    // gMeme.lines.length === 0 ? 50 : 

    // if second line => bottom
    // else => random
    let y = gMeme.lines.length === 1 ? 500 : getRndInt(70, 401);

    let line = {
        txt,
        size,
        align,
        fillcolor,
        strokecolor,
        font,
        x: 275,
        y
    };
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}
function updateLineText(lineIdx, txt) {
    gMeme.lines[lineIdx].txt = txt;
}
function updateLineSize(lineIdx, size) {
    gMeme.lines[lineIdx].size += size;
}
function updateLineY(lineIdx, y) {
    gMeme.lines[lineIdx].y += y;
}
function updateLineAlign(lineIdx, align) {
    switch (align) {
        case 'left':
            gMeme.lines[lineIdx].align = align; //'right';
            gMeme.lines[lineIdx].x = 535 - (gMeme.lines[lineIdx].txt.length * 20);
            break;
        case 'center':
            gMeme.lines[lineIdx].align = align;
            gMeme.lines[lineIdx].x = 275;
            break;
        case 'right':
            gMeme.lines[lineIdx].align = align; //'left';
            gMeme.lines[lineIdx].x = 15 + (gMeme.lines[lineIdx].txt.length * 20);
            break;
    }
}
function updateLineFillColor(lineIdx, fillcolor) {
    gMeme.lines[lineIdx].fillcolor = fillcolor;
}
function updateLineStrokeColor(lineIdx, strokecolor) {
    gMeme.lines[lineIdx].strokecolor = strokecolor;
}
function updateLineFont(lineIdx, font) {
    gMeme.lines[lineIdx].font = font;
}
function switchLines(lineIdx, value) {
    const newIdx = lineIdx + value;
    gMeme.selectedLineIdx = newIdx < gMeme.lines.length ? newIdx : 0;
}
function updateSelectedLineByLineIdx(lineIdx) {
    gMeme.selectedLineIdx = lineIdx;
}
function deleteLine(lineIdx) {
    gMeme.lines.splice(lineIdx, 1);
}