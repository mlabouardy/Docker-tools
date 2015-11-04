'use strict';

angular.module('dockerToolsApp')
  .factory('DockerRestangular',function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id:'Id'
      });
    });
  })
  .factory('Docker',function(DockerRestangular){
    return DockerRestangular.service('info');
  });
