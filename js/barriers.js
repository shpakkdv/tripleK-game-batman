import {app, state} from './state';
import {batman, batmanHeight, batmanWidth} from './batman';

const barrier1 = PIXI.Sprite.fromImage('../img/barriers/lower/lower1.jpg');
const barrier2 = PIXI.Sprite.fromImage('../img/barriers/lower/lower2.png');
const barrier3 = PIXI.Sprite.fromImage('../img/barriers/lower/lower3.png');
const barrier4 = PIXI.Sprite.fromImage('../img/barriers/lower/lower4.png');
const barrier5 = PIXI.Sprite.fromImage('../img/barriers/lower/lower5.png');
const barrier6 = PIXI.Sprite.fromImage('../img/barriers/lower/lower6.png');
const barrier7 = PIXI.Sprite.fromImage('../img/barriers/upper/upper1.png');
const barrier8 = PIXI.Sprite.fromImage('../img/barriers/upper/upper2.png');
const barrier9 = PIXI.Sprite.fromImage('../img/barriers/upper/upper3.png');
const barrier10 = PIXI.Sprite.fromImage('../img/barriers/rocket/rocket1.png');
const barrier11 = PIXI.Sprite.fromImage('../img/barriers/rocket/rocket2.png');
const barrier12 = PIXI.Sprite.fromImage('../img/barriers/rocket/rocket3.png');
const barrier13 = PIXI.Sprite.fromImage('../img/barriers/rocket/rocket4.png');
const barrier14 = PIXI.Sprite.fromImage('../img/barriers/rocket/rocket5.png');
const barrier15 = PIXI.Sprite.fromImage('../img/barriers/rocket/rocket6.png');
const barrier16 = PIXI.Sprite.fromImage('../img/barriers/rocket/rocket7.png');
const barrier17 = PIXI.Sprite.fromImage('../img/barriers/rocket/rocket8.png');

const barrier1Width = 113;
const barrier1Height = 353;

const barrier2Width = 325;
const barrier2Height = 300;

const barrier3Width = 256;
const barrier3Height = 256;

const barrier4Width = 256;
const barrier4Height = 256;

const barrier5Width = 400;
const barrier5Height = 400;

const barrier6Width = 162;
const barrier6Height = 200;

const barrier7Width = 452;
const barrier7Height = 150;

const barrier8Width = 188;
const barrier8Height = 159;

const barrier9Width = 79;
const barrier9Height = 277;

const barrier10Width = 163;
const barrier10Height = 100;

const barrier11Width = 106;
const barrier11Height = 60;

const barrier12Width = 138;
const barrier12Height = 24;

const barrier13Width = 151;
const barrier13Height = 27;

const barrier14Width = 156;
const barrier14Height = 25;

const barrier15Width = 148;
const barrier15Height = 25;

const barrier16Width = 212;
const barrier16Height = 36;

const barrier17Width = 160;
const barrier17Height = 82;

const arrayBarrierActivity = [null,
    false, false, false, false, false, false,
    false, false, false,
    false, false, false, false, false, false, false, false
];

const arrayAllBarriers = [null,
    barrier1, barrier2, barrier3, barrier4, barrier5, barrier6,
    barrier7, barrier8, barrier9,
    barrier10, barrier11, barrier12, barrier13, barrier14, barrier15, barrier16, barrier17
];

const arrayBarrierSize = [null,
    [barrier1Width, barrier1Height, 'lower'],
    [barrier2Width, barrier2Height, 'lower'],
    [barrier3Width, barrier3Height, 'lower'],
    [barrier4Width, barrier4Height, 'lower'],
    [barrier5Width, barrier5Height, 'lower'],
    [barrier6Width, barrier6Height, 'lower'],
    [barrier7Width, barrier7Height, 'upper'],
    [barrier8Width, barrier8Height, 'upper'],
    [barrier9Width, barrier9Height, 'upper'],
    [barrier10Width, barrier10Height, 'rocket'],
    [barrier11Width, barrier11Height, 'rocket'],
    [barrier12Width, barrier12Height, 'rocket'],
    [barrier13Width, barrier13Height, 'rocket'],
    [barrier14Width, barrier14Height, 'rocket'],
    [barrier15Width, barrier15Height, 'rocket'],
    [barrier16Width, barrier16Height, 'rocket'],
    [barrier17Width, barrier17Height, 'rocket']
];

const arrayMoveBarrier = [null,
    function moveBarrier1() { barrier1.position.x -= state.speed; },
    function moveBarrier2() { barrier2.position.x -= state.speed; },
    function moveBarrier3() { barrier3.position.x -= state.speed; },
    function moveBarrier4() { barrier4.position.x -= state.speed; },
    function moveBarrier5() { barrier5.position.x -= state.speed; },
    function moveBarrier6() { barrier6.position.x -= state.speed; },
    function moveBarrier7() { barrier7.position.x -= state.speed; },
    function moveBarrier8() { barrier8.position.x -= state.speed; },
    function moveBarrier9() { barrier9.position.x -= state.speed; },
    function moveBarrier10() { barrier10.position.x -= state.speed + 1; },
    function moveBarrier11() { barrier11.position.x -= state.speed + 1; },
    function moveBarrier12() { barrier12.position.x -= state.speed + 1; },
    function moveBarrier13() { barrier13.position.x -= state.speed + 1; },
    function moveBarrier14() { barrier14.position.x -= state.speed + 1; },
    function moveBarrier15() { barrier15.position.x -= state.speed + 1; },
    function moveBarrier16() { barrier16.position.x -= state.speed + 1; },
    function moveBarrier17() { barrier17.position.x -= state.speed + 1; }
];

