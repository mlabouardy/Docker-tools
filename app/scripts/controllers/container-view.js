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
  	 ContainerStats.one($routeParams.id).one('json').get().then(function(container){

  	 	//get env variables
  	 	var envs=container.Config.Env;
  	 	$scope.envs=[];
  	 	for(var i=0;i<envs.length;i++){
  	 		var env=envs[i]

  	 		var variableValue = env.substr(env.indexOf("=") + 1);
 			var variableName= env.substr(0, env.indexOf('=')); 

 			$scope.envs.push({
 				name:variableName,
 				value:variableValue
 			});
  	 	}


  	 	ContainerStats.one($routeParams.id).one('top').get().then(function(processes){
  	 		$scope.processes=[];
  	 		for(var i=0;i<processes.Processes.length;i++){
  	 			$scope.processes.push({
  	 				name:processes.Processes[i][7]
  	 			});
  	 		}
  	 	});

  	 	$scope.container=container;
  	 });
  });
