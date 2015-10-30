
angular.module('dockerToolsApp')
  .factory('ContainersRestangular',function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id:'Id'
      });
    });
  })
  .factory('Containers',function(ContainersRestangular){
    return ContainersRestangular.service('containers/json?all=1');
  });
