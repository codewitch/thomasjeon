'user strict';

var TjApp = angular.module('TjApp', [
  'TjAppAnimations',
  'TjAppControllers',
  'ngRoute'
]);

TjApp.config(['$routeProvider',
  function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'views/templates/landing.html',
          controller: 'landingController'
        }).
        otherwise({
          redirectTo: '/'
        });
  }
]);

