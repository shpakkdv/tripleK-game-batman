import {
    app,
    state
} from './state';
import {
    buttonPause,
    buttonPlay,
    resizeButton,
    startButton,
    continueButton,
    gameOverImage,
    buttonRestart,
    buttonVolume
} from './buttons';
import {
    batman,
    flyBatman
} from './batman';
import {
    bump,
    setBarrier,
    arrayBarrierActivity,
    arrayMoveBarrier,
    arrayAllBarriers
} from './barriers';
import {
    setBatCoin,
    moveCoin,
    batCoin
} from './batCoin';

let tableBestScoresRating;
let tableBestScores;
let tableBestScoresBatCoins;
let startImage;
let background;
let pauseImage;
let audio = new Audio();

const bestScores = PIXI.Sprite.fromImage('img/buttons/7.png');
bestScores.interactive = true;
bestScores.buttonMode = true;
bestScores.anchor = {
    x: 0.5,
    y: 0.5
};
bestScores.scale = {
    x: 0.25,
    y: 0.26
};
bestScores.x = state.windowWidth / 2 - 300;
bestScores.y = state.windowHeight - 150;
bestScores.on('pointerdown', showBestScores);

const scoreBackground = PIXI.Sprite.fromImage('img/game/scoreBackground.jpg');
scoreBackground.width = state.windowWidth;
scoreBackground.height = state.windowHeight;

const backButton = PIXI.Sprite.fromImage('img/buttons/6.png');
backButton.interactive = true;
backButton.buttonMode = true;
backButton.scale = {
    x: 0.2,
    y: 0.2
};
backButton.x = 5;
backButton.y = state.windowHeight - 120;
backButton.on('pointerdown', closeBestScores);

const textStyle = new PIXI.TextStyle({
    fontFamily: 'Press Start 2P',
});

const loaderImg = PIXI.Sprite.fromImage('img/buttons/spin.png');
loaderImg.anchor.set(0.5);
loaderImg.x = app.renderer.width / 2;
loaderImg.y = app.renderer.height / 2;
app.stage.addChild(loaderImg);

let loader = PIXI.loader;
loader.add('img/game/bg3.jpg')
    .add('img/game/gameOver2.png')
    .add('img/game/scoreBackground.jpg')
    .add('img/background/background.jpg')
    .add('img/barriers/lower/lower1.jpg')
    .add('img/barriers/lower/lower2.png')
    .add('img/barriers/lower/lower3.png')
    .add('img/barriers/lower/lower4.png')
    .add('img/barriers/lower/lower5.png')
    .add('img/barriers/lower/lower6.png')
    .add('img/barriers/upper/upper1.png')
    .add('img/barriers/upper/upper2.png')
    .add('img/barriers/upper/upper3.png')
    .add('img/barriers/rocket/rocket1.png')
    .add('img/barriers/rocket/rocket2.png')
    .add('img/barriers/rocket/rocket3.png')
    .add('img/barriers/rocket/rocket4.png')
    .add('img/barriers/rocket/rocket5.png')
    .add('img/barriers/rocket/rocket6.png')
    .add('img/barriers/rocket/rocket7.png')
    .add('img/barriers/rocket/rocket8.png')
    .add('img/batman/batmanXS.png')
    .add('img/batman/coin.png')
    .add('img/buttons/back.png')
    .add('img/game/pause.png')
    .add('img/game/startGame.png')
    .add('animation/batman.json')
    .load(flyBatman);
loader.onProgress.add(() => {
    loaderImg.rotation += 0.05;
});

loader.onComplete.add(() => {
    startImage = PIXI.Sprite.fromImage('img/game/bg3.jpg');
    pauseImage = PIXI.Sprite.fromImage('img/game/pause.png');
    background = PIXI.extras.TilingSprite.fromImage('img/background/houses400.gif', state.windowWidth, 400);

    startImage.width = state.windowWidth;
    startImage.height = state.windowHeight;

    background.anchor = {
        x: 0,
        y: 1
    };
    background.position.y = state.windowHeight;


    pauseImage.anchor = {
        x: 0.5,
        y: 0.5
    };
    pauseImage.x = state.windowWidth / 2;
    pauseImage.y = state.windowHeight / 2 - 75;

    buttonVolume.x = state.windowWidth / 2 + 300;
    buttonVolume.y = state.windowHeight - 150;

    app.stage.addChild(startImage);
    app.stage.addChild(startButton);
    app.stage.addChild(bestScores);
    app.stage.addChild(buttonVolume);

    audio.addEventListener('ended', function () {
        if (!state.batmanGameOver) {
            audio.currentTime = 2;
            audio.play();
        }
    })
    audio.src = 'music/main_theme.mp3';
    audio.play();
});
loader.load();

