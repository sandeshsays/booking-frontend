'use strict';

var userService = function () {

  var service = {};

  var USER_DETAILS = {
  	authenticated : true,
  	admin : true
  };

  service.setUserDetails = function (user) {
  	var details = {};

  	

  	USER_DETAILS = details;
  };

  service.isAuthenticated = function () {
  	return USER_DETAILS.authenticated;
  };

  service.isAdminAuthenticated = function () {
  	return USER_DETAILS.authenticated && USER_DETAILS.admin;
  };

  service.clearUserDetails = function () {
  	USER_DETAILS = {};
  };

  return service;

};

angular.module('booking')
  .service('UserService', userService);
