var nosql = require('nosql').load('./db/media.nosql');
var player = require('./utils/player');

var exp = exports;

exp.register = function (server){
	var io = require('socket.io').listen(server, { log: false });
	io.sockets.on('connection', function (socket) {

	  socket.on('play', function (id) {
	  	player.play(id);
	  	socket.emit('playing',id);
	  });

	  socket.on('stop', function (id) {
	  	player.stop();
	  })

	  socket.on('getList', function () {
	  	nosql.all(
	  		function (doc) { return doc;},
	  		function (docs) {
	  			socket.emit('list',docs);
	  		});
	  });

	  socket.on('getInfo', function () {

	  })
	});
}