'use strict';

angular.module('booking.criteria')

    .config(function($stateProvider) {

        $stateProvider

        .state('app.view-criteria.bookable', {
            url: ':bookable/',
            templateUrl: 'app/states/criteria/view/bookable/bookable.html',
            accessLevel: 'admin',
            controller: 'BookableController',
            controllerAs: 'BookableCtrl'
        });

    })

    .controller('BookableController', function (criteriaService, $state, $stateParams) {

        console.log($stateParams);

        var controller = this;

        controller.loading = true;

        criteriaService.getBookable($stateParams.slug, $stateParams.bookable).then(function success (response) {
            console.log(response.data);
            controller.bookable = response.data;

            controller.loading = false;
        }, function error (response) {

            controller.loading = false;

        });
    });