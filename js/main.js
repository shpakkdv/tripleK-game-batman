import 'babel-polyfill';
import {PIXI} from 'pixi.js';
import _ from 'lodash';

import {app, state} from './state';
import {buttonPause, buttonPlay, buttonShutdown} from './buttons';
import {batman, batmanUp} from './batman';

import {
    arrayBarrierActivity,
    arrayAllBarriers,
    arrayMoveBarrier,
    setBarrier,
    bump
} from './barriers';

import {
    playGame,
    startGame,
    gameOver,
    pauseGame,
    reviveGame,
    shutdownGame
} from './play';

document.body.appendChild(app.view);

document.addEventListener('keydown', onKeyDown);
/* (click / mousedown) !!! когда убираешь с паузы, срабатывает batmanUp */
document.addEventListener('click', batmanUp);

function onKeyDown(key) {
    if (key.keyCode === 32) batmanUp();
    if ((key.keyCode === 27 || key.keyCode === 80) && state.batmanGameOver === false) {
        if (state.batmanPause) reviveGame();
        else pauseGame();
    }
}
