'use strict';

var userService = function ($q) {

  var service = {}, 
  USER_DETAILS = {};

  service.setUserAuthenticated = function (response) {
  	var details = {};

  	if (!response.token) {
      throw new Error('Token must be returned from the server!');
    }

    if (!response.username) {
      throw new Error('Username must be returned from the server!');
    }

    details.token = response.token;
    details.username = response.username;
    details.email = response.email;
    details.admin = response.admin;
    details.authenticated = true;

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

  service.login = function (username, password) {
    console.log('logging in with ' + username + '/' + password);

    var defer = $q.defer();

    setTimeout(function () {

      defer.resolve({
        token : 'EA@#321923kDSJHWQDSA231',
        username : username,
        email : username + '@gmail.com',
        admin : true
      });

      console.log('success');

      // defer.reject('Rejected');
      // console.log('fail');

    }, 1000);

    return defer.promise;
  };

  return service;

};

angular.module('booking')
  .service('UserService', ['$q', userService]);