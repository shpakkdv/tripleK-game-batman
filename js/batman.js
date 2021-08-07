import {state} from './state';

const batman = PIXI.Sprite.fromImage('../img/batman/batman.png');

batman.anchor.set(0.5, 0.5);
batman.interactive = true;
batman.x = 150;
batman.y = 0;
const batmanHeight = 123;
const batmanWidth = 189;

function batmanUp() {
    if (state.batmanPause !== true && batman.position.y > -10) {
        batman.position.y -= state.windowHeight * 0.16;
        batman.rotation = -0.1;
        state.g = 0;
    }
}

export {
	batman,
    batmanUp,
    batmanHeight,
    batmanWidth,
}
