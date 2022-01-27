/**
 * genuary day 26
 * Prompt: airport carpet
 * 
 * <3 whichlight 
 * 
 */

let w, h = 0;
let numSideTiles = 4;
let side = 200; 
let tile = []; //side x side tile 
let bin = side/20; 
let tileLen; 
let gcol = 300; 
let cols = [0, 30, 60, 120, 210, 240, 270, 300];

setup = () => {
    h = windowHeight;
    w = windowWidth;
    numSidetiles = floor(min(w,h)/side);
    colorMode(HSB, 360, 100, 100, 100);
    createCanvas(w, h);

    //initialize 
     tileLen = floor(side/bin); 
  
    for(let i = 0; i<tileLen; i++){
        let tmp = []; 
        for(let i = 0; i<tileLen; i++){
            tmp.push(0); 
        }
        tile.push(tmp); 
    }
    background(180, 100, 100, 100)

}

draw = () => {

    if(mouseIsPressed){
        let i = floor((mouseX%side)/bin); 
        let j = floor((mouseY%side)/bin); 
        
        if(i<tile.length && j<tile.length){
            tile[i][j]= gcol; 
            drawTilePixel(i,j,gcol);
        }
    }

    if(!mouseIsPressed){
        gcol = randColor(); 
    }
}

touchStarted = () => false;

const drawTilePixel = (i,j,gcol) => {
    for(let x = 0; x<w/side; x++){
        for(let y = 0; y<h/side; y++){
            noStroke();
            fill(gcol, 100, 100);
            rect((side*x+i*bin), (side*y+j*bin), bin, bin);
        }
    }
}

const randColor = () => cols[floor(random(cols.length))];


