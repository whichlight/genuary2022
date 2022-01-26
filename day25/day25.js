/**
 * genuary day 25
 * Prompt: perspective
 * 
 * <3 whichlight 
 * 
 */

let w, h = 0;
let side = 100;
let level = 0;
let gcol = 300;
let boxes = [];

setup = () => {
    h = windowHeight;
    w = windowWidth;
    side = floor(min(w, h) / 7);
    colorMode(HSB, 360, 100, 100, 100);
    createCanvas(w, h, WEBGL);
    frameRate(20);
    render({ x: w / 2, y: h / 2, c: 300 }, 0);
}

draw = () => {
    background(300, 100, 100, 100)
    camera(0, 0, level * side + 500);
    
    if (boxes.length == 0) render({ x: 0, y: 0, c: 300 }, level * side);

    boxes.forEach((p) => render({ x: p.x, y: p.y, c: p.c }, side * p.z));

    if (!mouseIsPressed && level > 0) {
        level--;
        gcol = random(360);
    }

    if (mouseIsPressed) {
        let b = { x: mouseX - w / 2, y: mouseY - h / 2, c: gcol, z: level };
        boxes.push(b)
        level++;
    }

}

touchStarted = () => false;

let render = (p, i) => {
    push();
    translate(p.x, p.y, i);
    strokeWeight(3);
    stroke(60, 100, 100);
    fill(p.c, 100, 100, 50);
    box(side);
    pop();
}

