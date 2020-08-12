'use strict'

var gKeywordsRate = { 'happy': 0, 'crazy': 0, 'sarcastic': 0, 'sad': 0, 'animal': 0, 'cute': 0 };

var gImgs = [
    { id: 1, url: '../img/gallery/1.jpg', keywords: ['crazy'] },
    { id: 2, url: '../img/gallery/2.jpg', keywords: ['animal'] },
    { id: 3, url: '../img/gallery/3.jpg', keywords: ['animal'] },
    { id: 4, url: '../img/gallery/4.jpg', keywords: ['animal'] },
    { id: 5, url: '../img/gallery/5.jpg', keywords: ['cute'] },
    { id: 6, url: '../img/gallery/6.jpg', keywords: ['crazy'] }
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red',
            x: 275,
            y: 50
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
function getSelectedLineIdx() {
    return gMeme.selectedLineIdx;
}
function getSelectedLineByIdx(lineIdx) {
    return gMeme.lines[lineIdx];
}

function updateSelectedImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function addLine(txt, size, align, color, x, y) {
    let line = {
        txt,
        size,
        align,
        color,
        x,
        y
    };
    gMeme.lines.push(line);
}

function updateLine(lineIdx, txt) {
    gMeme.lines[lineIdx].txt = txt;
}
function deleteLine(lineIdx) {

}