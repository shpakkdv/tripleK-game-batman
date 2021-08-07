export const state = {
    batmanPause: false,
    batmanGameOver: false,

    g: 0,
    speed: 4,

    score: 0,
    currentScore: 0,
    result: '',

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

    windowWidth: document.body.offsetWidth,
    windowHeight: window.innerHeight,
};

export const app = new PIXI.Application(
    state.windowWidth,
    state.windowHeight,
    {backgroundColor: 0xffcf2d}
);
