'use strict';

/**
* based on https://github.com/mrgamer/angular-login-example
*
*/
var loginService = function ($http, $rootScope, $q) {

  var USER_TOKEN_ITEM = 'userToken';
  var USER_TOKEN = localStorage.getItem(USER_TOKEN_ITEM);

  var setHeaders = function (token) {

    if (!token) {

      delete $http.defaults.headers.common['X-Token'];
      return;

    }

    $http.defaults.headers.common['X-Token'] = token.toString();

  }

  var setToken = function (token) {



    if (!token) {

      localStorage.removeItem(USER_TOKEN_ITEM);

    } else {

console.log('setting token');
      localStorage.setItem(USER_TOKEN_ITEM, token);
console.log('set token');

    }

    setHeaders(token);

  }

  var getLoginData = function () {

    console.log(USER_TOKEN);

    if (USER_TOKEN) {

      setHeaders(USER_TOKEN);

    } else {

      service.authenticated = false;
      service.userRole = "public";
      service.doneLoading = true;

    }

  };

  /**
  * This is called on every route change.
  */
  var managePermissions = function () {

    $rootScope.$on('$stateChangeStart', function (event, to, toParams, from, fromParams) {

      /**
      * If the user role is not set, we set service.pendingStateChange and 
      * the parent-state will pick it up later to call the service and check user role.
      */
      if (service.userRole === null) {

        service.doneLoading = false;
        service.pendingStateChange = {
          to : to, 
          toParams : toParams
        };

        return;
      }

      /**
      * if the accesslevel is undefined (anyone can access) or accesslevel = userrole,
      * user can go to the route
      */

      if (to.accessLevel === undefined || to.accessLevel === service.userRole) {
        angular.noop();
      } else {
        event.preventDefault();
        $rootScope.$emit('$statePermissionError');
        $state.go('error', { error: 'unauthorized' }, { location: false, inherit: false });
      }

    });

  };



  var handleLogin = function (user, status, headers, config) {

     setToken(user.data.token);

     angular.extend(service.user, user.data); // deep copy user to service.user

     service.authenticated = true;

     service.userRole = user.data.role;

     return user;
  }

  /**
   * Exposed public methods
   */
  var service = {};

  /**
  * Public properties
  */
  service.user = {};
  service.userRole = null;
  service.authenticated = null;

  service.pendingStateChange = null,
  service.doneLoading = null;

  /**
  * Public methods
  */
  service.login = function (loginPromise) {
    console.log('logging in');

    loginPromise.then(handleLogin);

    console.log('logged in');
  };

  service.logout = function (logoutPromise) {
    console.log('logging out');

    setToken(null);

    this.userRole = "public";

    // clears service.user
    this.user = {};

    // clears service.authenticated
    this.authenticated = false;

    $state.go('home');

    console.log('logged out');
  };

  service.resolvePendingState = function (userCheckPromise) {

    var checkUser = $q.defer(),
      self = this,
      pendingState = self.pendingStateChange;

    userCheckPromise.success(self.loginHandler);

    userCheckPromise.then(function (response) {
      self.doneLoading = true;

      if (pendingState.to.accessLevel === undefined || pendingState.to.accessLevel !== self.userRole) {

        checkUser.resolve();

      } else {

        checkUser.reject('unauthorized');

      }
    }, function (response) {

      checkUser.reject(response.status.toString());

    });

     self.pendingStateChange = null;
     return checkUser.promise;
  };

  getLoginData();
  managePermissions();

  return service;

};

angular.module('booking')
  .service('LoginService', ['$http', '$rootScope', '$q', loginService]);