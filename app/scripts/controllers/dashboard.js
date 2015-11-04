'use strict';

/**
 * @ngdoc function
 * @name dockerToolsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dockerToolsApp
 */
 angular.module('dockerToolsApp')
 .controller('DashboardCtrl', function ($scope, Containers, Docker, ContainerStats) {
 	$scope.dashboard=true;

 	Docker.one().get().then(function(information){
 		$scope.nbrOfContainers=information.Containers;
 		$scope.nbrOfImages=information.Images;
 		$scope.name=information.Name;
 		$scope.os=information.OperatingSystem;
 		$scope.kernel=information.KernelVersion;
 		$scope.driver=information.Driver;
 		$scope.used=information.DriverStatus[5][1];
 		$scope.available=information.DriverStatus[7][1];


 		var pieData = [
 		{
 			value: $scope.used,
 			label: 'Used data space',
 			color: '#1AB394'
 		},
 		{
 			value: $scope.available,
 			label: 'Available data space',
 			color: '#F8AC59'
 		}
 		];

 		
 		var context2 = document.getElementById('lineChart2').getContext('2d');
 		var skillsChart2 = new Chart(context2).Doughnut(pieData);
 	});

 	ContainerStats.one("json").getList().then(function(runningContainers){
 		$scope.running=runningContainers;
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
