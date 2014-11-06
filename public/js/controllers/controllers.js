'use strict';

var TjAppControllers = angular.module('TjAppControllers', ['ngAnimate']);

TjAppControllers.controller('landingController', [
  '$scope', '$timeout', '$location', '$animate',
  function($scope, $timeout, $location, $animate) {
    $scope.headerLineShow = false;
    $scope.resumeBlockEnter = '';
    $scope.projectsBlockEnter = '';
    $scope.socialShow1 = false;
    $scope.socialShow2 = false;

    $scope.mainShow = true;
    $scope.resumeShow = true;
    $scope.projectsShow = true;
    $scope.aboutShow = true;

    $scope.resumeImg = "images/resume-flat.png";

    $scope.params = $location.search();

    $scope.$on('$viewContentLoaded', function(){
      $timeout(function(){
        $scope.headerLineShow = true;
        $scope.socialShow1 = true;
      }, 300);

      $timeout(function(){
        $scope.socialShow2 = true;
      }, 400);
    });

    $scope.zoomStack = new Array();

    $scope.showBlock = function(section){
      var zoomElement = $('.' + section + '-placeholder');
      var upElements = zoomElement.prevAll();
      var downElements = zoomElement.nextAll();

      upElements.each(function(){
        $scope.hideBlockUp($(this));
      });

      $scope.zoomBlockIn(zoomElement.children());

      downElements.each(function(){
        $scope.hideBlockDown($(this));
      });

      //change contents
      $scope.resumeImg = "images/Resume - Thomas.Chang.Min.Jeon.png";
    };

    $scope.hideBlock = function(section){
      var zoomElement = $('.' + section + '-placeholder');
      var upElements = zoomElement.prevAll();
      var downElements = zoomElement.nextAll();

      upElements.each(function(){
        $scope.showBlockDown($(this));
      });

      $scope.zoomBlockOut(zoomElement.children());

      downElements.each(function(){
        $scope.showBlockUp($(this));
      });

      //change contents
      $scope.resumeImg = "images/resume-flat.png";
    };

/****Block Animation Helpers****/
    $scope.hideBlockUp = function(element){
      $animate.addClass(element, 'hide-up', {
        from:{
          position: 'relative',
          top: 0
        },
        to: {
          top: -1*hideUpLength(element) + 'px'
        }
      }).then(function(){
        element.css('display', 'none');
      });
    };

    $scope.hideBlockDown = function(element){
      $animate.addClass(element, 'hide-down', {
        from:{
          position: 'relative',
          top: 0
        },
        to: {
          top: hideDownLength(element) + 'px'
        }
      }).then(function(){
        element.css('display', 'none');
      });
    };

    $scope.showBlockDown = function(element){
      $animate.removeClass(element, 'hide-up', {
        from:{
          display: 'block',
        },
        to:{
          top: 0
        }
      }).then(function(){
        element.css({
          position: '',
          top: '',
          display: ''
        });
      });
    };

    $scope.showBlockUp = function(element){
      $animate.removeClass(element, 'hide-down', {
        from:{
          display: 'block',
        },
        to:{
          top: 0
        }
      }).then(function(){
        element.css({
          position: '',
          top: '',
          display: ''
        });
      });
    };

    $scope.zoomBlockIn = function(element){
      $scope.zoomStack.push({top: element.offset().top});
      $animate.addClass(element, 'zoom-in', {
        from:{
          top: element.offset().top + 'px',
          left: element.offset().left + 'px',
          zIndex: 2
        },
        to: {
          top: $(document).scrollTop() + 'px',
          left: 0 + 'px',
          width: '100%',
          height: '100%'
        }
      }).then(function(){
        $(document).scrollTop(0);
        element.css({
          zIndex: '',
          top: '0px',
          overflow: 'visible'
        });
      });
    }

    $scope.zoomBlockOut = function(element){
      $animate.removeClass(element, 'zoom-in', {
        from: {
          top: '0px',
          left: '0px'
        },
        to: {
          width: element.parent().width() + 'px',
          height: element.parent().height() + 'px',
          overflow: 'hidden',
          top: $scope.zoomStack.pop().top + 'px',
          left: ($(window).width()-element.parent().width())/2 + 'px'
        }
      }).then(function(){
        element.css({
          width: '',
          height: '',
          left: '',
          top: ''
        });
      });
    }

    var hideUpLength = function(element){
      return element.offset().top - $(document).scrollTop() + element.outerHeight(true);
    };

    var hideDownLength = function(element){
      return $(window).height() - element.offset().top + $(document).scrollTop();
    };
}]);

