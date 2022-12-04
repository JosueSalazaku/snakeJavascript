const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d'); 


class SnakePart {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 10;

let tileCount =  20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [2];
let tailLenght = 2;

let appleX = 5;
let appleY = 5;

let xVelocity=0;
let yVeloctiy=0;

let score = 0;

//game loop
const drawGame = () => {
    changeSnakePosition()
    let result = isGameOver();
    if(result){
        return;
    }    
    clearScreen();
    
    checkAppleCollision()
    drawApple();
    drawSnake();
    
    drawScore();

    setTimeout(drawGame, 1000/ speed);

}


function isGameOver(){
    let gameOver = false;

    //walls
    if(headX < 0 ){
        gameOver = true;

    }
    
    if(gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        var gradient = ctx.createLinearGreadient(0, 0, canvas.width, 0);
        gradient.addColorstop("0", " magenta");
        gradient.addColorstop("0.5", "blue");
        gradient.addColorstop("1.0", "red");

        ctx.fillStyle = gradient;
        
        ctx.fillStyle("Game Over!!", canvas.width / 6.5, canvas.height / 2);
    }
    return gameOver;

}



function isGameOver(){
    let gameOver = false;

    //walls
    if(headX < 0){
        gameOver = true;
    }


    
    return gameOver;
}


const clearScreen = () =>{
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}


function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px arial";
    ctx.fillText("Score" + score, canvas.width - 50, 10);
}


function drawSnake(){
    
    ctx.fillStyle = 'yellow';
    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }


    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLenght){
        snakeParts.shift();
    }

    ctx.fillStyle =  'orange'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize) 

}



function changeSnakePosition() {
        headX = headX + xVelocity;
        headY = headY + yVeloctiy;
    }


function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize) 
 
    
}


function checkAppleCollision() {
    if(appleX === headX && appleY === headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLenght++;
        score ++; 
    }
}


document.body.addEventListener('keydown', keyDown);

function keyDown(event){
//up
    if(event.keyCode == 38){
        if(yVeloctiy == 1)
            return;
        yVeloctiy = -1;
        xVelocity = 0;
    }
//down arrow
    if(event.keyCode == 40){
        if(yVeloctiy == -1)
            return;
        yVeloctiy = 1;
        xVelocity = 0;
    }
//left
    if(event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVeloctiy = 0;
        xVelocity = -1;
    }
//right
    if(event.keyCode == 39){
        if(xVelocity == -1)
            return;
        yVeloctiy = 0;
        xVelocity = 1;
    }
}



drawGame();


