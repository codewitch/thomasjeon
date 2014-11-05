'use strict';

var TjAppControllers = angular.module('TjAppControllers', []);

TjAppControllers.controller('landingController', ['$scope', '$timeout', '$location', function($scope, $timeout, $location) {
  $scope.headerLineShow = false;
  $scope.resumeBlockEnter = '';
  $scope.projectsBlockEnter = '';
  $scope.socialShow1 = false;
  $scope.socialShow2 = false;

  $scope.mainShow = true;
  $scope.resumeShow = true;
  $scope.projectsShow = true;
  $scope.aboutShow = true;

  $scope.params = $location.search();

  $scope.resumeImg = "images/resume-flat.png";

  $scope.$on('$viewContentLoaded', function(){
    $timeout(function(){
      $scope.headerLineShow = true;
      $scope.socialShow1 = true;
    }, 300);

    $timeout(function(){
      $scope.socialShow2 = true;
    }, 400);
  });

  $scope.showBlock = function(section){
    switch(section){
      case "resume":
        $scope.mainShow = false;
        $scope.resumeBlockDisplay = 'block-zoom';
        $scope.projectsShow = false;
        $scope.aboutShow = false;
        $scope.resumeImg = "images/Resume - Thomas.Chang.Min.Jeon.png";
        break;
      case "projects":
        $scope.mainShow = false;
        $scope.resumeShow = false;
        $scope.projectsBlockDisplay = 'block-zoom';
        $scope.aboutShow = false;
        $scope.resumeImg = "images/Resume - Thomas.Chang.Min.Jeon.png";
        break;
      case "about":
        $scope.mainShow = false;
        $scope.resumeShow = false;
        $scope.projectsShow = false;
        $scope.aboutBlockDisplay = 'block-zoom';
        $scope.resumeImg = "images/Resume - Thomas.Chang.Min.Jeon.png";
        break;
    }
  };

  $scope.hideBlock = function(section){
    switch(section){
      case "resume":
        $scope.mainShow = true;
        $scope.resumeBlockDisplay = '';
        $scope.projectsShow = true;
        $scope.aboutShow = true;
        $scope.resumeImg = "images/resume-flat.png";
        break;
      case "projects":
        $scope.mainShow = true;
        $scope.resumeShow = true;
        $scope.projectsBlockDisplay = '';
        $scope.aboutShow = true;
        $scope.resumeImg = "images/resume-flat.png";
        break;
      case "about":
        $scope.mainShow = true;
        $scope.resumeShow = true;
        $scope.projectsShow = true;
        $scope.aboutBlockDisplay = '';
        $scope.resumeImg = "images/resume-flat.png";
        break;
    }
  };
}]);

