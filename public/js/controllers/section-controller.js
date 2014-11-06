'use strict';

var TjAppSectionControllers = angular.module('TjAppSectionControllers', ['ngAnimate']);

TjAppSectionControllers.controller('projectController', [
  '$scope',
  function($scope){

    $scope.projects = [
      {'title': 'Dodo', 'description': 'A simple todo app. Dodo your todos!', 'class': 'dodo'},
      {'title': 'Money Tree', 'description': 'Collect as many leaves as you can for $$$', 'class': 'money-tree'},
      {'title': 'Splitlicious', 'description': 'Split your billzz', 'class': 'splitlicious'},
      {'title': 'LucasWeather', 'description': 'Lucas knows the weather', 'class': 'lucas-weather'},
      {'title': 'Venmo', 'description': 'Venmo homepage and Venmo donations', 'class': 'venmo'},
      {'title': 'VenmoSXSW 2014', 'description': 'Venmo stuff from SXSW that I created!', 'class': 'venmosxsw2014'}
    ];
  }]);

TjAppSectionControllers.controller('resumeController', [
  '$scope',
  function($scope){
    $scope.resumeImg = "images/resume-flat.png";
    $scope.resumeImg = "images/Resume - Thomas.Chang.Min.Jeon.png";

  }]);
