function DrawNum() {
	this.numOld = 0;
	this.numNow = 0;
	this.balls = [];
	this.colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];
	this.fillStyleColor = "rgb(255,255,255)";
}
DrawNum.prototype.initAnimate = function (canvasId, w, h) {
	this.WINDOW_WIDTH = w;
	this.WINDOW_HEIGHT = h;
	this.RADIUS = Math.round(this.WINDOW_WIDTH * 4 / 5 / 54) - 1;
	this.MARGIN_TOP = Math.round(this.WINDOW_HEIGHT / 5);
	this.terval = 18 * (this.RADIUS + 1);
	var canvas = document.getElementById(canvasId);
	var context = canvas.getContext("2d");
	canvas.width = this.WINDOW_WIDTH;
	canvas.height = this.WINDOW_HEIGHT;
	var self = this;
	setInterval(function () {
		self.render(context);
		self.update();
	}, 50);
};
DrawNum.prototype.renderDigit = function (x, y, num, cxt) {
	cxt.fillStyle = this.fillStyleColor;
	for (var i = 0; i < digit[num].length; i++)
		for (var j = 0; j < digit[num][i].length; j++)
			if (digit[num][i][j] == 1) {
				cxt.beginPath();
				cxt.arc(x + j * 2 * (this.RADIUS + 1) + (this.RADIUS + 1), y + i * 2 * (this.RADIUS + 1) + (this.RADIUS + 1), this.RADIUS, 0, 2 * Math.PI);
				cxt.closePath();
				cxt.fill();
			}
};
DrawNum.prototype.render = function (cxt) {
	cxt.clearRect(0, 0, this.WINDOW_WIDTH, this.WINDOW_HEIGHT);
	var numArray = this.numCovert(this.numNow);
	this.startPointX = Math.round(this.WINDOW_WIDTH / 2) - this.terval * numArray.length / 2;

	for (var k = 0; k < numArray.length; k++) {
		this.renderDigit(this.startPointX + this.terval * k, this.MARGIN_TOP, numArray[k], cxt);
	}

	for (var i = 0; i < this.balls.length; i++) {
		cxt.fillStyle = this.balls[i].color;

		cxt.beginPath();
		cxt.arc(this.balls[i].x, this.balls[i].y, this.RADIUS, 0, 2 * Math.PI, true);
		cxt.closePath();

		cxt.fill();
	}
};
DrawNum.prototype.update = function () {
	if (this.numOld != this.numNow) {
		var numArrayOld = this.numCovert(this.numOld);
		var numArrayNum = this.numCovert(this.numNow);
		for (var k = 0; k < numArrayOld.length; k++) {
			if(numArrayNum[k] != numArrayOld[k]){
				this.addBalls(this.startPointX + this.terval * k, this.MARGIN_TOP, numArrayOld[k]);
			}
		}
		this.numOld = this.numNow;
	}
	this.updateBalls();
};
DrawNum.prototype.numCovert = function (toCovertNum) {
	var numArray = [];
	var num = toCovertNum;
	for (; String(num).length > 1; num = parseInt(num / 10)) {
		//console.log(num, num % 10);
		numArray.push(num % 10);
	}
	if (String(num).length = 1) {
		numArray.push(num % 10);
	}
	return numArray.reverse();
};
DrawNum.prototype.addBalls = function (x, y, num) {

	for (var i = 0; i < digit[num].length; i++)
		for (var j = 0; j < digit[num][i].length; j++)
			if (digit[num][i][j] == 1) {
				var aBall = {
					x: x + j * 2 * (this.RADIUS + 1) + (this.RADIUS + 1),
					y: y + i * 2 * (this.RADIUS + 1) + (this.RADIUS + 1),
					g: 1.5 + Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
					vy: -5,
					color: this.colors[Math.floor(Math.random() * this.colors.length)]
				};
				this.balls.push(aBall)
			}
};

DrawNum.prototype.updateBalls = function () {
	for (var i = 0; i < this.balls.length; i++) {
		this.balls[i].x += this.balls[i].vx;
		this.balls[i].y += this.balls[i].vy;
		this.balls[i].vy += this.balls[i].g;

		if (this.balls[i].y >= this.WINDOW_HEIGHT - this.RADIUS) {
			this.balls[i].y = this.WINDOW_HEIGHT - this.RADIUS;
			this.balls[i].vy = -this.balls[i].vy * 0.75;
		}
	}

	var cnt = 0;
	for (var i = 0; i < this.balls.length; i++)
		if (this.balls[i].x + this.RADIUS > 0 && this.balls[i].x - this.RADIUS < this.WINDOW_WIDTH)
			this.balls[cnt++] = this.balls[i];

	while (this.balls.length > cnt) {
		this.balls.pop();
	}
};

DrawNum.prototype.set = function (key, value) {
	this[key] = value;
};

