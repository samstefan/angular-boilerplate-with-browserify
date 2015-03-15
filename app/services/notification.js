module.exports = function(app) {

  /*
   * Send a notification
   */

  app.factory('notification', ['$rootScope', function($rootScope) {
    return {
      send: function(notification) {
        $rootScope.$broadcast('notification', notification)
      }
    }
  }])

}