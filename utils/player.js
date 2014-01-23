var mpg = require('mpg123')
var nosql = require('nosql').load('./db/media.nosql');

var player = new mpg();
var current = null;
var callbacks = {
  'done': [],
  'playing': []
}

var done = function () {
  current = null;
  cakkbacks.done.forEach(function (cb) {
    cb();
  });
}

//closure
var filterById = function (id){
  return function (doc) {
    if(doc.id === id){
      return doc;
    }
  };
}

var exp = exports;

exp.play = function (id) {
  nosql.one(filterById(id),function (doc) {
    player.play('./media/' + doc.filename)
      .on('end',done);
      current = doc;
      callbacks.playing.forEach(function(cb){
        cb(doc);
      });

  });
}

exp.stop = function () {
  player.stop();
  done();
}

exp.pause = function () {
  player.pause();
}

exp.volume = function (vol) {
  player.gain(vol);
}

exp.current = function () {
	return current;
}

exp.on = function (event, callback) {
  if(callbacks[event]){
    callbacks[event].push(callback);
  }
}