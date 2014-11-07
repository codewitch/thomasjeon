'use strict';

var TjAppControllers = angular.module('TjAppControllers', ['ngAnimate']);

TjAppControllers.controller('landingController', [
  '$scope', '$timeout', '$location', '$animate',
  function($scope, $timeout, $location, $animate) {
    $scope.headerLineShow = false;
    $scope.socialShow1 = false;
    $scope.socialShow2 = false;
    $scope.params = $location.search();
    $scope.imageDir = "images/";

    $scope.mainSections = [
      {'title': 'About Me', 'description': 'Wanna know more about me?', 'class': 'about'},
      {'title': 'Projects', 'description': 'Here\'s some stuff I\'ve done!', 'class': 'projects'},
      {'title': 'Resume', 'description': 'See what I\'ve been up to!', 'class': 'resume'},
    ];

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

    $scope.windowOpen = function(link, section){
      //if block isnt on current screen, dont open link
      var linkElement = $('.' + section + '-placeholder');
      if( !$scope.zoomable(linkElement) )
        return;
      window.open(link);
    };

    //enlarges selected block, and moves away the rest
    $scope.showBlock = function(section){
      var zoomElement = $('.' + section + '-placeholder');
      var upElements = zoomElement.prevAll();
      var downElements = zoomElement.nextAll();

      //if already zoomed in, dont do anything
      if( $scope.zoomContains(zoomElement.children()) ){
        return;
      }

      //if block isnt on current screen, dont zoom
      if( !$scope.zoomable(zoomElement) )
        return;

      upElements.each(function(){
        $scope.hideBlockUp($(this));
      });

      $scope.zoomBlockIn(zoomElement.children());

      downElements.each(function(){
        $scope.hideBlockDown($(this));
      });

    };

    //shrinks the selected block and brings back the other content
    $scope.hideBlock = function(section){
      var zoomElement = $('.' + section + '-placeholder');
      var upElements = zoomElement.prevAll();
      var downElements = zoomElement.nextAll();

      if(!$scope.zoomContainsTop(zoomElement.children())){
        return;
      }

      upElements.each(function(){
        $scope.showBlockDown($(this));
      });

      $scope.zoomBlockOut(zoomElement.children());

      downElements.each(function(){
        $scope.showBlockUp($(this));
      });

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
      console.log('zoomin');

      element.find('.block-zoom-content').first().fadeTo(500, 1, 'linear');
      $scope.zoomStack.push({
        top: element.offset().top,
        scroll: $(document).scrollTop(),
        element: element
      });

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
          height: $(window).height() + 'px'
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
      console.log('zoomout');
      element.find('.block-zoom-content').first().fadeTo(500, 0, 'linear');

      var popElement = $scope.zoomStack.pop();

      $animate.removeClass(element, 'zoom-in', {
        from: {
          top: '0px',
          left: '0px'
        },
        to: {
          width: element.parent().width() + 'px',
          height: element.parent().height() + 'px',
          overflow: 'hidden',
          top: popElement.top + 'px',
          left: element.parent().offset().left + 'px'
        }
      }).then(function(){
        element.css({
          width: '',
          height: '',
          left: '',
          top: ''
        });
      });

      $(document).scrollTop(popElement.scroll);
    }

    var hideUpLength = function(element){
      return element.offset().top - $(document).scrollTop() + element.outerHeight(true);
    };

    var hideDownLength = function(element){
      return $(window).height() - element.offset().top + $(document).scrollTop();
    };

    //checks if element has been zoomed in
    $scope.zoomContains = function(element){
      for (var i=0;i<$scope.zoomStack.length;i++){
        if($($scope.zoomStack[i].element).attr('class') == element.attr('class')){
          return true;
        }
      }
      return false;
    };

    //checks if element is last one to be zoomed in
    $scope.zoomContainsTop = function(element){
      //if stack is empty
      if($scope.zoomStack.length < 1)
        return false;
      var elementClass = element.attr('class');
      var topElement = $scope.zoomStack[$scope.zoomStack.length-1].element;
      var topClass = $(topElement).attr('class');
      if(topClass == elementClass)
        return true;
      return false;
    };

    //checks if the element is in zoom range
    $scope.zoomable = function(element){
      //get children of last zoomed element, and see if the elemet is a direct child

      var children = [];

      //if stack is empty
      if($scope.zoomStack.length < 1){
        //is element a child of the main parent?
        children = $('.block-placeholder').first().parent().children();
      }else{
        //get children of last zoomed element
        var currentZoomElement = $($scope.zoomStack[$scope.zoomStack.length-1].element);
        children = currentZoomElement.find('.block-placeholder').first().parent().children();
      }

      for (var i=0;i<children.length;i++){
        if($(children[i]).attr('class') == element.attr('class')){
          return true;
        }
      }
      return false;
    };
}]);

