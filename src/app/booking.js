'use strict';

angular
  .module('booking', [
    // 1st party modules
    'ngAnimate',
    'ngTouch', 
    'ngAria',
    'ngSanitize', 
    'ngResource', 
    // 3rd party modules
    'ui.router',
    // booking.routes
    'booking.home',
    'booking.login',
    'booking.admin',
    'booking.calendar',
    'booking.error'
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