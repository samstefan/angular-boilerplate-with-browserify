module.exports = function(app) {

  /*
   * Sign In Controller
   */

  app.controller('signInCtrl', function(title) {
    var signInPage = {

      initialize: function() {
        // Set page title
        title.setTitle('Sign in | MyApp')
        // Set page to ready
        NProgress.done()
      }

    }

    signInPage.initialize()
  })

}