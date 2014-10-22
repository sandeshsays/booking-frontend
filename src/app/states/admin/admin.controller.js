'use strict';

angular.module('booking.admin', [
		'booking.parent-state'
	])
	.config(function($stateProvider) {

		$stateProvider
		
			.state('app.admin', {
				url: '/admin',
				templateUrl: 'app/states/admin/admin.html',
				controller: 'AdminController',
				accessLevel: 'admin'
			})

    	.state('app.admin.create', {
    		url: '/create',
    		templateUrl: 'app/states/admin/create/create.html',
    		accessLevel: 'admin'
    	});

	})
  .controller('AdminController', function () {

  	// implement

	});
