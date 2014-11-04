'use strict';

var TjAppControllers = angular.module('TjAppControllers', []);

TjAppControllers.controller('landingController', ['$scope', '$timeout', '$location', function($scope, $timeout, $location) {
  $scope.headerLineShow = false;
  $scope.resumeBlockShow = false;
  $scope.projectsBlockShow = false;
  $scope.socialShow1 = false;
  $scope.socialShow2 = false;
  $scope.params = $location.search();

  $scope.$on('$viewContentLoaded', function(){
    $timeout(function(){
      $scope.headerLineShow = true;
      $scope.socialShow1 = true;
    }, 500);

    $timeout(function(){
      $scope.socialShow2 = true;
    }, 600);
  });

}]);

