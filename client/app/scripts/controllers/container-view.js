'use strict';

/**
* @ngdoc function
* @name dockerToolsApp.controller:ContainerViewCtrl
* @description
* # ContainerViewCtrl
* Controller of the dockerToolsAdd89ù89ù89ùpp
*/
angular.module('dockerToolsApp')
.controller('ContainerViewCtrl', function ($scope, $routeParams,ContainerStats, oboe) {
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
	 				fillColor: '#1AB394',
	 				data: [created, deleted, updated]
	 			}
	 			]
	 		};
	 		var context = document.getElementById('filesystems').getContext('2d');
	 		var skillsChart = new Chart(context).Bar(pieData);
	 	});

	 	$scope.container=container;


	 	$scope.datasets=[];
	 	$scope.datasetsRam=[];
	 	$scope.datasetsMaxRam=[];
	 	$scope.datasetsRx=[];
	 	$scope.datasetsTx=[];
	 	$scope.datasetsPgFaults=[];
	 	var updateInterval = 1000;
	 	var now = new Date().getTime();
	 	var cpt=0;
	 	for (var i = 0; i < 5; i++) {
	 		var temp = [now += updateInterval, 0];
	 	}
	 	var url="http://51.254.132.239:4243/containers/"+$routeParams.id+"/stats?=stream=true";
	 	$scope.datasets.push(temp);
	 	$scope.datasetsRam.push(temp);
	 	$scope.datasetsMaxRam.push(temp);
	 	$scope.datasetsTx.push(temp);
	 	$scope.datasetsRx.push(temp);
	 	$scope.datasetsPgFaults.push(temp);
	 	oboe.get(url)
	 	.node('precpu_stats.cpu_usage.total_usage',function(value){
	 		now+=updateInterval;
	 		var cpu_usage=Math.round( (value/10000000000) * 10 ) / 10
	 		var temp=[now, cpu_usage];
	 		var cpu_usage=Math.round( (value/10000000000) * 10 ) / 10
	 		cpt=(cpt+1)%6;
	 		if(cpt==0){
	 			$scope.datasets.shift();
	 		}
	 		$scope.datasets.push(temp);
	 		var data=[{
	 			label: "CPU:"+cpu_usage+"%",
	 			color: "#1AB394",
	 			lines:{fill:true},
	 			data: $scope.datasets
	 		}];
	 		var options={
	 			grid:{
	 				color: "#999999",
	 				tickColor: "#D4D4D4",borderWidth:0
	 			},
	 			xaxis: {
	 				show: false
	 			}
	 		};
	 		$.plot($("#cpuUsage"), data, options);
	 	})
	 	.node('memory_stats',function(info){
	 		var ram=info.usage;
	 		var max=info.max_usage;
	 		var valueRam=Math.round( ((ram/1000)/1000) * 10 ) / 10;
	 		var valueMax=Math.round( ((max/1000)/1000) * 10 ) / 10;
	 		now+=updateInterval;
	 		var tempRam=[now, valueRam];
	 		var tempMax=[now, valueMax];
	 		cpt=(cpt+1)%6;
	 		if(cpt==0){
	 			$scope.datasetsRam.shift();
	 			$scope.datasetsMaxRam.shift();
	 		}
	 		$scope.datasetsRam.push(tempRam);
	 		$scope.datasetsMaxRam.push(tempMax);
	 		var data=[{
	 			label: "RAM:"+valueRam+" Mb",
	 			color: "#1AB394",
	 			lines:{fill:false},
	 			data: $scope.datasetsRam
	 			},{
	 			label: "Max:"+valueMax+" Mb",
	 			color: "#EC4758",
	 			lines:{fill:false},
	 			data: $scope.datasetsMaxRam	
	 		}];
	 		var options={
	 			grid:{
	 				color: "#999999",
	 				tickColor: "#D4D4D4",borderWidth:0
	 			},
	 			xaxis: {
	 				show: false
	 			}
	 		};
	 		$.plot($("#memoryUsage"), data, options);
	 	})
	 	.node('network',function(value){
	 		var rx=Math.round( ((value.rx_bytes/1000)/1000) * 10 ) / 10;
	 		var tx=Math.round( ((value.tx_bytes/1000)/1000) * 10 ) / 10;

	 		now+=updateInterval;
	 		var tempRX=[now, rx];
	 		var tempTX=[now, tx];
	 		cpt=(cpt+1)%6;
	 		if(cpt==0){
	 			$scope.datasetsTx.shift();
	 			$scope.datasetsRx.shift();
	 		}
	 		$scope.datasetsTx.push(tempTX);
	 		$scope.datasetsRx.push(tempRX);
	 		var data=[{
	 			label: "RX:"+rx+" Mb",
	 			color: "#1AB394",
	 			lines:{fill:false},
	 			data: $scope.datasetsRx
	 			},{
	 			label: "TX:"+tx+" Mb",
	 			color: "#EC4758",
	 			lines:{fill:false},
	 			data: $scope.datasetsTx	
	 		}];
	 		var options={
	 			grid:{
	 				color: "#999999",
	 				tickColor: "#D4D4D4",borderWidth:0
	 			},
	 			xaxis: {
	 				show: false
	 			}
	 		};
	 		$.plot($("#ioUsage"), data, options);
	 	})
	 	.node('memory_stats.stats.pgfault',function(value){
	 		console.log(value);
	 		now+=updateInterval;
	 		var pgfaults=value;
	 		var temp=[now, pgfaults];
	 		cpt=(cpt+1)%6;
	 		if(cpt==0){
	 			$scope.datasetsPgFaults.shift();
	 		}
	 		$scope.datasetsPgFaults.push(temp);
	 		var data=[{
	 			label: "Current:"+pgfaults,
	 			color: "#1AB394",
	 			lines:{fill:true},
	 			data: $scope.datasetsPgFaults
	 		}];
	 		var options={
	 			grid:{
	 				color: "#999999",
	 				tickColor: "#D4D4D4",borderWidth:0
	 			},
	 			xaxis: {
	 				show: false
	 			}
	 		};
	 		$.plot($("#pgfaultsUsage"), data, options);
	 	})
	 	.done(function(things){

	 	});
	 });
});

