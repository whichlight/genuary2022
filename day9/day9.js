/**
 * genuary day 9
 * Prompt: architecture
 * 
 * <3 whichlight 
 * 
 * growing a building w Conway's game of life 
 * 
 * ref: https://en.wikipedia.org/wiki/Conway's_Game_of_Life
 * 
 */

let levels = []
let level = [];
let side;
let interval = 50; 
let cam;
let finished = false; 

function setup() {
    w = windowWidth;
    h = windowHeight;
    createCanvas(w, h, WEBGL);
    side = min(w,h);
    cam = camera(h*2,-1*h*2,h*3,0,-1*h,0);

    

    background(255);

    // create first level 
    for (let x = 0; x < side / interval; x++) {
        level[x] = []; // create nested array
        for (let y = 0; y < side / interval; y++) {
            if (x == 0 || y == 0 || x == floor(side / interval) || y == floor(side / interval)) level[x][y] = 0;
            else level[x][y] = floor(random(0, 2));
        }
    }

    frameRate(10);

}

function draw() {
    background(255);
    orbitControl();

    //render
    render(level);

    levels.forEach(function(l, i){
        render(l,i);
    })

    //update 
    if(!finished){
      levels.push(level);
      let nlevel = update(level);
      checkDiff(level,nlevel);
      level = nlevel;

   }


}


function checkDiff(a,b){
    let diff = 0; 
    for (let x = 0; x < side / interval; x++) {
        for (let y = 0; y < side / interval; y++) {
            diff+=abs(b[x][y]-a[x][y]); 
        }
    }
    if (diff==0){
        finished=true; 
    }
}

function update(clevel) {
    // next floor 
    let nlevel = [];
    for (let x = 0; x < side / interval; x++) {
        nlevel[x] = []; // create nested array
        for (let y = 0; y < side / interval; y++) {
            nlevel[x][y] = 0;
        }
    }

    //loop and check neighbors 
    for (let x = 1; x < side / interval - 1; x++) {
        for (let y = 1; y < side / interval - 1; y++) {

            //add up neighbors 
            let neighbors = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    neighbors += clevel[x + i][y + j];
                }
            }
            neighbors -= clevel[x][y];

            // Rules of Life
            if ((clevel[x][y] == 1) && (neighbors < 2)) nlevel[x][y] = 0;           // Loneliness
            else if ((clevel[x][y] == 1) && (neighbors > 3)) nlevel[x][y] = 0;           // Overpopulation
            else if ((clevel[x][y] == 0) && (neighbors == 3)) nlevel[x][y] = 1;           // Reproduction
            else nlevel[x][y] = clevel[x][y]; // Stasis
        }
    }
    return nlevel;
}

function render(clevel, level_num) {

    for (let x = 0; x < side / interval; x++) {
        for (let y = 0; y < side / interval; y++) {
            let rx = x * interval;
            let ry = y * interval;
            if (clevel[x][y] == 1) {
                push();
                translate(ry, -1*level_num*interval, rx-h/2);
                fill(255);
                strokeWeight(5);
                stroke(1);
                box(interval);
                pop(); 
            }
        }
    }
}


