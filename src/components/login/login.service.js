'use strict';

var loginService = function ($q) {

  var service = {};

  service.loginAsAdmin = function () {
		console.log('logging in as an admin');

		var defer = $q.defer();

		setTimeout(function () {

			defer.resolve('yay');
			console.log('login success');

			//defer.reject('Rejected');
			//console.log('login failed');

		}, 1000);

		return defer.promise;
  };

  service.loginAsUser = function () {
		console.log('logging in as a user');
  };

  return service;

};

angular.module('booking')
  .service('LoginService', ['$q', loginService]);
