'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource']).
  value('version', '0.1').factory('createPlanetSrv',function ($resource) {
  	return $resource('http://localhost:8080/createPlanet',{ max_x : '@max_x', max_y : '@max_y' });
  });
