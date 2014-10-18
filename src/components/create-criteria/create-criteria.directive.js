'use strict';

var createCriteriaDirective = function () {

  var link = function (scope, element, attributes) {

  };

  var directive = {};

  directive.restrict = 'E';
  directive.link = link;
  directive.templateUrl = 'components/create-criteria/create-criteria.html';
  directive.controller = 'CreateCriteriaController';
  directive.controllerAs = 'CreateCtrl';

  return directive;

};

angular.module('booking')
  .directive('createCriteria', createCriteriaDirective);
