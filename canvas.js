var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

var colorArray = [
	'#2C3E50',
	'#E74C3C',
	'#ECF0F1',
	'#3498DB',
	'#298089'
];

var mouse = {
	x: undefined,
	y: undefined,
}

var maxLimit = 45;

function getDistance(x1,y1,x2,y2){
	// console.log("Distance Called");
	return Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2));
}

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});

window.addEventListener('mousemove', function(event){
	mouse.x = event.clientX;
	mouse.y = event.clientY;
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

		// console.log(mouse.x);


		//Interraction
		//Old Code
		//  if(this.x - mouse.x < 50 && this.x - mouse.x > -50 && this.y - mouse.y < 50 && this.y - mouse.y > -50)

		//Refactored Code
		// 
		var dist = getDistance(mouse.x, mouse.y, this.x, this.y);
		// console.log(dist);

		if(dist < 70){
			if(this.radius < maxLimit){
				this.radius+=5;
			}
		}else if(this.radius > this.minRadius){
			this.radius-=2;
		}

		}
}
// console.log(mouse.x);
var circleArray = [];

function init(){
	circleArray = [];

	for(var i = 0; i< 300; i++){
		var rad = Math.random() * 10 + 5;
		var x = Math.random() * (innerWidth - rad * 2) + rad;
		var y = Math.random() * (innerHeight - rad * 2) + rad;

		var dx = (Math.random() - 0.5) * 2;
		var dy = (Math.random() - 0.5) * 2;

		circleArray.push(new Circle(x, y,rad, dx, dy));
	}
}

init();

// console.log(circleArray);
// console.log('hey 	');


function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,innerWidth, innerHeight);
	
	for(var i =0 ; i<circleArray.length; i++){
		circleArray[i].draw();
	}
}

animate();
