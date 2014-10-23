'use strict';

describe('HomeController', function(){
  //var scope;

  beforeEach(module('booking'));

  beforeEach(inject(function($rootScope) {
  	// scope = $rootScope.$new();
  }));

  it('should exist', inject(function($controller) {

    var homeController = $controller('HomeController', {

  	});

    expect(homeController).toBeTruthy();

  }));
});                                               