'use strict';

angular.module('booking.criteria')

    .config(function($stateProvider) {

        $stateProvider

        .state('app.view-criteria.bookable', {
            url: ':bookable/',
            templateUrl: 'app/states/criteria/view/bookable/bookable.html',
            accessLevel: 'admin',
            controller: 'BookableController',
            controllerAs: 'BookableCtrl',
            resolve: {
                bookable : function (criteriaService, $stateParams) {

                    return criteriaService.getBookable($stateParams.bookable);

                }
            }
        });

    })

    .controller('BookableController', function (criteriaService, bookable, $state) {
        console.log(bookable.data);
        this.bookable = bookable.data;

    });