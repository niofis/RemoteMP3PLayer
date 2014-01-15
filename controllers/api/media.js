'use strict';

var ctrl = require('../controller').create();
exports.controller=ctrl.controller;

ctrl.map('GET','index',function (req,res,next){
	res.json({});
},'public');

ctrl.map('POST','play',function (req,res,next){
	console.log(req)
	if(req.files && req.files.file){
		console.log(req.files.file.path);
		fs.readFile(req.files.file.path, function (err, data) {
			if(!err){
				if(data){
					
				} else {
					ctrl.serverError(res);
				}
			} else {
				ctrl.serverError(res);
			}
			fs.unlink(req.files.file.path);
		});
	}
	else {
		ctrl.serverError(res);
	}
},'public');