function playGame() {
    batman.position.y += state.fall + state.g;
    background.tilePosition.x -= state.speed;
    batman.rotation += 0.007;
    state.g += 0.07;
    if (bump()) {
        audio.src = 'music/crash.mp3';
        audio.currentTime = 1.5;
        audio.play();
        pauseGame();
        app.stage.removeChild(buttonPlay);
        gameOver();
    }
    setBatCoin();
    setBarrier();
}

function startGame() {
    batman.play();
    state.batmanStartGame = true;
    state.batmanGameOver = false;
    background.anchor = {
        x: 0,
        y: 1
    };
    background.position.y = state.windowHeight;
    app.stage.addChild(background);
    app.stage.addChild(batman);
    app.stage.addChild(buttonPause);

    state.currentScore = new PIXI.Text(`Score:${state.score}`, textStyle);
    state.currentScore.anchor = {
        x: 1,
        y: 0
    };
    state.currentScore.x = state.windowWidth / 2 + 10;
    state.currentScore.y = 20;
    app.stage.addChild(state.currentScore);

    state.currentBatCoinScore = new PIXI.Text(`${state.batCoinScore}`, textStyle);
    state.currentBatCoinScore.x = state.windowWidth / 2 + 105;
    state.currentBatCoinScore.y = 20;
    app.stage.addChild(state.currentBatCoinScore);

    const batCoinScoreImage = PIXI.Sprite.fromImage('img/batman/25.png');
    batCoinScoreImage.anchor = {
        x: 1,
        y: 0
    };
    batCoinScoreImage.scale = {
        x: 0.3,
        y: 0.3
    };
    batCoinScoreImage.x = state.windowWidth / 2 + 95;
    batCoinScoreImage.y = 10;
    app.stage.addChild(batCoinScoreImage);

    app.stage.removeChild(startImage);
    app.stage.removeChild(startButton);
    app.stage.removeChild(bestScores);
    app.stage.removeChild(loaderImg);
    app.stage.removeChild(buttonVolume);
    app.ticker.add(playGame);
    state.timeStart = Date.now() - state.timeout;
    state.timeCoin = Date.now();
}

function gameOver() {
    state.batmanStartGame = false;
    buttonRestart.y = state.windowHeight / 2 + 210;
    buttonVolume.y = state.windowHeight / 2 + 210;
    state.batmanGameOver = true;
    app.stage.removeChild(pauseImage);
    app.stage.removeChild(buttonPause);
    app.stage.addChild(gameOverImage);

    // state.resultTotalScore = new PIXI.Text(`Your total BatCoins score: ${state.batCoinTotalScore}`, {
    //     fontSize: '40px',
    //     fill: 'red'
    // });
    // state.resultTotalScore.anchor = {
    //     x: 0.5,
    //     y: 0.5
    // };
    // state.resultTotalScore.x = state.windowWidth / 2;
    // state.resultTotalScore.y = 160;
    // app.stage.addChild(state.resultTotalScore);

    if (state.batCoinScore >= 10) {
        app.stage.addChild(continueButton);
    }
}

function continueGame() {
    state.batmanStartGame = true;
    audio.src = 'music/main_theme.mp3';
    audio.play();
    batman.x = 150;
    batman.y = 0;
    batman.rotation = 0;
    buttonRestart.y = state.windowHeight / 2 + 75;

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
    app.stage.removeChild(state.result);
    app.stage.removeChild(state.resultCoin);
    app.stage.removeChild(state.currentBatCoinScore);
    // app.stage.removeChild(state.resultTotalScore);

    state.currentBatCoinScore = new PIXI.Text(`${state.batCoinScore}`, textStyle);
    state.currentBatCoinScore.x = state.windowWidth / 2 + 105;
    state.currentBatCoinScore.y = 20;
    app.stage.addChild(state.currentBatCoinScore);

    app.stage.removeChild(gameOverImage);
    app.stage.removeChild(continueButton);
}

// buttonPause / Esc / P
function pauseGame() {
    batman.stop();
    state.batmanStartGame = true;
    buttonVolume.x = state.windowWidth / 2 + 75;
    buttonVolume.y = state.windowHeight / 2 + 75;
    app.ticker.remove(playGame);
    app.stage.addChild(pauseImage);
    app.stage.addChild(buttonRestart);
    app.stage.addChild(buttonVolume);
    state.difTimeForPause = state.timeStart + state.timeout - Date.now();
    state.difTimeForCoin = state.timeCoin + state.timeoutCoin - Date.now();

    state.batmanPause = true;

    arrayBarrierActivity.forEach((x, i) => {
        if (x === true) app.ticker.remove(arrayMoveBarrier[i]);
    });

    if (state.batCoin) app.ticker.remove(moveCoin);

    app.stage.removeChild(buttonPause);
    app.stage.addChild(buttonPlay);
}

