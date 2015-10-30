'use strict';

/**
 * @ngdoc function
 * @name dockerToolsApp.controller:ContainerViewCtrl
 * @description
 * # ContainerViewCtrl
 * Controller of the dockerToolsApp
 */
angular.module('dockerToolsApp')
  .controller('ContainerViewCtrl', function ($scope, $routeParams,ContainerStats) {
  	 var value={stream:false};
  	 ContainerStats.one($routeParams.id).one('stats?stream=false').getList().then(function(container){
  	 	$scope.container=container;
  	 	console.log(JSON.stringify(container));
  	 });
  });
