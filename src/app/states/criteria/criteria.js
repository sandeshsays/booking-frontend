'use strict';

angular.module('booking.criteria', [
		'booking.parent-state',
		'booking.criteria-service'
	])
	.config(function($stateProvider) {

		$stateProvider
		
			.state('app.criteria', {
				url: '/criteria/',
				templateUrl: 'app/states/criteria/criteria.html',
				controller: 'CriteriaListController',
				controllerAs: 'CriteriaCtrl',
				accessLevel: 'admin',
				resolve: {
					criterias : function (criteriaService) {

						return criteriaService.getCriteria();

					}
				}
			});

	})

  .controller('CriteriaListController', function (criteriaService, criterias) {

  	// implement 

  	this.criterias = criterias.data;

	});