'use strict';

describe('Controller: ContainerViewCtrl', function () {

  // load the controller's module
  beforeEach(module('dockerToolsApp'));

  var ContainerViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContainerViewCtrl = $controller('ContainerViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ContainerViewCtrl.awesomeThings.length).toBe(3);
  });
});
