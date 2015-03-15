module.exports = function(app) {

  /*
   * Header controller
   */

  app.controller('headerCtrl', function($scope, user) {
    $scope.user = user.getInfo
    $scope.prfileImage = 'http://www.gravatar.com/avatar/' + md5($scope.user.email) + '?s=200'
    $scope.$on('userUpdated', function(event, user) {
      $scope.user = user
    })
  })

}