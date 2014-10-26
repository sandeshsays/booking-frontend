'use strict';

angular.module('booking.criteria')

	.config(function($stateProvider) {

		$stateProvider

    	.state('app.view-criteria', {
    		url: '/criteria/:slug/',
    		templateUrl: 'app/states/criteria/view/view.html',
    		accessLevel: 'admin',
    		controller: 'CriteriaController',
			controllerAs: 'CriteriaCtrl',
    		resolve: {
    			criteria : function (criteriaService, $stateParams) {

    				return criteriaService.getCriteria($stateParams.slug);

    			}
    		}
    	});

	})

	.controller('CriteriaController', function (criteriaService, criteria, $state) {

		this.criteria = criteria.data;

        this.openBookableModal = function () {
            $state.go('.add-bookable', { criteriaId: criteria.Id });
        };


        this.openBookable = function (slug) {

            $state.go('.:' + slug);

        };

	});