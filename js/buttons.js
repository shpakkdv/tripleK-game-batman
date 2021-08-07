import {state} from './state';

const buttonPause = PIXI.Sprite.fromImage('../img/buttons/buttonPause.png');
const buttonPlay = PIXI.Sprite.fromImage('../img/buttons/buttonPlay.png');
const buttonShutdown = PIXI.Sprite.fromImage('../img/buttons/buttonShutdown.png');

buttonPause.interactive = true;
buttonPause.buttonMode = true;
buttonPause.anchor = { x: 1, y: 0 };
buttonPause.x = state.windowWidth - 5;
buttonPause.y = 5;
buttonPause.scale = { x: 0.8, y: 0.8 };

buttonPlay.interactive = true;
buttonPlay.buttonMode = true;
buttonPlay.anchor = { x: 1, y: 0 };
buttonPlay.x = state.windowWidth - 5;
buttonPlay.y = 5;
buttonPlay.scale = { x: 0.8, y: 0.8 };

buttonShutdown.interactive = true;
buttonShutdown.buttonMode = true;
buttonShutdown.anchor = { x: 1, y: 0 };
buttonShutdown.x = state.windowWidth - 5;
buttonShutdown.y = 105;
buttonShutdown.scale = { x: 0.8, y: 0.8 };

export {
    buttonPause,
    buttonPlay,
    buttonShutdown,
};
