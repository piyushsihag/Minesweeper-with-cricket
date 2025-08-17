var board = [];
var rows=8;
var columns=8;
var minesCount=11;
var score=0;
var prevscore=0;
var minesLocation = []; 
var onesLocation = [];
var twosLocation = [];
var foursLocation = [];
var sixesLocation = [];
var powslocation=[];
var highscore=0;
var tilesClicked = 0; 
var flagEnabled = false;
var gameOver = false;
var ones=16;
var twos=14;
var fours=12;
var sixes= 11;
var max_blink=2;
var max_double=2;
var factor=1;
var powerups=4;
const doubleDuration = 5000;
var count=4;
let isClicked = false;
let weight=0;
var penalty=0;
function DOUBLE(){
   isClicked=true;
   if(score>5){
   prevscore-=5;
   penalty+=5;
   document.getElementById("score").innerText = score;
   document.getElementById("penalty").innerText = penalty;
   setTimeout(function() {
    penalty-=5;
    score-=5;
    document.getElementById("penalty").innerText = penalty;
    document.getElementById("score").innerText = score;
   },2000);
}
else{
    weight+=7;
    penalty+=7;
    document.getElementById("penalty").innerText = penalty;
}
   if(max_double>0){
    if(powerups>0){
        decreaseHealth();
        powerups--;
    }
    max_double--;
   }
}
function setMines() {
    let minesLeft = minesCount;
    let o=ones;
    let t=twos;
    let f=fours;
    let s=sixes;
    while (minesLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();
        
        if (!minesLocation.includes(id) && !onesLocation.includes(id) && !twosLocation.includes(id) && !foursLocation.includes(id) && !sixesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
    while(o>0){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();
        if (!minesLocation.includes(id) && !onesLocation.includes(id) && !twosLocation.includes(id) && !foursLocation.includes(id) && !sixesLocation.includes(id)) {
            onesLocation.push(id);
            o -= 1;
        }
    }
    while(t>0){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();
        if (!minesLocation.includes(id) && !twosLocation.includes(id) && !onesLocation.includes(id) && !foursLocation.includes(id) && !sixesLocation.includes(id)) {
            twosLocation.push(id);
            t -= 1;
        }
    }
    while(f>0){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();
        if (!minesLocation.includes(id) && !foursLocation.includes(id) && !onesLocation.includes(id) && !twosLocation.includes(id) && !sixesLocation.includes(id)) {
            foursLocation.push(id);
            f -= 1;
        }
    }
    while(s>0){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();
        if (!minesLocation.includes(id) && !sixesLocation.includes(id) && !onesLocation.includes(id) && !foursLocation.includes(id) && !twosLocation.includes(id)) {
            sixesLocation.push(id);
            s -= 1;
        }


    }
}
function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("score").innerText = score;
    document.getElementById("penalty").innerText = penalty;
    document.getElementById("high-score").innerText = highscore;
    setMines();
    //populate our board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}
window.onload = function() {
    startGame(); 
}


function clickTile() {
    if (this.classList.contains("tile-clicked")) {
        return;
    }
    if(gameOver){  return;}
    let tile = this;
    if (minesLocation.includes(tile.id)) {
        gameOver = true;
        playAnimation("out.mp4");
        revealMines();
        return;
    }
    let coords = tile.id.split("-"); 
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]); 
    checkMine(r,c,factor);
    if(score>20){     
        document.getElementById("penalty").innerText = penalty;
        document.getElementById("score").innerText = score;
        setTimeout(function() {
            penalty=0;
            prevscore-=weight;
            score-=weight;weight=0;
            document.getElementById("penalty").innerText = penalty;
            document.getElementById("score").innerText = score;
           },2000);
}
    const button = document.getElementById('button1');
if (isClicked) {

  if(count>=0){
    score=prevscore+(score-prevscore)*2;
    document.getElementById("score").innerText = score;
    count--;
  }
  if(count==-1){isClicked=false;count=5;}
} 

}
function revealMines() {
    for (let r= 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "😵";
                tile.style.backgroundColor = "red";             
            }
        }
    }
}
function hideMines() {
    for (let r= 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "";               
            }
        }
    }
}
function blink() {
    if(max_blink>0){
    if(powerups>0){
        decreaseHealth();
        if(score>7){
            prevscore-=7;penalty+=7;
            document.getElementById("score").innerText = score;
            document.getElementById("penalty").innerText = penalty;
            setTimeout(function() {
                penalty-=7;
                score-=7;weight=0;
                document.getElementById("penalty").innerText = penalty;
                document.getElementById("score").innerText = score;
               },2000);
            }
        else{weight+=10;penalty+=10;
            document.getElementById("penalty").innerText = penalty;}
        powerups--;
    revealMines();
    const duration=500;
   setTimeout(function() {
    if(rows%2==0){
    for (let r= 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "";
                if(c%2==1){
                    tile.style.backgroundColor="rgb(20, 157, 43)";
                }
                else{
                    tile.style.backgroundColor="rgb(35,146,54)" ;
                }                
            }
        }
    }}
    else{
        for (let r= 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let tile = board[r][c];
                if (minesLocation.includes(tile.id)) {
                    tile.innerText = "";
                    if(c%2==1 && r%2==1){
                        tile.style.backgroundColor="rgb(35,146,54)";
                    }
                    if(c%2==0 && r%2==1){
                        tile.style.backgroundColor="rgb(20, 157, 43)" ;
                    }  
                    if(c%2==1 && r%2==0){
                        tile.style.backgroundColor="rgb(20, 157, 43)";
                    }
                    if(c%2==0 && r%2==0){
                        tile.style.backgroundColor="rgb(35,146,54)";
                    }
                
                      
                }
            }
        }
    }
},duration);
max_blink--;
}
else{
    return;
}
}
else{
    return;
}
}
function playAnimation(animationFile) {
    const animationSection = document.getElementById("animation-section");
    animationSection.innerHTML = `<video width="100%" height="100%" autoplay><source src="${animationFile}" type="video/mp4"></video>`;
  }
