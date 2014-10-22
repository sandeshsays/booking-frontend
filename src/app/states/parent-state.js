'use strict';

angular.module('booking.parent-state', [
  'ui.router'
  ])
.config(function ($stateProvider) {
  console.log('loading parent state');
  $stateProvider
    .state('app', {

      abstract: true,


      template: '<ui-view></ui-view>',


      resolve: {
        'login': function (LoginService, $q, $http) {
          var roleDefined = $q.defer();

          /**
           * In case there is a pendingStateChange means the user requested a $state,
           * but we don't know yet user's userRole.
           *
           * Calling resolvePendingState makes the loginService retrieve his userRole remotely.
           */
          if (LoginService.pendingStateChange) {

            console.log('trying to change state to ' + LoginService.pendingStateChange.to.name);
            return LoginService.resolvePendingState($http.get('http://localhost:32722/api/user'));

          } else {

            console.log('there is no pending state change');
            roleDefined.resolve();

          }

          return roleDefined.promise;
        }
      }
  });
});