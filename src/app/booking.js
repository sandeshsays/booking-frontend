'use strict';

angular

.module('booking', ['ngAnimate', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router'])
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'MainCtrl'
      })
      .state('404', {
    		url: '/404',
    		templateUrl: 'app/404/404.html'
      })
      .state('admin', {
    		url: '/admin',
    		templateUrl: 'app/admin/admin.html',
    		controller: 'AdminController'
      })
    	.state('admin.create', {
    		url: '/create',
    		templateUrl: 'app/admin/create/create.html',
        data: {
          allowed: function (user) {
            if (!user.isAdminAuthenticated()) {
              return {
                to: 'home'
              };
            }
          }
        }
    	})
      .state('admin.login', {
        url: '/login',
        templateUrl: 'app/admin/login/login.html'
      })
      .state('calendar', {
        url: '/:slug/calendar',
        templateUrl: 'app/calendar/calendar.html'
      });

    $urlRouterProvider.otherwise('/404');
  })

.run(['$rootScope', '$state', 'UserService', function($rootScope, $state, UserService) {

  $rootScope.$on('$stateChangeStart', function(e, to) {

    if (!to.data || !angular.isFunction(to.data.allowed)) 
      return;

    var result = to.data.allowed(UserService);

    if (result && result.to) {

      e.preventDefault();

      // Optionally set option.notify to false if you don't want 
      // to retrigger another $stateChangeStart event
      $state.go(result.to, result.params);
    }

  });

}])
;