'use strict';

var loginDirective = function () {

  var directive = {};

  var link = function () {

  };

  directive.restrict = 'E';
  directive.link = link;
  directive.templateUrl = '/components/login/login.html';
  directive.controller = 'LoginController';
  directive.controllerAs = 'LoginCtrl';

  return directive;
};

angular.module('booking')
  .directive('loginBox', loginDirective);
