'use strict';

angular.module('dockerToolsApp')
  .factory('ImagesRestangular',function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id:'Id'
      });
    });
  })
  .factory('Images',function(ImagesRestangular){
    return ImagesRestangular.service('images/json');
  });
