module.exports = function(app) {

  /*
   * Home Controller
   */

  app.controller('homeCtrl', function($scope, title, user) {

    var homePage = {

      initialize: function() {
        // Set page title
        title.setTitle('Home | MyApp')
      }

    }

    homePage.initialize()

  })

}