// buttonPlay / Esc / P
function reviveGame() {
    batman.play();
    app.stage.removeChild(pauseImage);
    app.stage.removeChild(buttonRestart);
    app.stage.removeChild(buttonVolume);
    audio.play();
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
    state.batmanStartGame = false;
    if (state.allScores.some(x => x[0] === 0 && x[1] === 0) ||
        state.allScores[state.allScores.length - 1][0] < state.score) {
        state.allScores[state.allScores.length - 1][0] = state.score;
        state.allScores[state.allScores.length - 1][1] = state.batCoinTotalScore;
        state.allScores.sort((a, b) => b[0] - a[0]);
    }

    initialData();
    app.stage.addChild(startImage);
    app.stage.addChild(startButton);
    app.stage.addChild(bestScores);
    app.stage.addChild(buttonVolume);
}

// restart game
function initialData() {
    audio.src = 'music/main_theme.mp3';
    audio.play();

    app.stage.removeChild(buttonPlay);
    app.stage.removeChild(state.currentScore);
    app.stage.removeChild(state.result);
    app.stage.removeChild(gameOverImage);
    app.stage.removeChild(state.currentBatCoinScore);
    app.stage.removeChild(state.resultCoin);
    app.stage.removeChild(pauseImage);
    app.stage.removeChild(buttonRestart);
    app.stage.removeChild(batCoin);
    app.stage.removeChild(moveCoin);
    buttonRestart.y = state.windowHeight / 2 + 75;
    buttonVolume.x = state.windowWidth / 2 + 300;
    buttonVolume.y = state.windowHeight - 150;

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

function showBestScores() {
    state.batmanStartGame = false;
    app.stage.removeChild(bestScores);
    app.stage.addChild(scoreBackground);


    tableBestScoresRating = new PIXI.Text(
        'Rating:\n\n' +
        '1.\n' +
        '2.\n' +
        '3.\n' +
        '4.\n' +
        '5.\n' +
        '6.\n' +
        '7.\n' +
        '8.\n' +
        '9.\n' +
        '10.', {
        fontFamily: 'Press Start 2P',
        align: 'center',
        fill: 'black'
    });

    tableBestScores = new PIXI.Text(
        'Score:' + '\n\n' +
        state.allScores[0][0] + '\n' +
        state.allScores[1][0] + '\n' +
        state.allScores[2][0] + '\n' +
        state.allScores[3][0] + '\n' +
        state.allScores[4][0] + '\n' +
        state.allScores[5][0] + '\n' +
        state.allScores[6][0] + '\n' +
        state.allScores[7][0] + '\n' +
        state.allScores[8][0] + '\n' +
        state.allScores[9][0], {
        fontFamily: 'Press Start 2P',
        align: 'center',
        fill: 'black'
    });

    tableBestScoresBatCoins = new PIXI.Text(
        'Total BatCoins:' + '\n\n' +
        state.allScores[0][1] + '\n' +
        state.allScores[1][1] + '\n' +
        state.allScores[2][1] + '\n' +
        state.allScores[3][1] + '\n' +
        state.allScores[4][1] + '\n' +
        state.allScores[5][1] + '\n' +
        state.allScores[6][1] + '\n' +
        state.allScores[7][1] + '\n' +
        state.allScores[8][1] + '\n' +
        state.allScores[9][1], {
        fontFamily: 'Press Start 2P',
        align: 'center',
        fill: 'black'
    });

    tableBestScoresRating.x = (state.windowWidth - tableBestScoresRating.width - tableBestScores.width - tableBestScoresBatCoins.width - 30) / 2;
    tableBestScores.x = tableBestScoresRating.position.x + tableBestScoresRating.width + 15;
    tableBestScoresBatCoins.x = tableBestScores.position.x + tableBestScores.width + 15;

    tableBestScoresRating.y = 50;
    tableBestScores.y = 50;
    tableBestScoresBatCoins.y = 50;

    app.stage.addChild(tableBestScoresRating);
    app.stage.addChild(tableBestScores);
    app.stage.addChild(tableBestScoresBatCoins);
    app.stage.addChild(backButton);
    app.stage.removeChild(startButton);
    app.stage.removeChild(buttonVolume);
}

function closeBestScores() {
    app.stage.addChild(bestScores);
    app.stage.removeChild(scoreBackground);
    app.stage.removeChild(tableBestScoresRating);
    app.stage.removeChild(tableBestScores);
    app.stage.removeChild(tableBestScoresBatCoins);
    app.stage.removeChild(backButton);
    app.stage.addChild(startButton);
    app.stage.addChild(buttonVolume);
}

export {
    playGame,
    startGame,
    gameOver,
    pauseGame,
    reviveGame,
    shutdownGame,
    continueGame,
    audio,
    textStyle,
    pauseImage,
}
