'use strict';

angular.module('booking.criteria')

	.config(function($stateProvider) {

		$stateProvider

    	.state('app.view-criteria.add-bookable', {

    		templateUrl: 'app/states/criteria/view/add-bookable/add-bookable.html',
    		accessLevel: 'admin',
    		controller: 'AddBookableController',
			controllerAs: 'AddBookableCtrl'

    	});

	})

	.controller('AddBookableController', function (criteriaService, $state, $scope, $stateParams) {

        this.cancel = function () {

            $state.go('^');

        };

        this.add = function () {

            var bookable = {
                name: $scope.name,
                criteriaSlug: $stateParams.slug
            };

            criteriaService.addBookable(bookable);

        };

	});