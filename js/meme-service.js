'use strict'

const DEFAULT_TEXT_COLOR = 'white';
const DEFAULT_BORDER_COLOR = 'black';
const DEFAULT_FONT = 'Impact';

var gKeywordsRate = { 'happy': 0, 'crazy': 0, 'sarcastic': 0, 'sad': 0, 'animal': 0, 'cute': 0 };

var gImgs = [
    { id: 1, url: 'img/gallery/1.jpg', keywords: ['crazy'] }, // ../
    { id: 2, url: 'img/gallery/2.jpg', keywords: ['animal'] }, // ../
    { id: 3, url: 'img/gallery/3.jpg', keywords: ['animal'] }, // ../
    { id: 4, url: 'img/gallery/4.jpg', keywords: ['animal'] }, // ../
    { id: 5, url: 'img/gallery/5.jpg', keywords: ['cute'] }, // ../
    { id: 6, url: 'img/gallery/6.jpg', keywords: ['crazy'] } // ../
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 40,
            align: 'center',
            fillcolor: DEFAULT_TEXT_COLOR,
            strokecolor: DEFAULT_BORDER_COLOR,
            font: DEFAULT_FONT,
            x: 275,
            y: 50
        },
        {
            txt: 'Second line',
            size: 40,
            align: 'center',
            fillcolor: DEFAULT_TEXT_COLOR,
            strokecolor: DEFAULT_BORDER_COLOR,
            font: DEFAULT_FONT,
            x: 275,
            y: 500
        }
    ]
}

function getImgs() {
    return gImgs;
}
function getSelectedImg() {
    return gImgs.find((img) => {
        return img.id === gMeme.selectedImgId;
    });
}
function getMemeLines() {
    return gMeme.lines;
}
function getSelectedLineIdx() {
    return gMeme.selectedLineIdx;
}
function getSelectedLineByIdx(lineIdx) {
    return gMeme.lines[lineIdx];
}

function updateSelectedImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function addLine(txt, size, align, fillcolor = DEFAULT_TEXT_COLOR,
    strokecolor = DEFAULT_BORDER_COLOR, font = DEFAULT_FONT) {
    let line = {
        txt,
        size,
        align,
        fillcolor,
        strokecolor,
        font,
        x: 275,
        y: getRndInt(70, 401)
    };
    gMeme.lines.push(line);
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
    gMeme.lines[lineIdx].align = align;
}
function updateLineFillColor(lineIdx, fillcolor) {
    gMeme.lines[lineIdx].fillcolor = fillcolor;
}
function updateLineStrokeColor(lineIdx, strokecolor) {
    gMeme.lines[lineIdx].strokecolor = strokecolor;
}
function switchLines(lineIdx, value) {
    const newIdx = lineIdx + value;
    gMeme.selectedLineIdx = newIdx < gMeme.lines.length ? newIdx : 0;
}
function deleteLine(lineIdx) {

}