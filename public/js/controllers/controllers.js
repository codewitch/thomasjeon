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
    $scope.viewDir = "/views/templates/";

    $scope.currentSection = $scope.params.section? $scope.params.section : 'home';

    $scope.mainSections = [
      {'title': 'About Me', 'description': 'Wanna know more about me?', 'class': 'about', 'layout': 'center'},
      {'title': 'Projects', 'description': 'Here\'s some stuff I\'ve done!', 'class': 'projects', 'layout': 'divide'},
      {'title': 'Resume', 'description': 'See what I\'ve been up to!', 'class': 'resume', 'layout': 'divide'},
    ];

    $scope.$on('$viewContentLoaded', function(){

      $timeout(function(){
        //redirect depending on query
        zoomToQuery($location.url());
        $scope.headerLineShow = true;
        $scope.socialShow1 = true;
      }, 300);

      $timeout(function(){
        $scope.socialShow2 = true;
      }, 450);
    });

    var zoomToQuery = function(uri){
      console.log(parseArgs(uri));
      var sections = parseArgs(uri);
      sections.forEach(function(element, index, aray){
        console.log(element);
        $scope.showBlock(element);
      });
    };

    $scope.zoomStack = new Array();

    $scope.windowOpen = function(link, section){
      //if block isnt on current screen, dont open link
      var linkElement = $('.' + section + '-placeholder');
      if( !$scope.zoomable(linkElement) )
        return;
      window.open(link);
    };

    $scope.$on('$locationChangeStart', function(event, nextUrl, currentUrl){
      var currentArgs = parseArgs(currentUrl);
      var nextArgs = parseArgs(nextUrl);

      if(nextArgs.length > currentArgs.length){
        $scope.showBlock(nextArgs[nextArgs.length-1]);
      }else{
        $scope.hideBlock(currentArgs[currentArgs.length-1]);
      }
      $scope.currentSection = nextArgs[nextArgs.length-1];
    });

    $scope.changeSearch = function(key, value){
      var zoomElement = $('.' + value + '-placeholder');
      //if already zoomed in, dont do anything
      //if block isnt on current screen, dont zoom
      if( $scope.zoomContains(zoomElement.children()) || !$scope.zoomable(zoomElement) ){
        return;
      }
      $location.search(key, value);
    };

    $scope.goBackRoute = function(){
      window.history.back();
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

      element.find('.block-zoom-content').first().fadeIn(500, 'linear');

      $scope.zoomStack.push({
        top: element.offset().top,
        scroll: $(document).scrollTop(),
        element: element
      });

      element.parent().removeClass('cursor-pointer');

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
      element.find('.block-zoom-content').first().fadeOut(500, 'linear');

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

      element.parent().addClass('cursor-pointer');
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

    //returns the query arguements given a string query
    var parseArgs = function(uri){
      var args = [];
      uri.replace(
          new RegExp("([^?=&]+)(=([^&]*))", "g"),
          function($0, $1, $2, $3) { args.push($3); }
      );
      return args;
    };

}]);

