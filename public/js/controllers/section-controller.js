'use strict';

var TjAppSectionControllers = angular.module('TjAppSectionControllers', ['ngAnimate']);

TjAppSectionControllers.controller('projectController', [
  '$scope',
  function($scope){

    $scope.projects = [
      {'title': 'Dodo', 'description': 'A simple todo app. Dodo your todos!',
        'class': 'dodo', 'external': true, 'link': 'http://dodotodo.herokuapp.com', 
        'imgFile': 'dodo.png'},
      {'title': 'Money Tree', 'description': 'Collect as many leaves as you can for $$$',
        'class': 'money-tree', 'external': false, 'link': '',
        'imgFile': 'moneytree-leaf.png'},
      {'title': 'Splitlicious', 'description': 'Split your billzz',
        'class': 'splitlicious', 'external': false, 'link': '',
        'imgFile': 'splitlicious.png'},
      {'title': 'LucasWeather', 'description': 'Lucas knows the weather',
        'class': 'lucas-weather', 'external': false, 'link': '',
        'imgFile': 'lucas.gif'},
      {'title': 'Venmo', 'description': 'Venmo homepage and Venmo donations',
        'class': 'venmo', 'external': false, 'link': '',
        'imgFile': 'venmo.png'},
      {'title': 'VenmoSXSW 2014', 'description': 'Venmo stuff from SXSW that I created!',
        'class': 'venmosxsw2014', 'external': false, 'link': '',
        'imgFile': 'bull.png'}
    ];
  }]);

TjAppSectionControllers.controller('resumeController', [
  '$scope',
  function($scope){
    $scope.resumeImg = "resume-flat.png";
    $scope.resumeImg = "Resume - Thomas.Chang.Min.Jeon.png";

  }]);
