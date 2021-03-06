import {
    app,
    state
} from './state';
import {
    batman,
    batmanHeight,
    batmanWidth
} from './batman';
import {
    textStyle
} from './play';

const batCoin = PIXI.Sprite.fromImage('img/batman/coin.png');
const batCoinWidth = 70;
const batCoinHeight = 40;
batCoin.height = 40;
batCoin.width = 70;

function setBatCoin() {
    if (state.batCoin) {
        if (takeCoin()) {
            let audioCoin = new Audio();
            audioCoin.src = 'music/batCoin.mp3';
            audioCoin.play();
            state.batCoin = false;
            app.stage.removeChild(batCoin);
            app.stage.removeChild(state.currentBatCoinScore);
            app.ticker.remove(moveCoin);
            state.batCoinScore++;
            state.batCoinTotalScore++;

            state.currentBatCoinScore = new PIXI.Text(`${state.batCoinScore}`, textStyle);
            state.currentBatCoinScore.x = state.windowWidth / 2 + 105;
            state.currentBatCoinScore.y = 20;
            app.stage.addChild(state.currentBatCoinScore);

            state.timeCoin = Date.now();
        } else if (batCoin.position.x + batCoinWidth < 0) {
            state.batCoin = false;
            app.ticker.remove(moveCoin);
            app.stage.removeChild(batCoin);
            state.timeCoin = Date.now();
        }
    } else if (state.timeCoin + state.timeoutCoin < Date.now()) {
        state.batCoin = true;
        setRandomBatCoin();
    }
}

function setRandomBatCoin() {
    let randomHeight = _.random(0, state.windowHeight - batCoinHeight);
    batCoin.x = state.windowWidth;
    batCoin.y = randomHeight;
    app.stage.addChild(batCoin);
    app.ticker.add(moveCoin);
}

function moveCoin() {
    batCoin.position.x -= state.speed;
}

function takeCoin() {
    if (batman.position.x + batmanWidth / 2 > batCoin.position.x) {
        if (batman.position.x - batmanWidth / 2 > batCoin.position.x + batCoinWidth) return false;
        if (batman.position.y - batmanHeight / 2 < batCoin.position.y &&
            batman.position.y + batmanHeight / 2 > batCoin.position.y) return true;
        if (batman.position.y - batmanHeight / 2 < batCoin.position.y + batCoinHeight &&
            batman.position.y + batmanHeight / 2 > batCoin.position.y + batCoinHeight) return true;
    }
    return false;
}

export {
    setBatCoin,
    moveCoin,
    batCoin
};
