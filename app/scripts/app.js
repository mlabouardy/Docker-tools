'use strict';

/**
 * @ngdoc overview
 * @name dockerToolsApp
 * @description
 * # dockerToolsApp
 *
 * Main module of the application.
 */
angular
  .module('dockerToolsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/containers', {
        templateUrl: 'views/containers.html',
        controller: 'ContainersCtrl'
      })
      .when('/images', {
        templateUrl: 'views/images.html',
        controller: 'ImagesCtrl'
      })
      .when('/templates', {
        templateUrl: 'views/templates.html',
        controller: 'TemplatesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
