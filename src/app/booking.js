'use strict';

angular
  .module('booking', [
    // components
    'ngAnimate', 
    'ngTouch', 
    'ngSanitize', 
    'ngResource', 
    'ui.router',
    // app routes
    'booking.home',
    'booking.login',
    'booking.admin',
    'booking.calendar',
    'booking.error'
    // services
  ])
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('404', {
        url: '/404',
        templateUrl: 'app/states/404/404.html'
      }); 

    $urlRouterProvider.otherwise('/404');
  })

.run(['$rootScope', '$state', function($rootScope, $state) {

  /**
   * Global variables exposed on the rootScope.
   */
  $rootScope.apiUri = 'http://localhost:32722/api/';
  $rootScope.loading = false;

  var finishedLoading = function () { 
    $rootScope.loading = false; 
  };

  $rootScope.$on('$stateChangeStart', function () {
    $rootScope.loading = true;
  });

  $rootScope.$on('$stateChangeSuccess', finishedLoading);
  $rootScope.$on('$stateChangeError', finishedLoading);
  $rootScope.$on('$statePermissionError', finishedLoading);
}]);