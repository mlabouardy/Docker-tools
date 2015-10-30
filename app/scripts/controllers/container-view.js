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

	 	ContainerStats.one($routeParams.id).one('logs?stderr=1&stdout=1&timestamps=0&follow=0&tail=100').get().then(function(logs){
	 		$scope.logs=logs;
	 	});

	 	ContainerStats.one($routeParams.id).one('changes').get().then(function(changes){
	 		var created=0;
	 		var deleted=0;
	 		var updated=0;
	 		for(var i=0;i<changes.length;i++){
	 			if(changes[i].Kind==0)
	 				updated++;
	 			else if(changes[i].Kind==1)
	 				created++;
	 			else if(changes[i].Kind==2)
	 				deleted++;
	 		}

	 		var pieData = {
	 			labels: ['Created', 'Deleted', 'Updated'],
	 			datasets: [
	 			{
	 				label: 'Number of file systems',
	 				fillColor: '##1AB394',
	 				data: [created, deleted, updated]
	 			}
	 			]
	 		};
	 		var context = document.getElementById('filesystems').getContext('2d');
	 		var skillsChart = new Chart(context).Bar(pieData);
	 	});

	 	$scope.container=container;
	 });
});
