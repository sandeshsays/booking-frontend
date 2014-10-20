'use strict';

angular

.module('booking', ['ngAnimate', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router'])
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/states/home/home.html',
        controller: 'MainCtrl'
      })
      .state('404', {
    		url: '/404',
    		templateUrl: 'app/states/404/404.html'
      })
      .state('admin', {
    		url: '/admin',
    		templateUrl: 'app/states/admin/admin.html',
    		controller: 'AdminController'
      })
    	.state('admin.create', {
    		url: '/create',
    		templateUrl: 'app/states/admin/create/create.html',
        data: {
          allowed: function (user) {
            // if (!user.isAuthenticated()) {
            //   return {
            //     to: 'login'
            //   };
            // }

            // if (!user.isAdminAuthenticated()) {
            //   return {
            //     to: 'home'
            //   };
            // }
            return true;
          }
        }
    	})
      .state('login', {
        url: '/login',
        templateUrl: 'app/states/login/login.html',
        data: {
          allowed: function (user) {
            if (user.isAuthenticated()) {
              return {
                to: 'home'
              };
            }
          }
        }
      })
      .state('calendar', {
        url: '/:slug/calendar',
        templateUrl: 'app/states/calendar/calendar.html'
      });

    $urlRouterProvider.otherwise('/404');
  })

.run(['$rootScope', '$state', 'UserService', function($rootScope, $state, UserService) {

  $rootScope.$on('$stateChangeStart', function(e, to) {

    if (!to.data || !angular.isFunction(to.data.allowed)) {
      return;
    }

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