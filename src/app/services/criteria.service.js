'use strict';

var criteriaService = function ($http, $rootScope) {

	/*
	* public accessible service
	*/
	var service = this;

	/*
	* somethingsomething 
	*/
	service.createCriteria = function (criteria) {

		// implement, man

	};

	/*
	* somethingsomething 
	*/
	service.getCriteria = function (slug) {

		if (slug) {

			return $http.get('http://localhost:32722/api/booking/criteria/' + slug);

		}

		return $http.get('http://localhost:32722/api/booking/criterias');

	};


	service.addBookable = function (bookable) {

		console.log(bookable);

	};


	service.getBookable = function (criteria, bookable) {

		return $http.get('http://localhost:32722/api/booking/criteria/' + criteria + '/' + bookable);

	};

	return service;
};

angular.module('booking.criteria-service', [])

	/*
	* somethingsomething 
	*/
  .service('criteriaService', [
  	'$http', 
  	'$rootScope',
  	criteriaService
	]);