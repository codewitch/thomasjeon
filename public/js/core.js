'user strict';

var TjApp = angular.module('TjApp', [
  'TjAppControllers',
  'TjAppSectionControllers',
  'TjAppAnimations',
  'TjAppDirectives',
  'ngRoute'
]);

TjApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'views/templates/landing.html',
          controller: 'landingController',
          reloadOnSearch: false
        }).
        otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);
  }
]);

