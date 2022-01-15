/**
 * genuary day 15
 * Prompt: sand
 * 
 * <3 whichlight 
 * 
 * ref: 
 * https://maxbittker.github.io/dust/
 * https://maxbittker.com/making-sandspiel
 * 
 */

let w, h = 0;
let board = [];
let side = 20; 

function setup() {
    w = windowWidth; 
    h = windowHeight; 
    createCanvas(w, h);
    background(255);
    colorMode(HSB, 360, 100, 100,100);
    frameRate(20);

    //creategrid
    for(let i = 0; i<w/side; i++){
        board.push(new Array(floor(h/side)));
    }

    //initialize
    for(let i = 0; i<w/side; i++){
        for(let j = 0; j<h/side; j++){
            board[i][j]=0;
        }
    }
}

function draw() {
    background(180,100,100);

    //update
    for(let i = 0; i<w/side; i++){
        for(let j = floor(h/side); j>=0; j--){
          if(board[i][j]==1 && board[i][j+1]==0){
              board[i][j+1]=1;
              board[i][j]=0;
          }
        }
    }

    //render 
    for(let i = 0; i<w/side; i++){
        for(let j = 0; j<h/side; j++){
            let c = 180; 
            if(board[i][j]==1) c=60;
            fill(c,100,100)
            noStroke();
            rect(i*side, j*side, side, side);
        }
    }
}

function mouseDragged(){
    if(mouseX < w && mouseX >0 && mouseY < h && mouseY > 0){
        x = floor(mouseX/side); 
        y = floor(mouseY/side); 
        board[x][y]=1; 
    }
}