'use strict';

/**
* inspired from by https://github.com/mrgamer/angular-login-example
*
*/
var loginService = function ($http, $rootScope, $q, $state) {

  var USER_TOKEN_ITEM = 'userToken';
  var USER_TOKEN = localStorage.getItem(USER_TOKEN_ITEM);

  var LOGOUT_REDIRECT = 'app.login';
  var ERROR_REDIRECT = 'app.error';

  var setHeaders = function (token) {

    if (!token) {

      console.log('user is invalid, deleting header');
      delete $http.defaults.headers.common['X-Token'];
      console.log('deleted header');
      return;

    }

    console.log('setting header');
    $http.defaults.headers.common['X-Token'] = token.toString();
    console.log('set header');

  }

  var setToken = function (token) {

    if (!token) {

      console.log('user is invalid, deleteing token');
      localStorage.removeItem(USER_TOKEN_ITEM);
      console.log('deleted token');

    } else {

      console.log('setting token');
      localStorage.setItem(USER_TOKEN_ITEM, token);
      console.log('set token');

    }

    setHeaders(token);

  }

  var initialCheckForLoginData = function () {

    console.log('user token is: ' + USER_TOKEN);

    if (USER_TOKEN) {

      console.log('user might be authenticated');
      setHeaders(USER_TOKEN);

    } else {

      console.log('user is not authenticated, setting role to public');
      service.user.role = "public";

    }

  };


  var managePermissions = function () {

    /**
    * This is called on every route change via parent-state
    */
    $rootScope.$on('$stateChangeStart', function (event, to, toParams, from, fromParams) {

      /**
      * If the user role is not set, we set service.pendingStateChange and 
      * the parent-state will pick it up later to call the service and check user role.
      */

      if (service.user.role === null) {

        console.log('userrole is not set, setting pendingStateChange')

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

      if (to.accessLevel === undefined || to.accessLevel === service.user.role) {

        console.log('page access granted');
        angular.noop();

      } else {

        console.log('page access denied');

        event.preventDefault();

        $rootScope.$emit('$statePermissionError');

        $state.go(ERROR_REDIRECT, { error: 'unauthorized' }, { 

          location: false, 
          inherit: false 

        });

      }

    });

  };

  var handleLogin = function (user, status, headers, config) {

    console.log('handling login');

    setToken(user.token);

    angular.extend(service.user, user);

    return user;

  }

  /**
   * Public service
   */
  var service = {};

  /**
  * Public properties
  */
  service.user = { role: null };
  service.pendingStateChange = null,

  /**
  * Public methods
  */
  service.login = function (loginPromise) {
    console.log('logging in');

    loginPromise.success(handleLogin);

    console.log('logged in');
  };

  service.logout = function (logoutPromise) {
    console.log('logging out');

    var outterService = this;

    logoutPromise.then(function () {

      setToken(null);

      // clears service.user
      console.log('resetting user model');

      outterService.user = {
        role : 'public'
      };

      console.log('logged out');

    });
  };

  service.resolvePendingState = function (userCheckPromise) {

    var checkUser = $q.defer(),
      outterService = this,
      pendingState = outterService.pendingStateChange;

    console.log('resolving pendingStateChange');

    userCheckPromise.success(handleLogin);

    userCheckPromise.then(function (response) {

      if (pendingState.to.accessLevel === undefined || pendingState.to.accessLevel !== outterService.user.role) {

        checkUser.resolve();

      } else {

        checkUser.reject('unauthorized');

      }
    }, function (response) {

      checkUser.reject(response.status.toString());

    });

     outterService.pendingStateChange = null;

     return checkUser.promise;
  };

  initialCheckForLoginData();
  managePermissions();

  return service;

};

angular.module('booking')
  .service('LoginService', ['$http', '$rootScope', '$q', '$state', loginService]);