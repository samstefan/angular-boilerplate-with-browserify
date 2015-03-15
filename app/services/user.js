var routingConfig = require('./../lib/access-levels')
  , Crud = require('./../lib/crud')

function changeUser(user, currentUser) {
  angular.extend(currentUser, user)
}

module.exports = function(app) {

  app.factory('user', ['$http', '$rootScope', '$cookieStore', function($http, $rootScope, $cookieStore) {

    var accessLevels = routingConfig.accessLevels
      , userRoles = routingConfig.userRoles
      , currentUser = $cookieStore.get('user') || { email: '', role: userRoles.public }

    var userService = new Crud($http, 'user')

    userService.extend({

      /*
       * Authorize
       * Check if user is a authorized
       */

      authorize: function(accessLevel, role) {
        if (role === undefined) {
          role = currentUser.role
        }

        return accessLevel.bitMask & role.bitMask
      }

      /*
       * Is Logged In
       * Check if user is logged in
       */

    , isLoggedIn: function(user) {
        if (user === undefined) {
          user = currentUser
        }
        return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title
      }

      /*
       * Update User
       * Updates the user in the cookie
       */

    , updateUser: function (user) {
        changeUser(user, currentUser)
        $cookieStore.put('user', user)
        $rootScope.$broadcast('userUpdated', user)
      }

      /*
       * Sign In
       * Sends post to log the user in
       */

    , signIn: function(data, success, error) {
        $http.post('/api/auth/sign-in', data).success(function (user) {
          changeUser(user)
          $cookieStore.put('user', user)
          success(data)
        }).error(error)
      }

      /*
       * Sign Out
       * Sends post to log the user out and removes locally set cookie
       */

    , signOut: function(success, error) {
        $cookieStore.remove('user')
        $http.post('/api/auth/sign-out').success(success).error(error)
      }

      /*
       * Update Current User
       */

    , updateCurrentUser: function(user, success, error) {
        $http({
          url: '/api/user/current'
        , data: user
        , method: 'PATCH'
        })
        .success(success).error(error)
      }

      /*
       * Get Current
       * Gets the current user
       */

    , current: function (success, error) {
        $http.get('/api/user/current').success(success).error(error)
      }

    , accessLevels: accessLevels
    , userRoles: userRoles
    , getInfo: currentUser

    })

    return userService

  }])

}