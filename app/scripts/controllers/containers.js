'use strict';

/**
 * @ngdoc function
 * @name dockerToolsApp.controller:ContainersCtrl
 * @description
 * # ContainersCtrl
 * Controller of the dockerToolsApp
 */
 angular.module('dockerToolsApp')
 .controller('ContainersCtrl', function ($scope, Containers) {
 	Containers.getList().then(function(containers){
 		for(var i=0;i<containers.length;i++){
 			var status=containers[i].Status;
 			if (status.indexOf("Exited") == 0) {
 				containers[i].Status="<a class='btn btn-danger btn-xs'>Exited</a>";
 			}
 			else if(status.indexOf("Up") == 0){
 				containers[i].Status="<a class='btn btn-primary btn-xs'>Online</a>";
 			}else{
 				containers[i].Status="<a class='btn btn-warning btn-xs'>Stopped</a>";
 			}

 			//get container name
 			var name=containers[i].Names[0];
 			containers[i].Name=name;

 			//convert ms to date
			var d = new Date(0); 
			d.setUTCSeconds(containers[i].Created);
			containers[i].CreatedAt=d.toLocaleString();
 		}
 		$scope.containers=containers;
 	});
 	
 });
