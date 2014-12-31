(function () {
	function DrawNum() {
		this.WINDOW_WIDTH
	}
	var WINDOW_WIDTH = 1024;
	var WINDOW_HEIGHT = 768;
	var RADIUS = 8;
	var MARGIN_TOP = 60;
	var MARGIN_LEFT = 30;
	var numOld = 0;
	window.numNow = 0;
	var balls = [];
	const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];

	window.onload = function () {

		WINDOW_WIDTH = $('.show-content').width();
		WINDOW_HEIGHT = 200;

		MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
		RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;

		MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);

		var canvas = document.getElementById('sum');
		var context = canvas.getContext("2d");

		canvas.width = WINDOW_WIDTH;
		canvas.height = WINDOW_HEIGHT;
		setInterval(
			function () {
				render(context);
				update();
			}
			,
			50
		);
	};

	function update() {
		if (numOld != window.numNow){
			addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, numOld);
			numOld = window.numNow;
		}
		updateBalls();

		console.log(balls.length)
	}

	function updateBalls() {

		for (var i = 0; i < balls.length; i++) {

			balls[i].x += balls[i].vx;
			balls[i].y += balls[i].vy;
			balls[i].vy += balls[i].g;

			if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
				balls[i].y = WINDOW_HEIGHT - RADIUS;
				balls[i].vy = -balls[i].vy * 0.75;
			}
		}

		var cnt = 0;
		for (var i = 0; i < balls.length; i++)
			if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH)
				balls[cnt++] = balls[i]

		while (balls.length > cnt) {
			balls.pop();
		}
	}

	function addBalls(x, y, num) {

		for (var i = 0; i < digit[num].length; i++)
			for (var j = 0; j < digit[num][i].length; j++)
				if (digit[num][i][j] == 1) {
					var aBall = {
						x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
						y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
						g: 1.5 + Math.random(),
						vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
						vy: -5,
						color: colors[Math.floor(Math.random() * colors.length)]
					};
					balls.push(aBall)
				}
	}

	function render(cxt) {

		cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);


		renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, window.numNow, cxt);

		for (var i = 0; i < balls.length; i++) {
			cxt.fillStyle = balls[i].color;

			cxt.beginPath();
			cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
			cxt.closePath();

			cxt.fill();
		}
	}

	function renderDigit(x, y, num, cxt) {

		cxt.fillStyle = "rgb(0,102,153)";

		for (var i = 0; i < digit[num].length; i++)
			for (var j = 0; j < digit[num][i].length; j++)
				if (digit[num][i][j] == 1) {
					cxt.beginPath();
					cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
					cxt.closePath();
					cxt.fill();
				}
	}

})();
