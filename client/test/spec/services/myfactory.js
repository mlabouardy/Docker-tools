'use strict';

describe('Service: myfactory', function () {

  // load the service's module
  beforeEach(module('dockerToolsApp'));

  // instantiate service
  var myfactory;
  beforeEach(inject(function (_myfactory_) {
    myfactory = _myfactory_;
  }));

  it('should do something', function () {
    expect(!!myfactory).toBe(true);
  });

});
