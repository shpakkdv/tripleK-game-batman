import {app, state} from './state';
import {buttonPause, buttonShutdown, buttonPlay} from './buttons';
import {batman} from './batman';
import {bump, setBarrier, arrayBarrierActivity, arrayMoveBarrier, arrayAllBarriers} from './barriers';
import {setBatCoin, moveCoin, batCoin} from './batCoin';

const startImage = PIXI.Sprite.fromImage('img/game/startImage.jpg');
const labelImage = PIXI.Sprite.fromImage('img/game/labelImage.png');
const gameOverImage = PIXI.Sprite.fromImage('img/game/gameOver.png');
const background = PIXI.TilingSprite.fromImage('img/background/houses400.gif', state.windowWidth, 400);

const continueButton = new PIXI.Text(`Want to continue?\nIt will be cost 10 BatCoins!`,
    {
        fontSize: '40px',
        fill: 'red',
        align: 'center',
        stroke: '#000',
        strokeThickness: 5,
    });

continueButton.anchor = { x: 0.5, y: 0.5 };
continueButton.x = state.windowWidth / 2;
continueButton.y = state.windowHeight - 90;
continueButton.interactive = true;
continueButton.buttonMode = true;
continueButton.on('pointerup', continueGame);

startImage.width = state.windowWidth;
startImage.height = state.windowHeight;

labelImage.interactive = true;
labelImage.buttonMode = true;
labelImage.anchor = { x: 0.5, y: 0.5 };
labelImage.x = state.windowWidth / 2;
labelImage.y = state.windowHeight / 2;
labelImage.on('pointerup', startGame);

background.anchor = { x: 0, y: 1 };
background.position.y = state.windowHeight;

gameOverImage.anchor = { x: 0.5, y: 0.5 };
gameOverImage.x = state.windowWidth / 2;
gameOverImage.y = state.windowHeight / 2;

buttonPause.on('pointerdown', pauseGame);
buttonPlay.on('pointerdown', reviveGame);
buttonShutdown.on('pointerup', shutdownGame);

app.stage.addChild(startImage);
app.stage.addChild(labelImage);

function playGame() {
    batman.position.y += 1.5 + state.g;
    background.tilePosition.x -= state.speed;
    batman.rotation += 0.007;
    state.g += 0.07;
    if ( bump() ) {
        pauseGame();
        app.stage.removeChild(buttonPlay);
        gameOver();
    }
    setBatCoin();
    setBarrier();
}

function startGame() {
    background.anchor = { x: 0, y: 1 };
    background.position.y = state.windowHeight;
    app.stage.addChild(background);
    app.stage.addChild(batman);
    app.stage.addChild(buttonPause);
    app.stage.addChild(buttonShutdown);

    state.currentScore = new PIXI.Text(`Your score: ${state.score}`);
    state.currentScore.anchor = { x: 1, y: 0 };
    state.currentScore.x = state.windowWidth - 150;
    state.currentScore.y = 20;
    app.stage.addChild(state.currentScore);

    state.currentBatCoinScore = new PIXI.Text(`Your BatCoins: ${state.batCoinScore}`);
    state.currentBatCoinScore.anchor = { x: 1, y: 0 };
    state.currentBatCoinScore.x = state.windowWidth - 150;
    state.currentBatCoinScore.y = 50;
    app.stage.addChild(state.currentBatCoinScore);

    app.stage.removeChild(startImage);
    app.stage.removeChild(labelImage);
    app.ticker.add(playGame);
    state.timeStart = Date.now() - state.timeout;
    state.timeCoin = Date.now();
}

function gameOver() {
    state.batmanGameOver = true;
    app.stage.removeChild(buttonPause);
    app.stage.removeChild(state.currentScore);
    app.stage.removeChild(state.currentBatCoinScore);
    app.stage.addChild(gameOverImage);

    state.result = new PIXI.Text(`Your score: ${state.score}`, {fontSize: '40px', fill: 'red'});
    state.result.anchor = { x: 0.5, y: 0.5 };
    state.result.x = state.windowWidth / 2;
    state.result.y = 80;
    app.stage.addChild(state.result);

    state.resultCoin = new PIXI.Text(`Your BatCoins: ${state.batCoinScore}`, {fontSize: '40px', fill: 'red'});
    state.resultCoin.anchor = { x: 0.5, y: 0.5 };
    state.resultCoin.x = state.windowWidth / 2;
    state.resultCoin.y = 120;
    app.stage.addChild(state.resultCoin);

    state.resultTotalScore = new PIXI.Text(`Your total BatCoins score: ${state.batCoinTotalScore}`, {fontSize: '40px', fill: 'red'});
    state.resultTotalScore.anchor = { x: 0.5, y: 0.5 };
    state.resultTotalScore.x = state.windowWidth / 2;
    state.resultTotalScore.y = 160;
    app.stage.addChild(state.resultTotalScore);

    if (state.batCoinScore >= 10) {
        app.stage.addChild(continueButton);
    }
}

