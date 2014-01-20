'use strict';

/* Directives */


angular.module('XPSeed.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('menu',function(){
  	return {
	  	restrict:'E',
	  	scope:{
	  		active: '@'
	  	},
	  	templateUrl:'app/templates/menu.html',
	  	replace:true
	  }
  });
