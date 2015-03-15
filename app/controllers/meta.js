module.exports = function(app) {

  /*
   * Meta controller
   */

  app.controller('metaCtrl', function($scope, title) {
    $scope.title = title
  })

}