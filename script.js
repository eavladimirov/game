
var canvas = document.getElementById("mainCanvas"); //kartinata
var context = canvas.getContext("2d");              //chetkata


//key pressing
var keys = [];

var width = 400, height = 400, speed = 3;

var score = 0;

window.addEventListener("keydown", function(e){ keys[e.keyCode] = true;}, false);

window.addEventListener("keyup", function(e){ delete keys[e.keyCode];}, false);

/*37 - left, 39 - right, 38 - up, 40 - down */

var player = {
	x: 30,
	y: 30,
	width: 20,
	height: 20

};

var cube = {
	x: Math.random() * (width - 20),
	y: Math.random() * (height - 20),
	width: 20,
	height: 20

};

function game(){
	update();
	render();
	
}

function update(){
	if(keys[37]){
		player.x-=speed;
	}
	if(keys[38]){
		player.y-=speed;
	}
	if(keys[39]){
		player.x+=speed;
	}
	if(keys[40]){
		player.y+=speed;
	}
	
	if(player.x < 0){
		player.x = 0;
	}
	if(player.y < 0){
		player.y = 0;
	}
	if(player.x > width - player.width){
		player.x = width - player.width;
	}
	if(player.y > height - player.height){
		player.y = height - player.height;
	}
	
	if(collision(player, cube)) processCollision();
}

function render(){
	context.clearRect(0, 0, width, height);
	
	context.fillStyle = "blue";
	context.fillRect(player.x, player.y, player.width, player.height);
	
	context.fillStyle = "red";
	context.fillRect(cube.x, cube.y, cube.width, cube.height);
	
	context.fillStyle = "black";
	context.font = "20px Arial";
	context.fillText(score, 20, 20);
}

function processCollision(){
	score++;
	cube.x = Math.random() * (width - 20);
	cube.y = Math.random() * (height - 20);
}

function collision(first, second){
	return !(first.x > second.x + second.width || 
		first.x + first.width < second.x ||
		first.y > second.y + second.height ||
		first.y + first.height < second.y);
}

setInterval(function(){
	game();
}, 1000/25);