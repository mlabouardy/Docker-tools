'use strict';

angular.module('dockerToolsApp')
  .factory('ContainerStatsRestangular',function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id:'Id'
      });
    });
  })
  .factory('ContainerStats',function(ContainerStatsRestangular){
    return ContainerStatsRestangular.service('containers');
  });
