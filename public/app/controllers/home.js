'use strict';

angular.module('XPSeed.controllers', ['ngResource']).
controller('HomeCtrl',['$scope','$resource',function($scope,$resource) {
	$scope.media = [];

	var socket = io.connect('http://localhost');
	socket.on('connect', function (data) {
	  socket.emit('getList',null);
	});

	socket.on('list', function (data) {
		$scope.$apply(function () {
			$scope.media = data;
		})
	});

	$scope.play = function (id) {
		socket.emit('play',id);
	}

}]);
