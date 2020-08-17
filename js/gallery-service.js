'use strict'

var gFilterBy = 'all';

// Imgs //
function getImgsForDisplay() {
    if (gFilterBy === 'all') return gImgs;

    var imgs = gImgs.filter((img) => img.keywords.indexOf(gFilterBy) > -1);

    // {
    //     img.keywords.forEach((keyword) => {
    //         if (keyword === gFilterBy) return img;
    //     })
    // })
    return imgs;
}
function setFilter(filterBy) {
    gFilterBy = filterBy;
}

// Keywords //
function getKeywordsRate(endIdx) {
    if (endIdx === 'all') return gKeywordsRate;
    else return (Object.entries(gKeywordsRate)).slice(0, endIdx);
}
function addKeywordsRate(keyword) {
    if (gKeywordsRate[keyword] <= 50) gKeywordsRate[keyword] += 1;
}