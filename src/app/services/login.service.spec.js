'use strict';

// inspired from http://nathanleclaire.com/blog/2014/04/12/unit-testing-services-in-angularjs-for-fun-and-for-profit/

// unit test is broken, need to fix.

describe('LoginService', function() {
  var rootScope,
	  http = {},
	  q = {},
	  state = {},
    loginService;

  beforeEach(module('booking'));

  beforeEach(inject(function($rootScope) {
    rootScope = $rootScope.$new();
  }));

  beforeEach(module(function ($provide) {

    $provide.value("$http", http);
    $provide.value("$rootScope", rootScope);
    $provide.value("$q", q);
    $provide.value("$state", state);

  }));

  beforeEach(inject(function(LoginService) {
    loginService = LoginService;
  }));

  it('should exist', inject(function($controller) {

    console.log(loginService);
    expect(loginService).toBeTruthy();

  }));
});                                               