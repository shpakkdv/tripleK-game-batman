import 'babel-polyfill';
import {
    PIXI
} from 'pixi.js';
import _ from 'lodash';

import {
    app,
    state
} from './state';
import {
    buttonPause,
    buttonPlay,
    buttonShutdown,
} from './buttons';
import {
    batman,
    batmanUp
} from './batman';

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
    shutdownGame,
} from './play';

document.body.appendChild(app.view);

document.addEventListener('keydown', onKeyDown);
document.addEventListener('click', batmanUp);

function onKeyDown(key) {
    if (key.keyCode === 32 || key.keyCode === 38 || key.keyCode === 87) batmanUp();
    else if ((key.keyCode === 27 || key.keyCode === 80) && state.batmanGameOver === false) {
        if (state.batmanPause && state.batmanStartGame) reviveGame();
        else if (!state.batmanPause && state.batmanStartGame) pauseGame();
    }
    else if ((key.keyCode === 40 || key.keyCode === 83) && state.batmanGameOver === false) {
        batman.position.y += state.down;
    }
}
