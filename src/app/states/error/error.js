'use strict';

angular.module('booking.error', [
  'booking.parent-state'
  ])

  .config(function ($stateProvider) { 

    $stateProvider
      .state('app.error', {

        url: '/error/:error',
        templateUrl: 'app/states/error/error.html',
        controller: 'ErrorController'

      });

  })

  .controller('ErrorController', function ($scope, $stateParams) {

    switch($stateParams.error)
    {
      case 'unauthorized':
        $scope.message = 'You are not authorized, soz!';
        break;

      case '401':
        $scope.message = 'You are not authorized, soz!';
        break;

      default:
        $scope.message = 'An error occured..!';
    }

  });