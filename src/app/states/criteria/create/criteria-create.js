'use strict';

angular.module('booking.criteria')

	.config(function($stateProvider) {

		$stateProvider

    	.state('app.create-criteria', {
    		url: '/criteria/create/',
    		templateUrl: 'app/states/criteria/create/create.html',
    		accessLevel: 'admin'
    	});

	});