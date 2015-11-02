'use strict';

/**
 * @ngdoc function
 * @name dockerToolsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dockerToolsApp
 */
 angular.module('dockerToolsApp')
 .controller('DashboardCtrl', function ($scope, Containers, Docker) {
 	$scope.dashboard=true;

 	Docker.one().get().then(function(information){
 		$scope.nbrOfContainers=information.Containers;
 		$scope.nbrOfImages=information.Images;
 		$scope.name=information.Name;
 		$scope.os=information.OperatingSystem;
 		$scope.kernel=information.KernelVersion;
 		$scope.driver=information.Driver;
 	});

 	Containers.getList().then(function(containers){
 		var exited=0;
 		var running=0;
 		var stopped=0;
 		for(var i=0;i<containers.length;i++){
 			var status=containers[i].Status;
 			if (status.indexOf("Exited") == 0) {
 				exited=exited+1;
 			}
 			else if(status.indexOf("Up") == 0){
 				running=running+1;
 			}else{
 				stopped=stopped+1;
 			}
 		}

 		var pieData = [
 		{
 			value: running,
 			label: 'Running',
 			color: '#1AB394'
 		},
 		{
 			value: exited,
 			label: 'Exited',
 			color: '#F8AC59'
 		},
 		{
 			value: stopped,
 			label: 'Stopped',
 			color: '#D32F2F'
 		}
 		];
 		var context = document.getElementById('lineChart').getContext('2d');
 		var skillsChart = new Chart(context).Pie(pieData);
 	});

 });
