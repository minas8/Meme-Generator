'use strict'

function getRndInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min + 1;
    //The maximum is exclusive and the minimum is inclusive
}