function checkMine(r, c , x) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }
    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 
    }
    else{
        if(onesLocation.includes(r.toString() + "-" + c.toString())){
            let r1=1;
            board[r][c].innerText = r1;
            board[r][c].classList.add("x" + r1.toString());
            prevscore=score;
            score=score+1*x;
            document.getElementById("score").innerText = score;
            playAnimation("1run.mp4");
        }
        if(twosLocation.includes(r.toString() + "-" + c.toString())){
            let r2=2;
            board[r][c].innerText = r2;
            board[r][c].classList.add("x" + r2.toString());
            prevscore=score;
            score+=2*x;
            document.getElementById("score").innerText = score;
            playAnimation("2run.mp4");
        }
        if(foursLocation.includes(r.toString() + "-" + c.toString())){
            let r4=4;
            board[r][c].innerText = r4;
            board[r][c].classList.add("x" + r4.toString());
            prevscore=score;
            score+=4*x;
            document.getElementById("score").innerText = score;
            playAnimation("4run.mp4");

        }
        if(sixesLocation.includes(r.toString() + "-" + c.toString())){
            let r6=6;
            board[r][c].innerText = r6;
            board[r][c].classList.add("x" + r6.toString());
            prevscore=score;
            score+=6*x;
            document.getElementById("score").innerText = score;
            playAnimation("6run.mp4");
        }
    }

    if (tilesClicked == rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "Cleared";
        gameOver = true;
    }

}
function resetGame() {
    const progressBar = document.getElementById('health-bar-progress');
    progressBar.style.width = '100%';
    if(score>highscore){highscore=score;}
    minesCount=11;
    score = 0;
    minesLocation = [];
    onesLocation = [];
    twosLocation = [];
    foursLocation = [];
    sixesLocation = [];
    powslocation=[];
    tilesClicked = 0;
    gameOver = false;
    max_blink=2;
    max_double=2;
    factor=1;
    powerups=4;
    count=4;
    isClicked = false;
    prevscore=0;
    weight=0;
    health=4;
    penalty=0;
    board = [];
    var boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
    ts=document.getElementById('gridsize');
    fg=parseInt(ts.value);
    var bruh=Math.floor(400/fg);
    var button=bruh-2;
    document.documentElement.style.setProperty('--size',button+'px');
    rows=fg;
    columns=fg;
    if(fg==6){
        ones=8;twos=7;fours=6;sixes= 4;
    }
    if(fg==7){
        ones=11;twos=10;fours=9;sixes= 8;
    }
    if(fg==8){
        ones=16;twos=14;fours=12;sixes= 11;
    }
    if(fg==9){
        ones=28;twos=18;fours=14;sixes=10 ;
    }
    if(fg==10){
        ones=35;twos=25;fours=17;sixes=12;
    }
    startGame();
}








 
