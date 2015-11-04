'use strict';

/**
 * @ngdoc function
 * @name dockerToolsApp.controller:ImagesCtrl
 * @description
 * # ImagesCtrl
 * Controller of the dockerToolsApp
 */
angular.module('dockerToolsApp')
  .controller('ImagesCtrl', function ($scope, Images) {
  	Images.getList().then(function(images){
  		for(var i=0;i<images.length;i++){
  			//convert to Megabytes
 			var size=images[i].VirtualSize;
 			images[i].VirtualSize=(size/1000)/1000;

 			//get repository name and tag
 			var repositoryName=images[i].RepoTags[0];
 			var tag = repositoryName.substr(repositoryName.indexOf(":") + 1);
 			var imageName= repositoryName.substr(0, repositoryName.indexOf(':')); 

 			images[i].Tag=tag;
 			images[i].Name=imageName;

 			//convert ms to date
			var d = new Date(0); 
			d.setUTCSeconds(images[i].Created);
			images[i].CreatedAt=d.toLocaleString();


 		}
  		$scope.images=images;
  	});
  });
