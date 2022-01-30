/**
 * genuary day 29
 * Prompt: isometric perspective
 * 
 * <3 whichlight 
 * 
 * ref: https://happycoding.io/examples/p5js/creating-classes/isometric-cubes
 */

//mobile disable default touch events so no scrolling or highlight etc 
touchStarted = () => false;

let w, h = 0;
let cubes = [];

let gridTopX;
let gridTopY;
const sideLength = 20;
const boardLen = 20;

setup = () => {
    h = windowHeight;
    w = windowWidth;
    gridTopX = w / 2;
    gridTopY = h / 2 - 150;

    colorMode(HSB, 360, 100, 100, 100);
    createCanvas(w, h);
    ellipseMode(CENTER);
    rectMode(CENTER);
    frameRate(10);

}


draw = () => {
    background(180, 100, 100);
    let c = floor(random(boardLen));
    let r = floor(random(boardLen));
    cubes.push(new Cube(c, r, boardLen * 2));
   
    for (const cube of cubes) {
        if (cube.moving) {
            cube.update();
        }
    }

    cubes.sort((a, b) => {
        return a.getSortString().localeCompare(b.getSortString());
    });

    for (const cube of cubes) {
        cube.draw();
    }
}


class Cube {
    constructor(c, r, z) {
        this.c = c;
        this.r = r;
        this.z = z;
        this.moving = true;

        //leaving this for color version reference. i overwrite it later to make it monochrome 
        this.col = 300 * (map(c, 0, boardLen, 1, 0) ** 2 + map(r, 0, boardLen, 1, 0) ** 2);

    }

    update() {
        if (this.z == 0) {
            this.moving = false;
        }

        if (this.moving) {
            for (const cube of cubes) {
                if (this != cube) {
                    if (this.c == cube.c && this.r == cube.r && !cube.moving && (this.z - 1) == cube.z) {
                        this.moving = false;
                    }
                }
            }
        }

        if (this.z > 0 && this.moving) {
            this.z -= 1;
        }
    }

    draw() {
        const x = gridTopX + (this.c - this.r) * sideLength *
            sqrt(3) / 2;
        const y = gridTopY + (this.c + this.r) * sideLength / 2 -
            (sideLength * this.z);

        const points = [];
        for (let angle = PI / 6; angle < PI * 2; angle += PI / 3) {
            points.push(
                createVector(x + cos(angle) * sideLength,
                    y + sin(angle) * sideLength));
        }

        strokeWeight(1);

        this.col = 300;
        stroke(this.col, 100, 25);
        fill(this.col, 100, 100);
        quad(x, y,
            points[5].x, points[5].y,
            points[0].x, points[0].y,
            points[1].x, points[1].y);

        fill(this.col, 100, 50);
        quad(x, y,
            points[1].x, points[1].y,
            points[2].x, points[2].y,
            points[3].x, points[3].y);

        fill(this.col, 100, 100);
        quad(x, y,
            points[3].x, points[3].y,
            points[4].x, points[4].y,
            points[5].x, points[5].y);
    }

    getSortString() {
        return this.z + '.' + this.r + '.' + this.c;
    }
}









