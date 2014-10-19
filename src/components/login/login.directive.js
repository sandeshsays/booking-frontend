'use strict';

var loginDirective = function (loginService, $state) {

  var directive = {};
  var LOGIN_SERVICE;

  function processLoginSuccess (response) {

    // load user details/token from response

    $state.go('admin.create');
  }

  var link = function (scope, element, attributes) {

    if (!scope.type) {
      throw new Error('Type must be specified on the login element!');
    }

    switch(scope.type) {
      case 'admin':
          LOGIN_SERVICE = loginService.loginAsAdmin;
        break;

      case 'user':
          LOGIN_SERVICE = loginService.loginAsUser;
        break;

      default:
        throw new Error("Type must be admin or user!");
    }

    scope.login = function () {
      
      if (!scope.loading) {
        
        scope.loading = true;
        scope.error = "";

        LOGIN_SERVICE()
          .then(function (response) { // success

            processLoginSuccess(response);

          }, function (error) { // error

            scope.error = error;
            scope.loading = false;

          })
      }
    };

  };

  directive.restrict = 'E';
  directive.link = link;
  directive.templateUrl = '/components/login/login.html';
  directive.scope = {
    'type' : '@type'
  };

  return directive;
};

angular.module('booking')
  .directive('loginBox', ['LoginService', '$state', loginDirective]);