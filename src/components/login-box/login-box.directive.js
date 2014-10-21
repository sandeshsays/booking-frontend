'use strict';

var loginDirective = function (loginService, $state, $http, $rootScope) {

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

    scope.ls = loginService;

    console.log(loginService);

    scope.login = function (user, pass) {

      var request = {
        username : user,
        password: pass
      }

      SUBMITTED = true;

      if (!scope.loginform.$valid) {
        return;
      }

      if (!scope.loading) {
        
        scope.error = '';
        var loginPromise = $http.post($rootScope.apiUri + 'user/login', request);
        scope.loading = true;

        loginService.login(loginPromise);

        loginPromise.then(function () {

          console.log('success');

        }, function () {

          console.log('error');
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
  .directive('loginBox', ['LoginService', '$state', '$http', '$rootScope', loginDirective]);