'use strict';

var criteriaService = function () {

	/*
	* public accessible service
	*/
	var service = {};

	/*
	* somethingsomething 
	*/
	service.createCriteria = function (criteria) {

		var uri = $rootScope.apiUri + 'criteria';
		var createPromise = $http.post(uri, criteria);

		createPromise.then(function (response){ // success



		}, function (response) { // error



		});

	};

	/*
	* somethingsomething 
	*/
	service.readCriteria = function (criteriaSlug) {

		var uri = $rootScope.apiUri + 'criteria/' + criteriaSlug;
		var createPromise = $http.get(uri);

		createPromise.then(function (response){ // success



		}, function (response) { // error



		});

	};

	/*
	* somethingsomething 
	*/
	service.readCriterias = function () {

		var uri = $rootScope.apiUri + 'criteria';
		var createPromise = $http.get(uri);

		createPromise.then(function (response){ // success



		}, function (response) { // error



		});

	};

};

angular.module('booking')

	/*
	* somethingsomething 
	*/
  .service('CriteriaService', [
  	'$http', 
  	'$rootScope', 
  	'$q', 
  	'$state', 
  	criteriaService
	]);