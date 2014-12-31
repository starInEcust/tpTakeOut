//var socket = io('http://localhost');
//socket.on('news', function (data) {
//	console.log(data);
//	socket.emit('my other event', { my: 'data' });
//});
$(document).ready(function () {
	$('.tools-wrap').width(($(document).width() - 80) / 2 );
});
(function () {
	var theTime = new Date();
	function checkTime(i) {
		if (i < 0) {
			return "00";
		}
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
	function timer() {
		var ts = (theTime.getTime()) - (new Date().getTime());//计算剩余的毫秒数
		var hh = parseInt(ts / 1000 / 60 / 60, 10);//计算剩余的小时数
		var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
		var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数
		hh = checkTime(hh);
		mm = checkTime(mm);
		ss = checkTime(ss);
		return {
			hour: hh,
			minute: mm,
			second: ss
		}
	}
})();
