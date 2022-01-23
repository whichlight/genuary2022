/**
 * genuary day 22
 * Prompt: make something that will look completely different in a year
 * 
 * <3 whichlight 
 * 
 */


const days_old = 19015.20730428241;
const days_new = Date.now() / (1000 * 60 * 60 * 24);
let side = 10;

let passage = 0;
let board = [];
let gas = []; 

function setup() {
    h = windowHeight;
    w = windowWidth;
    colorMode(HSB, 360, 100, 100, 100);
    createCanvas(w, h);
    csize = w / 20;
    passage = map(days_new - days_old, 0, 365, 0, 1);
    //passage = 0.5;  


    //creategrid
    for (let i = 0; i < w / side; i++) {
        board.push(new Array(floor(h / side)));
    }

    //initialize
    for (let i = 0; i < w / side; i++) {
        for (let j = 0; j < h / side; j++) {
            board[i][j] = 0;
        }
    }

    //sublimate

    // add initial particles 
    let num = w*h/(3*side*side); 
    for(let i=0; i<num; i++){
        
        if(random()<=passage){
            addParticle(2); 
        } 
        else{
            addParticle(1);

        }
    }

  

}

function draw() {
    background(180, 0, 20);

    //update
    for (let i = 0; i < w / side; i++) {
        for (let j = floor(h / side); j >= 0; j--) {
            if (board[i][j] == 1 && board[i][j + 1] == 0) {
                board[i][j + 1] = 1;
                board[i][j] = 0;
            }
        }
    }

    //render 
    for (let i = 0; i < w / side; i++) {
        for (let j = 0; j < h / side; j++) {
            let c = map(passage,0,1, 240,180);
            if (board[i][j] == 1) c = 300;
            fill(c, 100, 100)
            noStroke();
            rect(i * side, j * side, side, side);
        }
    }

    //gas
    gas.forEach(function(p){

        //move if on particle
        while(board[p.x][p.y]==1)
        {
            p.x = floor(random(0,w)/side); 
            p.y = floor(random(0,h)/side); 
        }


        fill(60, 100, 100)
            noStroke();
            rect(p.x * side, p.y * side, side, side);
    })

}

function addParticle(p_type){
  
    if(p_type == 1){
        x = floor(random(0,w)/side); 
        y = floor(random(0,h)/side); 
        board[x][y]=p_type; 
    }
    if(p_type == 2){
        x = floor(random(0,w)/side); 
        y = floor(random(0,h)/side); 
        gas.push({x: x, y: y}); 
    }
}

function mouseDragged(){
    if(mouseX < w && mouseX >0 && mouseY < h && mouseY > 0){
        x = floor(mouseX/side); 
        y = floor(mouseY/side); 
        board[x][y]=1; 
    }
}


