'use strict';

describe('Controller: ImageViewCtrl', function () {

  // load the controller's module
  beforeEach(module('dockerToolsApp'));

  var ImageViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImageViewCtrl = $controller('ImageViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ImageViewCtrl.awesomeThings.length).toBe(3);
  });
});
