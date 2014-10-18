'use strict';

var navbarDirective = function () {

	var directive = {};

	directive.restrict = 'E';
	directive.controller = 'NavbarCtrl';
	directive.controllerAs = 'navCtrl';
	directive.templateUrl = '/components/navbar/navbar.html';

	return directive;

};

angular.module('booking')
  .directive('navBar', navbarDirective);
