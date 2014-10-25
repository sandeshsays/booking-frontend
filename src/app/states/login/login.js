'use strict';

angular.module('booking.login', [
  'booking.parent-state'
  ])
.config(function ($stateProvider) {
  $stateProvider
    .state('app.login', {
      url: '/login/',
      templateUrl: 'app/states/login/login.html',
      resolve: {
      	'logged' : function (LoginService) {
      		 
      		console.log('seeing if user can go to login page..');
/*      		var q = $q.defer();

      		if (LoginService.isAuthenticated()) {

      			q.resolve();

      		}
      		else {

      			q.reject();

      		}*/


      	}
      }
    });
});