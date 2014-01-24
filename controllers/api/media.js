'use strict';

var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var uuid = require('node-uuid');
var nosql = require('nosql').load('./db/media.nosql');
var ctrl = require('../controller').create();
exports.controller=ctrl.controller;

ctrl.map('GET','index',function (req,res,next){
	res.json({});
},'public');

ctrl.map('POST','upload',function (req,res,next){
	var form = new multiparty.Form();
	form.on('part', function (part) {
		var writeStream = fs.createWriteStream('./media/' + part.filename);
		nosql.insert(
			{
				id: uuid.v4(),
				filename: part.filename
			});
		part.pipe(writeStream);
		part.on('end', function (){
			res.redirect('/');
		});
	});
	form.parse(req);
},'public');