//var express = require('express');
//var app = express();
//var server = require('http').Server(app);
//var exphbs  = require('express-handlebars');
//var ejs = require('ejs');
//var io = require('socket.io')(server);
//app.set('port', process.env.PORT || 8099);
//app.use(express.static('public'));

//app.engine('.hbs', exphbs({extname: '.hbs'}));
//app.set('view engine', '.hbs');

// views engine setup


//app.set('view **enigne**', 'jade');


//app.listen(8000, function () {
//	console.log('hehehehe80');
//});
//
//app.get('/', function (req, res) {
//	res.render('main', { title: 'Hey', message: 'Hello there!'});
//});

//app.get('/', function (req, res) {
//	res.render('main');
//});

//io.on('connection', function (socket) {
//	socket.emit('news', { hello: 'world' });
//	socket.on('my other event', function (data) {
//		console.log(data);
//	});
//});

var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.use(express.static('public'));
//app.engine('.hbs', exphbs({
//	//layoutsDir: './views/layouts/',
//	//defaultLayout: 'main',
//	extname: '.hbs'
//}));

//app.set('views enigne', '.hbs');

app.get('/', function (req, res) {
	var now = new Date();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var dateText = month + '月' + day + '日';
	console.log(dateText);
	res.render('main', {dateText: dateText,message: 'Hello there!'});
});
app.get('/hello.txt', function(req, res){
	res.send('Hello World');
});
var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});