import {
    state,
    app
} from './state';
import {
    startGame,
    continueGame,
    shutdownGame,
    pauseGame,
    reviveGame,
    audio
} from './play';

const buttonPause = PIXI.Sprite.fromImage('img/buttons/2.png');
const buttonPlay = PIXI.Sprite.fromImage('img/buttons/1.png');
const startButton = PIXI.Sprite.fromImage('img/game/startGame.png');
const gameOverImage = PIXI.Sprite.fromImage('img/game/gameOver2.png');
const buttonRestart = PIXI.Sprite.fromImage('img/buttons/5.png');
const volume0 = PIXI.Texture.fromImage('img/buttons/3.png');
const volume1 = PIXI.Texture.fromImage('img/buttons/3.5.png');
const volume2 = PIXI.Texture.fromImage('img/buttons/4.png');
const buttonVolume = new PIXI.Sprite(volume2);
const continueButton = new PIXI.Text(`Want to continue?\nIt will be cost 10 BatCoins!`, {
    fontFamily: 'Press Start 2P',
    align: 'center',
    fill: 'white',
    stroke: '#000',
    strokeThickness: 6
});
let audioVolume = 1;



buttonVolume.interactive = true;
buttonVolume.buttonMode = true;
buttonVolume.anchor = {
    x: 0.5,
    y: 0.5
};

buttonVolume.scale = {
    x: 0.25,
    y: 0.25
};
buttonVolume.on('pointerdown', setVolume);

buttonPause.interactive = true;
buttonPause.buttonMode = true;
buttonPause.anchor = {
    x: 1,
    y: 0
};
buttonPause.x = state.windowWidth - 5;
buttonPause.y = 5;
buttonPause.scale = {
    x: 0.25,
    y: 0.25
};
buttonPause.on('pointerdown', pauseGame);

buttonPlay.on('pointerdown', reviveGame);
buttonPlay.interactive = true;
buttonPlay.buttonMode = true;
buttonPlay.anchor = {
    x: 1,
    y: 0
};
buttonPlay.x = state.windowWidth - 5;
buttonPlay.y = 5;
buttonPlay.scale = {
    x: 0.25,
    y: 0.25
};

buttonRestart.interactive = true;
buttonRestart.buttonMode = true;
buttonRestart.anchor = {
    x: 0.5,
    y: 0.5
};
buttonRestart.x = state.windowWidth / 2 - 75;
buttonRestart.y = state.windowHeight / 2 + 75;
buttonRestart.scale = {
    x: 0.25,
    y: 0.25
};
buttonRestart.on('pointerup', shutdownGame);

startButton.anchor = {
    x: 0.5,
    y: 0.5
};
startButton.x = state.windowWidth / 2;
startButton.y = state.windowHeight - 150;
startButton.interactive = true;
startButton.buttonMode = true;
startButton.on('mouseover', resizeButton);
startButton.on('mouseout', resizeButton);
startButton.on('pointerup', startGame);

continueButton.anchor = {
    x: 0.5,
    y: 0.5
};
continueButton.x = state.windowWidth / 2;
continueButton.y = state.windowHeight / 2 + 100;
continueButton.interactive = true;
continueButton.buttonMode = true;
continueButton.on('pointerup', continueGame);

gameOverImage.anchor = {
    x: 0.5,
    y: 0.5
};
gameOverImage.x = state.windowWidth / 2;
gameOverImage.y = state.windowHeight / 2 - 100;

function setVolume() {
    switch (audioVolume) {
        case 0:
            audioVolume = 1;
            audio.volume = 0.5;
            buttonVolume.texture = volume1;
            break;
        case 1:
            audioVolume = 2;
            audio.volume = 1;
            buttonVolume.texture = volume2;
            break;
        case 2:
            audioVolume = 0;
            audio.volume = 0;
            buttonVolume.texture = volume0;
            break;
    }
}

function resizeButton() {
    if (this.scale.x === 1) {
        this.scale = {
            x: 1.1,
            y: 1.1
        }
    } else {
        this.scale = {
            x: 1,
            y: 1
        }
    }
}

export {
    buttonPause,
    buttonPlay,
    resizeButton,
    startButton,
    continueButton,
    gameOverImage,
    buttonRestart,
    buttonVolume
};
