'use strict';


angular.module('XPSeed', [
  'ngRoute',
  'XPSeed.filters',
  'XPSeed.services',
  'XPSeed.directives',
  'XPSeed.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'app/partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/about', {templateUrl: 'app/partials/about.html', controller: 'AboutCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);