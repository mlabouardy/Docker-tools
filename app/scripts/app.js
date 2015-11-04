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
    'ngTouch',
    'restangular',
     'ng-oboe'
  ])
  .config(function ($routeProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('http://51.254.132.239:4243');
    
    $routeProvider
      .when('/', {
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
      .when('/container/:id', {
        templateUrl: 'views/container-view.html',
        controller: 'ContainerViewCtrl'
        
      })
      .when('/image/:id', {
        templateUrl: 'views/image-view.html',
        controller: 'ImageViewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });