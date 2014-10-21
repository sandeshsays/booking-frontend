'use strict';

angular.module('booking.admin', [
		'booking.parent-state'
	])
	.config(function($stateProvider) {

		$stateProvider
		
			.state('app.admin', {
				url: '/admin',
				templateUrl: 'app/states/admin/admin.html',
				controller: 'AdminController'
			})

    	.state('app.admin.create', {
    		url: '/create',
    		templateUrl: 'app/states/admin/create/create.html'
    	});

	})
  .controller('AdminController', function () {

  	// implement

	});
