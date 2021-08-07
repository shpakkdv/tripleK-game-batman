import {state} from './state';

const batmanHeight = 123 * state.coefficient;
const batmanWidth = 189 * state.coefficient;

let batman;

function flyBatman() {
    const frames = [
        PIXI.Texture.fromFrame('rollSequence000.png'),
        PIXI.Texture.fromFrame('rollSequence001.png'),
        PIXI.Texture.fromFrame('rollSequence002.png')
    ];

    batman = new PIXI.extras.AnimatedSprite(frames);

    batman.anchor.set(0.5, 0.5);
    batman.interactive = true;
    batman.x = 150;
    batman.y = 0;

    batman.animationSpeed = 0.15;
}

function batmanUp() {
    if (state.batmanPause !== true && batman.position.y > -10) {
        batman.position.y -= state.up;
        batman.rotation = -0.1;
        state.g = 0;
    }
}

export {
	batman,
    batmanUp,
    batmanHeight,
    batmanWidth,
    flyBatman
}
