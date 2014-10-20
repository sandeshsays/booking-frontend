'use strict';

var loginDirective = function (userService, $state) {

  var directive = {},
    SUBMITTED = false;

  function processLoginSuccess (response) {

    userService.setUserAuthenticated(response);

    if (userService.isAdminAuthenticated()) {
      $state.go('admin');
    }
    else {
      $state.go('home');
    }
  }

  var link = function (scope) {

    scope.login = function (username, password) {

      SUBMITTED = true;

      if (!scope.loginform.$valid) {
        return;
      }

      if (!scope.loading) {
        
        scope.loading = true;
        scope.error = '';

        userService.login(username, password)
          .then(function (response) { // success

            processLoginSuccess(response);

          }, function (error) { // error

            scope.error = error;
            scope.loading = false;

          });
      }
    };

  scope.hasError = function (control) {
    if ((control.$dirty && !control.$valid) || 
      (!control.$valid && SUBMITTED)) {
      return true;
    }

    return false;
  };

  };

  directive.restrict = 'E';
  directive.link = link;
  directive.templateUrl = '/components/login-box/login-box.html';

  return directive;
};

angular.module('booking')
  .directive('loginBox', ['UserService', '$state', loginDirective]);