function setOneBarrier(number) {
    if (arrayBarrierSize[number][2] === 'lower') {
        arrayAllBarriers[number].anchor = { x: 0, y: 1 };
        arrayAllBarriers[number].x = state.windowWidth;
        arrayAllBarriers[number].y = state.windowHeight;
        app.stage.addChild(arrayAllBarriers[number]);
        app.ticker.add(arrayMoveBarrier[number]);
    }
    else if (arrayBarrierSize[number][2] === 'upper') {
        arrayAllBarriers[number].x = state.windowWidth;
        arrayAllBarriers[number].y = 0;
        app.stage.addChild(arrayAllBarriers[number]);
        app.ticker.add(arrayMoveBarrier[number]);
    }
    else if (arrayBarrierSize[number][2] === 'rocket') {
        arrayAllBarriers[number].x = state.windowWidth;
        arrayAllBarriers[number].y = randomHeight(arrayBarrierSize[number][1]);
        app.stage.addChild(arrayAllBarriers[number]);
        app.ticker.add(arrayMoveBarrier[number]);
    }
}

function randomHeight(objHeight) {
    return _.random(0, state.windowHeight - objHeight);
}

// every "timeout"ms stay random non-repeated barrier
function setBarrier() {
    if (state.timeStart + state.timeout < Date.now()) {
        let random;
        do {
            random = _.random(1, 17);
            /*delete*/ console.log(random);
            if (arrayBarrierActivity[random] === false) {
                setOneBarrier(random);
                arrayBarrierActivity[random] = true;
            }
            else {
                random = 0;
            }
        } while (random === 0);
        state.timeStart = Date.now();
    }
    checkBarriers();
}

// delete barrier & update score
function checkBarriers() {
    for (let i = 1; i < arrayAllBarriers.length; i++) {
        if (arrayBarrierActivity[i]) {
            if (arrayAllBarriers[i].position.x + arrayBarrierSize[i][0] < 0) {
                arrayBarrierActivity[i] = false;
                app.ticker.remove(arrayMoveBarrier[i]);
                app.stage.removeChild(arrayAllBarriers[i]);
                updateScore();
            }
        }
    }
}

// true if batman concerned barrier or bottom
function bump() {
    // bottom
    if (batman.position.y > state.windowHeight) return true;
    // barrier
    for (let i = 1; i < arrayAllBarriers.length; i++) {
        if (arrayBarrierActivity[i]) {
            switch (arrayBarrierSize[i][2]) {
                case 'lower': {
                    if (lowerBump(arrayAllBarriers[i], arrayBarrierSize[i][0], arrayBarrierSize[i][1])) {
                        return true;
                    }
                    break;
                }
                case 'upper': {
                    if (upperBump(arrayAllBarriers[i], arrayBarrierSize[i][0], arrayBarrierSize[i][1])) {
                        return true;
                    }
                    break;
                }
                case 'rocket': {
                    if (rocketBump(arrayAllBarriers[i], arrayBarrierSize[i][0], arrayBarrierSize[i][1])) {
                        return true;
                    }
                    break;
                }
            }
        }
    }
    return false;
}

function lowerBump(barrier, barWidth, barHeight) {
    if (batman.position.x + batmanWidth/2 > barrier.position.x && batman.position.y + batmanHeight/2 > barrier.position.y - barHeight) {
        if (barrier.position.x + barWidth < batman.position.x - batmanWidth/2) return false;
        return true;
    }
}

function upperBump(barrier, barWidth, barHeight) {
    if (batman.position.x + batmanWidth/2 > barrier.position.x && batman.position.y - batmanHeight/2 < barrier.position.y + barHeight) {
        if (barrier.position.x + barWidth < batman.position.x - batmanWidth/2) return false;
        return true;
    }
}

function rocketBump(barrier, barWidth, barHeight) {
    if (batman.position.x + batmanWidth/2 > barrier.position.x) {
        if (batman.position.x - batmanWidth/2 > barrier.position.x + barWidth) return false;
        if (batman.position.y - batmanHeight/2 < barrier.position.y &&
            batman.position.y + batmanHeight/2 > barrier.position.y) return true;
        if (batman.position.y - batmanHeight/2 < barrier.position.y + barHeight &&
            batman.position.y + batmanHeight/2 > barrier.position.y + barHeight) return true;
    }
    return false;
}

function updateScore() {
    app.stage.removeChild(state.currentScore);
    state.score++;
    state.currentScore = new PIXI.Text(`Your score: ${state.score}`);
    state.currentScore.anchor = { x: 1, y: 0 };
    state.currentScore.x = state.windowWidth - 150;
    state.currentScore.y = 20;
    if (state.score % 3 === 0) state.speed += 0.5;
    if (state.score === 24) state.timeout = 2000;
    if (state.score === 50) state.timeout = 1000;
    app.stage.addChild(state.currentScore);
}

export {
    arrayBarrierActivity,
    arrayAllBarriers,
    arrayMoveBarrier,
    setBarrier,
    bump,
};
