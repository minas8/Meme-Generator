'use strict'

var gKeyWordsCount = 6;

function init() {
    renderGallery();
    renderKeyWords(gKeyWordsCount);
}

function renderGallery() {
    const imgs = getImgsForDisplay();

    if (imgs.length > 0) {
        var strHTMLs = imgs.map((img) => {
            return `<img class="gallery-item" src="${img.url}" alt="${img.id}" 
                        onclick="onSelectImage(${img.id})">`;
        });
        getEl('.gallery-imgs').innerHTML = strHTMLs.join('');
    }
}

function renderKeyWords(endIdx) {
    const keywordRates = getKeywordsRate(endIdx);
    var strHTML = '';

    if (keywordRates.length > 0) {
        for (let i = 0; i < keywordRates.length; i++) {
            const keywordRate = keywordRates[i];
            strHTML += `<div class="keyword-item" style="font-size: ${12 + keywordRate[1]}px;" 
            onclick="onFilter('${keywordRate[0]}');onRate('${keywordRate[0]}')">${keywordRate[0]}</div>`;
        }

        getEl('.keywords-container').innerHTML = strHTML;
    }
}

function onRate(keyword) {
    addKeywordsRate(keyword);
    renderKeyWords(gKeyWordsCount);
    renderGallery();
}
function onFilter(filterBy) {
    setFilter(filterBy);
}

function onSelectImage(imgId) {
    // hide gallery and search sections
    hideElem('image-gallery');
    hideElem('main-search');

    // show meme editor section
    showElem('meme-editor');

    initMeme(imgId);
}

function onShowGallery() {
    // hide meme editor section
    hideElem('meme-editor');

    // show gallery and search sections
    showElem('image-gallery');
    showElem('main-search');

    setFilter('all');
    renderGallery();
}