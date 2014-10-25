'use strict';

/**
* LoginService
* inspired by https://github.com/mrgamer/angular-login-example
*/
var loginService = function ($http, $rootScope, $q, $state) {

  var USER_TOKEN_ITEM = 'userToken';
  var USER_TOKEN = localStorage.getItem(USER_TOKEN_ITEM);

  var LOGOUT_REDIRECT = 'app.login';
  var ERROR_REDIRECT = 'app.error';

  var USER_IS_AUTHENTICATED = false;

  var setHeaders = function (token) {

    if (!token) {

      console.log('user is invalid, deleting header');
      delete $http.defaults.headers.common['X-Token'];
      console.log('deleted header');
      USER_IS_AUTHENTICATED = false;
      return;

    }

    USER_IS_AUTHENTICATED = true;
    console.log('setting header');
    $http.defaults.headers.common['X-Token'] = token.toString();
    console.log('set header');

  }

  var setToken = function (token) {

    if (!token) {

      console.log('user is invalid, deleting token');
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

        console.log('page access granted in $stateChangeStart for ' + to.name);
        angular.noop();

      } else {

        console.log('page access denied in $stateChangeStart for ' + to.name);

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

    var token = user.token || USER_TOKEN;
    setToken(token);

    angular.extend(service.user, user.user);

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
  service.isAuthenticated = function () {
    return USER_IS_AUTHENTICATED;
  }; 

  service.login = function (loginPromise) {
    console.log('logging in');

    loginPromise.success(handleLogin);

    console.log('logged in');
  };

  service.logout = function (logoutPromise) {

    if (!USER_TOKEN) {
      return;
    }

    console.log('logging out');

    $rootScope.loading = true;

    var outterService = this;

    logoutPromise.then(function successful () {

      setToken(null);

      // clears service.user
      console.log('resetting user model');

      outterService.user = {
        role : 'public'
      };

      $rootScope.loading = false;

      console.log('logged out');

    }, function rejected () {

      $rootScope.loading = false;
      
    });
  };

  service.resolvePendingState = function (userCheckPromise) {

    var checkUser = $q.defer(),
      outterService = this,
      pendingState = outterService.pendingStateChange;

    console.log('resolving pendingStateChange');

    userCheckPromise.success(handleLogin);

    userCheckPromise.then(function successful (response) {

      if (pendingState.to.accessLevel === undefined || pendingState.to.accessLevel === outterService.user.role) {

        console.log('page access granted in resolvePendingState for ' + pendingState.to.name);
        checkUser.resolve();

      } else {

        console.log('page access denied in resolvePendingState for ' + pendingState.to.name + ', redirect to error page');

        event.preventDefault();

        $rootScope.$emit('$statePermissionError');

        $state.go(ERROR_REDIRECT, { error: 'unauthorized' }, { 

          location: false, 
          inherit: false 

        });

        checkUser.reject('unauthorized');

      }
    }, function rejected (response) {

      console.log('authentication has expired, clear everything');

      setToken(null);

      service.user = { role: 'public' };

      if (pendingState.to.accessLevel === undefined || pendingState.to.accessLevel === outterService.user.role) {

        console.log('page access granted in resolvePendingState');
        checkUser.resolve();

      } else {

        console.log('page access denied in resolvePendingState, redirect to error page');

        event.preventDefault();

        $rootScope.$emit('$statePermissionError');

        $state.go(ERROR_REDIRECT, { error: 'unauthorized' }, { 

          location: false, 
          inherit: false 

        });

        checkUser.reject('unauthorized');

      }

    });

     outterService.pendingStateChange = null;

     return checkUser.promise;
  };

  initialCheckForLoginData();
  managePermissions();

  return service;

};

angular.module('booking.login-service', [])
  .service('LoginService', ['$http', '$rootScope', '$q', '$state', loginService]);