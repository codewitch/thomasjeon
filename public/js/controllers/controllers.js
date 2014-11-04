'use strict';

var TjAppControllers = angular.module('TjAppControllers', ['ngAnimate']);

TjAppControllers.controller('landingController', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.headerLineShow = false;
  $scope.resumeBlockShow = false;
  $scope.projectsBlockShow = false;

  $scope.$on('$viewContentLoaded', function(){
    $timeout(function(){
      $scope.headerLineShow = true;
    }, 500);

    $timeout(function(){
      $scope.resumeBlockShow = true;
      $scope.projectsBlockShow = true;
    }, 800);
  });
}]);

