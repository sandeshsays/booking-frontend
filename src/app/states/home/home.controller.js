'use strict';

angular.module('booking.home', [
  'booking.parent-state'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.home', {
        url: '/',
        templateUrl: 'app/states/home/home.html',
        controller: 'HomeController'
      });
  })
  .controller('HomeController', function (LoginService, $rootScope, $http, $state) {
    this.loginService = LoginService;

    this.logout = function () {
      var logoutPromise = $http.get($rootScope.apiUri + 'user/logout');

      LoginService.logout(logoutPromise);

      logoutPromise.then(function() {

        $state.go('app.login');
        
      });
      
    };
  });
