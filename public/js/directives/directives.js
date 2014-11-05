'use strict';

var TjAppDirectives = angular.module('TjAppDirectives', []);

TjAppDirectives.directive('headerBottom', function(){
  return{
    restrict: 'E',
    templateUrl: 'views/templates/header-bottom.html'
  };
});
