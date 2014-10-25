'use strict';

angular.module('booking.criteria', [
		'booking.parent-state'
	])
	.config(function($stateProvider) {

		$stateProvider
		
			.state('app.criteria', {
				url: '/criteria/',
				templateUrl: 'app/states/criteria/criteria.html',
				controller: 'CriteriaController',
				controllerAs: 'CriteriaCtrl',
				accessLevel: 'admin',
				resolve: {
					criterias : function (criteriaService) {

						return criteriaService.getCriteria();

					}
				}
			})

    	.state('app.create-criteria', {
    		url: '/criteria/create/',
    		templateUrl: 'app/states/criteria/create/create.html',
    		accessLevel: 'admin'
    	});

	})
  .controller('CriteriaController', function (criteriaService, criterias) {

  	// implement

  	this.criterias = criterias.data;

	})

	.service('criteriaService', function ($http) {

		var service = this;

		service.getCriteria = function () {

			return $http.get('http://localhost:32722/api/booking/criterias');

		};

	});
