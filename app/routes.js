/*
 * Module dependencies
 */

var routingConfig = require('./lib/access-levels')

module.exports = function(app) {
  app.config(
    [ '$routeProvider'
    , '$locationProvider'
    , '$httpProvider'
    , function($routeProvider, $locationProvider, $httpProvider){

    var access = routingConfig.accessLevels

    $routeProvider

      /*
       * Home
       * @route /
       */

      .when('/',
        { templateUrl: '/templates/home'
        , controller: 'homeCtrl'
        , access: access.anon
        }
      )

      /*
       * Sign In
       * @route /sign-in
       */

      .when('/sign-in',
        { templateUrl: '/templates/sign-in'
        , controller: 'signInCtrl'
        , access: access.anon
        }
      )

      /*
       * 404 Page
       */

      .otherwise(
        { templateUrl: '/templates/404'
        , controller: 'errorCtrl'
        , activePage: '404'
        , access: access.public
        }
      )

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })

    $httpProvider.interceptors.push('errorInterceptor')
  }])
}