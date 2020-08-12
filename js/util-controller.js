'use strict'

function getEl(selector) {
    return document.querySelector(selector);
}

function showElem(selector) {
    let el = getEl(`.${selector}`);
    el.hidden = false; //!el.hidden;
}
function hideElem(selector) {
    let el = getEl(`.${selector}`);
    el.hidden = true; //!el.hidden;
}