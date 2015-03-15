module.exports = function(app) {

  /*
   * Error page controller
   */

  app.controller('errorCtrl', function($scope, $route, title) {

    var errorPage = {

      initialize: function() {
        // Set page title
        title.setTitle('404 Page not found | MyApp')
        // Set page to ready
        NProgress.done()
        // Set route for active page
        $scope.$route = $route
      }

    }

    errorPage.initialize()

  })

}