function continueGame() {
    batman.x = 150;
    batman.y = 0;
    batman.rotation = 0;

    arrayAllBarriers.forEach((x, i) => {
        if (i > 0) app.stage.removeChild(arrayAllBarriers[i]);
    });

    arrayBarrierActivity.forEach((x, i) => {
        if (i > 0) app.ticker.remove(arrayMoveBarrier[i]);
    });

    arrayBarrierActivity.forEach((x, i, ar) => {
        if (i > 0) ar[i] = false;
    });

    reviveGame();
    state.batmanGameOver = false;
    state.batCoinScore -= 10;
    app.stage.addChild(buttonPause);
    app.stage.addChild(state.currentScore);
    app.stage.removeChild(state.result);
    app.stage.removeChild(state.resultCoin);
    app.stage.removeChild(state.resultTotalScore);

    state.currentBatCoinScore = new PIXI.Text(`Your BatCoins: ${state.batCoinScore}`);
    state.currentBatCoinScore.anchor = { x: 1, y: 0 };
    state.currentBatCoinScore.x = state.windowWidth - 150;
    state.currentBatCoinScore.y = 50;
    app.stage.addChild(state.currentBatCoinScore);

    app.stage.removeChild(gameOverImage);
    app.stage.removeChild(continueButton);
}

// buttonPause / Esc / P
function pauseGame() {
    state.difTimeForPause = state.timeStart + state.timeout - Date.now();
    state.difTimeForCoin = state.timeCoin + state.timeoutCoin - Date.now();

    state.batmanPause = true;

    arrayBarrierActivity.forEach((x, i) => {
        if (x === true) app.ticker.remove(arrayMoveBarrier[i]);
    });

    if (state.batCoin) app.ticker.remove(moveCoin);

    app.ticker.remove(playGame);
    app.stage.removeChild(buttonPause);
    app.stage.addChild(buttonPlay);
}

// buttonPlay / Esc / P
function reviveGame() {
    state.timeStart = Date.now() + state.difTimeForPause - state.timeout;
    state.timeCoin = Date.now() + state.difTimeForCoin - state.timeoutCoin;

    state.batmanPause = false;
    app.ticker.add(playGame);

    arrayBarrierActivity.forEach((x, i) => {
        if (x === true) app.ticker.add(arrayMoveBarrier[i]);
    });

    if (state.batCoin) app.ticker.add(moveCoin);

    app.stage.removeChild(buttonPlay);
    app.stage.addChild(buttonPause);
}

// buttonShutdown
function shutdownGame() {
    initialData();
    app.stage.addChild(startImage);
    app.stage.addChild(labelImage);
}

// restart game
function initialData() {
    app.stage.removeChild(buttonPlay);
    app.stage.removeChild(state.currentScore);
    app.stage.removeChild(state.result);
    app.stage.removeChild(gameOverImage);
    app.stage.removeChild(state.currentBatCoinScore);
    app.stage.removeChild(state.resultCoin);
    app.stage.removeChild(state.resultTotalScore);
    app.stage.removeChild(batCoin);
    app.stage.removeChild(moveCoin);

    arrayAllBarriers.forEach((x, i) => {
        if (i > 0) app.stage.removeChild(arrayAllBarriers[i]);
    });

    arrayBarrierActivity.forEach((x, i) => {
        if (i > 0) app.ticker.remove(arrayMoveBarrier[i]);
    });

    arrayBarrierActivity.forEach((x, i, ar) => {
        if (i > 0) ar[i] = false;
    });

    app.ticker.remove(playGame);
    app.stage.addChild(buttonPause);

    batman.x = 150;
    batman.y = 0;
    batman.rotation = 0;
    background.x = 0;
    background.y = 0;

    state.batmanPause = false;
    state.batmanGameOver = false;
    state.g = 0;
    state.speed = 4;
    state.score = 0;
    state.timeout = 4000;

    state.batCoinTotalScore = 0;
    state.timeoutCoin = 2000;
    state.batCoinScore = 0;
    state.batCoin = false;
    state.difTimeForCoin = 0;
}

export {
    playGame,
    startGame,
    gameOver,
    pauseGame,
    reviveGame,
    shutdownGame
}
