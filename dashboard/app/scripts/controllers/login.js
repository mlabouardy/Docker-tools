'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('LoginCtrl', function ($scope, UserService) {
    	$scope.login=function(){
    		UserService.loginUser($scope.user,function(response){
    			console.log('response '+response);
    		});
    	};
  });
