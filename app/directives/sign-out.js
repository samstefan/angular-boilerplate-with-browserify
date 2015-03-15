module.exports = function(app) {

  /*
   * User Sign Out
   * Logs the user out
   */

  app.directive('signOut', ['$location', 'user', function($location, user) {
    return function($scope, element) {
      element.bind('click', function(event) {
        event.preventDefault()
        user.signOut(function(){
          var protocol = window.location.protocol
            , host = window.location.host

          document.location.href = protocol + '//' + host
        })
      })
    }
  }])

}