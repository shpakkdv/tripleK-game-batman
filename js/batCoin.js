import {app, state} from './state';
import {batman, batmanHeight, batmanWidth} from './batman';

const batCoin = PIXI.Sprite.fromImage('../img/batman/batCoin.png');
const batCoinWidth = 107;
const batCoinHeight = 50;

function setBatCoin() {
    if (state.batCoin) {
        if (takeCoin()) {
            state.batCoin = false;
            app.stage.removeChild(batCoin);
            app.stage.removeChild(state.currentBatCoinScore);
            app.ticker.remove(moveCoin);
            state.batCoinScore++;
            state.batCoinTotalScore++;
            state.currentBatCoinScore = new PIXI.Text(`Your BatCoins: ${state.batCoinScore}`);
            state.currentBatCoinScore.anchor = { x: 1, y: 0 };
            state.currentBatCoinScore.x = state.windowWidth - 150;
            state.currentBatCoinScore.y = 50;
            app.stage.addChild(state.currentBatCoinScore);
            state.timeCoin = Date.now();
        }
        else if (batCoin.position.x + batCoinWidth < 0) {
            state.batCoin = false;
            app.ticker.remove(moveCoin);
            app.stage.removeChild(batCoin);
            state.timeCoin = Date.now();
        }
    }
    else if (state.timeCoin + state.timeoutCoin < Date.now()) {
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
    if (batman.position.x + batmanWidth/2 > batCoin.position.x) {
        if (batman.position.x - batmanWidth/2 > batCoin.position.x + batCoinWidth) return false;
        if (batman.position.y - batmanHeight/2 < batCoin.position.y &&
            batman.position.y + batmanHeight/2 > batCoin.position.y) return true;
        if (batman.position.y - batmanHeight/2 < batCoin.position.y + batCoinHeight &&
            batman.position.y + batmanHeight/2 > batCoin.position.y + batCoinHeight) return true;
    }
    return false;
}

export {
    setBatCoin,
    moveCoin,
    batCoin
};
