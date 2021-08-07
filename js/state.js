export const state = {
    batmanPause: false,
    batmanGameOver: true,
    batmanStartGame: false,

    g: 0,
    speed: 4,
    up: 100,
    down: 50,
    fall: 1.5,

    score: 0,
    currentScore: 0,
    result: '',

    allScores: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ],

    timeStart: Date.now(),
    timeout: 4000,
    difTimeForPause: 0,

    batCoinScore: 0,
    currentBatCoinScore: '',
    batCoinTotalScore: 0,
    resultTotalScore: '',
    resultCoin: '',
    batCoin: false,
    timeCoin: Date.now(),
    timeoutCoin: 2000,
    difTimeForCoin: 0,

    coefficient: 0.9,

    windowWidth: document.body.offsetWidth,
    windowHeight: window.innerHeight,
};

export const app = new PIXI.Application(
    state.windowWidth,
    state.windowHeight, {
        backgroundColor: 0xffcf2d
    }
);

WebFont.load({
    google: {
        families: ['Press Start 2P']
    }
});
