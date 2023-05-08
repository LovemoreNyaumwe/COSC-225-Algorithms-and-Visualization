const WIDTH = 600;
const HEIGHT = 400;

const ns = 'http://www.w3.org/2000/svg';
const svg = document.querySelector('#dots');
const dots = [];

function Dot(cx, cy) {
    this.cx = cx;
    this.cy = cy;
    this.vx = 10 * Math.random() - 5;
    this.vy = 10 * Math.random() - 5;
    this.circle = document.createElementNS(ns, 'circle');
    this.circle.setAttributeNS(null, 'cx', this.cx);
    this.circle.setAttributeNS(null, 'cy', this.cy);
    this.circle.setAttributeNS(null, 'class', 'dot');
    svg.appendChild(this.circle);

    this.updateLocation = function (cx, cy) {
	this.cx = cx;
	this.cy = cy;
	this.circle.setAttributeNS(null, 'cx', this.cx);
	this.circle.setAttributeNS(null, 'cy', this.cy);
    }

    this.animate = function () {
	this.updateLocation(this.cx + this.vx, this.cy + this.vy);
	if(this.cx <= 0 || this.cx >= WIDTH) {
	    this.vx = -this.vx;
	}

	if(this.cy <= 0 || this.cy >= HEIGHT) {
	    this.vy = -this.vy;
	}
	    
	window.requestAnimationFrame(() => this.animate());
    }
}

function makeDots() {    
    for(let i = 0; i < 10; i++) {
	let x = Math.floor(600 * Math.random());
	let y = Math.floor(400 * Math.random());
	dots.push(new Dot(x, y));
    }
}

function moveDots() {
    for(let i = 0; i < 10; i++) {
	dots[i].animate();
    }
    
}

makeDots();
