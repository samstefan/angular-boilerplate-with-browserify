module.exports = function(app) {

  /*
   * Register Submit
   * Submit the from to API to register the user
   */

  app.directive('signInSubmit', ['user', '$location', function(user, $location) {
    return function($scope, element, attrs) {
      element.bind('click', function(event) {
        event.preventDefault()
        var data = $scope.userDetails
        $scope.errors = ''

        user.signIn(data, function(response) {
          var protocol = window.location.protocol
            , host = window.location.host
          document.location.href = protocol + '//' + host
        }, function(error) {
          $scope.errors = 'Password or user name is incorrect'
        })
      })
    }
  }])

}