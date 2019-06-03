var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

var ctx = canvas.getContext('2d');

var colorArray = [
	'#E9E925',
	'#FF0000',
	'#6FF400',
	'#450CFF',
	'#FF00A6',
];

var mouse = {
	x: undefined,
	y: undefined,
}

var maxLimit = 45;


window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});

window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	// console.log(mouse);
})

// Creating Object Constructor


function Circle(x, y, radius, dx, dy){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	this.minRadius = radius;

	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		// ctx.stroke();
		// ctx.strokeStyle = 'blue';
		this.update();
	}

	this.update = function(){

		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
			this.dy = -this.dy;
		}

		this.x+=this.dx;
		this.y+=this.dy; 

		//Interraction
		if(mouse.x - this.x < 50 && mouse.x - this.x > -50
			&& mouse.y - this.y < 50 && mouse.y - this.y > -50){
			
			if(this.radius < maxLimit){
				this.radius += 1;
			}

		} else if(this.radius > this.minRadius){
			this.radius -= 1;
		}

		}
}

var circleArray = [];

function init(){
	circleArray = [];

	for(var i = 0; i< 500; i++){
		var rad = Math.random() * 10 + 1;
		var x = Math.random() * (innerWidth - rad * 2) + rad;
		var y = Math.random() * (innerHeight - rad * 2) + rad;

		var dx = Math.random() * 2;
		var dy = Math.random() * 2;

		circleArray.push(new Circle(x, y,rad, dx, dy));
	}
}

init();


function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,innerWidth, innerHeight);

	for(var i =0 ; i<circleArray.length; i++){
		circleArray[i].draw();
	}
}

animate();
