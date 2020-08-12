'use strict'
// console.log('MAIN');

function init() {
    renderGallery();
}

function renderGallery() {
    let imgs = getImgs();

    if (imgs.length > 0) {
        var strHTMLs = imgs.map((img) => {
            return `<img class="gallery-item" src="${img.url}" alt="${img.id}" 
                        onclick="onSelectImage(${img.id})">`;
        });
        getEl('.gallery-imgs').innerHTML = strHTMLs.join('');
    }
}

function onSelectImage(imgId) {
    // hide gallery and search sections
    hideElem('image-gallery');
    hideElem('search-container');

    // show meme editor section
    showElem('meme-editor');

    initMeme(imgId);
}

function onShowGallery() {
    // hide meme editor section
    hideElem('meme-editor');

    // show gallery and search sections
    showElem('image-gallery');
    showElem('search-container');
}