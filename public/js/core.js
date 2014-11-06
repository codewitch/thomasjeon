'user strict';

var TjApp = angular.module('TjApp', [
  'TjAppControllers',
  'TjAppAnimations',
  'TjAppDirectives',
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

