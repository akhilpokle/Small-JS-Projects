const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 32;

const ground = new Image();
ground.src = "images/ground.png";

const foodImage = new Image();
foodImage.src = "images/food.png";

let snake = [];
snake[0] = {
	x : 9*box,
	y: 10*box
}

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const down = new Audio();
const left = new Audio();
const right = new Audio();

dead.src = "audio/dead.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
eat.src = "audio/eat.mp3";

let food ={
	x:Math.floor(Math.random()*17+1)*box,
	y:Math.floor(Math.random()*15+3)*box
}

let score = 0;
let d;
document.addEventListener("keydown",direction);
function direction(e){
	if(e.keyCode == 37){
		d="LEFT";
		left.play();
	}else if(e.keyCode == 38){
		d="UP";
		up.play();
	}else if(e.keyCode == 39){
		d="RIGHT";
		right.play();
	}else if(e.keyCode == 40){
		d="DOWN";
		down.play();
	}
}

function collision(head,array){
	for(let i=0;i<array.length;i++){
		if(head.x == array[i].x && head.y == array[i].y){
			return true;
		}
	}
	return false;
}

function draw(){
	ctx.drawImage(ground,0,0);

	for(let i=0;i<snake.length;i++){
		ctx.fillStyle = (i == 0)?"green":"white";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);
		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x,snake[i].y,box,box);
	}
	ctx.drawImage(foodImage,food.x,food.y);
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;


	if( d=="LEFT" && d!= "RIGHT") snakeX -= box;
	if( d=="UP"  && d!= "DOWN") snakeY -= box;
	if( d=="RIGHT"  && d!= "LEFT") snakeX += box;
	if( d=="DOWN"  && d!= "UP") snakeY += box;

	if(snakeX == food.x && snakeY == food.y){
		score++;
		eat.play();
		food = {
			x:Math.floor(Math.random()*17+1)*box,
			y:Math.floor(Math.random()*15+3)*box
		}
	}else{
		snake.pop();
	}

	let newHead = {
		x: snakeX,
		y:snakeY
	}


	if(snakeX<box || snakeY>17*box || snakeY<3*box ||snakeY>17*box || collision(newHead,snake)){
		clearInterval(game);
		dead.play();
	}
	snake.unshift(newHead);

	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(score,2*box,1.6*box);
}

let game = setInterval(draw,100);