'use strict';

var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var nosql = require('nosql').load('./db/media.nosql');
var ctrl = require('../controller').create();
exports.controller=ctrl.controller;

ctrl.map('GET','index',function (req,res,next){
	res.json({});
},'public');

ctrl.map('POST','play',function (req,res,next){
	/*
	if(req.files && req.files.media){
		fs.readFile(req.files.media.path, function (err, data) {
			if(!err){
				if(data){
					nosql.insert({cosa:1});
					res.redirect('/');
				} else {
					ctrl.serverError(res);
				}
			} else {
				ctrl.serverError(res);
			}
			fs.unlink(req.files.media.path);
		});
	}
	else {
		ctrl.serverError(res);
	}
	*/
	var form = new multiparty.Form();

	form.on('part', function(part){
		fs.writeFileSync('./db/testfile',part);
	})

    form.parse(req, function(err, fields, files) {
    	if(files && files.media){

    	}
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });

},'public');