'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.UserService
 * @description
 * # UserService
 * Service in the dashboardApp.
 */
angular.module('dashboardApp')
  .service('UserService', function ($http) {
    var service={
    	createUser:createUser,
    	loginUser:loginUser
    };

    return service;

    function createUser(user,callback){
    	$http.post('/rest/register',user).success(callback);
    }

    function loginUser(user,callback){
    	$http.post('/rest/login',user).success(callback);
    }


  });
