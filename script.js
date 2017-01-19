var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");

var w = window.innerWidth;
var h = window.innerHeight;
canvas.width = 1300;
canvas.height = 600;
var gameSpeed = 100;
var circles = [];
var cel = 25;
var color = "rgba(0,0,0,.4)"

var cels = canvas.width / cel;
var rows = canvas.height / cel;

var setColor = function(){
	color = randomColor();
}
var rand  = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var Snake = function(){
	this.x = rand(0,cels);
	this.y = rand(0,rows);
	this.cel = cel;
	this.speedx = 1;
	this.speedy = 0;
	this.len = 0;
	this.body = [];
	this.show = function(){
		if(this.len < 1){
			ctx.beginPath();
			ctx.fillStyle = "#234";
			ctx.fillRect(this.cel*this.x, this.cel*this.y, this.cel, this.cel);
			ctx.fill();
		}else{
			for(i=0;i<this.len;i++){
				ctx.beginPath();
				ctx.fillStyle = ("#456");
				ctx.fillRect(this.cel*this.x, this.cel*this.y, this.cel, this.cel);
				ctx.fill();

				ctx.beginPath();
				ctx.fillStyle = /*(i % 2 == 0) ? "#ccc" : "#c4c4c4";*/ "rgba(41, 199, 107,"+Math.max(0.3,(1 - i*0.04))+")"; /*color;*/
				ctx.fillRect(this.cel*this.body[i].x, this.cel*this.body[i].y, this.cel, this.cel);
				ctx.fill();
			}
		}

	}
	this.addBodyElement = function(){
		this.len++;
		this.body.push({
			x: undefined,
			y: undefined
		})
	}
	this.update = function(){
		if(this.len > 0){
			for(i=this.len-1; i>=1; i--){
				this.body[i].x = this.body[i-1].x;
				this.body[i].y = this.body[i-1].y;
			}
			this.body[0].x = this.x;
			this.body[0].y = this.y;
		}

		this.x += this.speedx;
		this.y += this.speedy;
		for(i=0;i<this.len;i++){
			if(this.body[i].x == food.x && this.body[i].y == food.y){
				this.len++;
				this.body.push({
					x: undefined,
					y: undefined,
				})
				food.update();
				this.show();
			}
		}
		if(this.x == food.x && this.y == food.y){
			this.len++;
			snake.body.push({
				x: undefined,
				y: undefined
			})
			food.update();
			this.show();
		}
		for(i=0;i<this.len;i++){
			if(this.x == this.body[i].x && this.y == this.body[i].y ){
				alert("game over");
				this.body = [];
				this.len = 0;
			}
		}


		if(this.x >= cels){this.x = 0}
		if(this.x < 0){this.x = cels;this.speedx = -1}

		if(this.y >= rows){this.y = 0}
		if(this.y < 0){this.y = rows;this.speedy = -1}
		}
	this.speedUpdate = function(x, y){
		this.speedx = x;
		this.speedy = y;
	}
}
var Food = function(){
	this.x = rand(0,cels);
	this.y = rand(0,rows);
	this.cel = cel;
	this.update = function(){
		this.x = rand(0,cels);
		this.y = rand(0,rows);
	}
	this.show = function(){
		ctx.beginPath();
		ctx.fillStyle = randomColor();
		ctx.fillRect(this.cel*this.x, this.cel*this.y, this.cel, this.cel);
		ctx.fill();
	}
}
var food = new Food();
var snake = new Snake();
function create_table(){
	for(i=0;i<=cels;i++){
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.strokeStyle = "rgba(0,0,0,.1)";
		ctx.moveTo(i*cel,0);
		ctx.lineTo(i*cel,canvas.height);
		ctx.stroke();

	}
	for(i=0;i<=rows;i++){
		ctx.beginPath();
		ctx.moveTo(0,i*cel);
		ctx.strokeStyle = "rgba(0,0,0,.1)";
		ctx.lineTo(canvas.width,i*cel);
		ctx.stroke();

	}
}
function create_table_block(){
		ctx.beginPath();
		ctx.fillStyle = "#111";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		
		for(i=0;i<=cels;i++){
			for(j=0;j<cels;j++){
				if(i % 2 == 0){
					ctx.beginPath();
					ctx.fillStyle = "#333";
					ctx.fillRect(i*cel,j*cel, cel, cel);
				}
				if(j % 2 != 0){
					ctx.beginPath();
					ctx.fillStyle = "#333";
					ctx.fillRect(i*cel, j*cel, cel, cel);
				}

			}

		}
}
function randomCel() {
	rc = rand(0,cels);
	rr = rand(0,rows);

	ctx.beginPath();
	ctx.fillStyle = randomColor();
	ctx.fillRect(cel*rc, cel*rr, cel, cel);
	ctx.fill();
}
function show_scope(){
	ctx.beginPath();
	ctx.fillStyle = "rgba(0,0,0,.7)";
	ctx.font = "48px tahoma";
	ctx.fillText("Очки: " + snake.len, canvas.width - 250,canvas.height - 50);
}
function update(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	create_table();
	snake.show();
	food.show();
	snake.update();
	show_scope();
}
var game = setInterval(update, gameSpeed);
function randomColor(){
	return "rgb("+rand(0,255)+","+rand(0,255)+","+rand(0,255)+")";
}
// Events
window.addEventListener('keydown',function(e){
	keydown = false;
	if(e.keyCode == 87){ // UP
		if(snake.len > 0){
			if(snake.body[0].y == snake.y - 1){
				return;
			}
		}
		snake.speedUpdate(0,-1);
	}else if(e.keyCode == 83){ // down
		if(snake.len>0){
			if(snake.body[0].y == snake.y + 1){
				return;
			}
		}
		snake.speedUpdate(0,1);
	}else if(e.keyCode == 68){ // Left
		if(snake.len>0){
			if(snake.body[0].x == snake.x + 1){
				return;
			}
		}
		snake.speedUpdate(1,0);
	}else if(e.keyCode == 65){ // right
		if(snake.len>0){
			if(snake.body[0].x == snake.x - 1){
				return;
			}
		}
		snake.speedUpdate(-1,0);
	}
	else if(e.keyCode == 16){
		gameSpeed -= 10;
		clearInterval(game);
		game = setInterval(update,gameSpeed);
	}
	else if(e.keyCode == 17){
		gameSpeed += 10;
		clearInterval(game);
		game = setInterval(update,gameSpeed);
	}
	else if(e.keyCode == 32){
		setColor();
	}
});
window.addEventListener('click',function(){
	snake.addBodyElement();
});

