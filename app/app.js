var modules =
  [ 'ngRoute'
  , 'ngAnimate'
  , 'ngSanitize'
  , 'ngCookies'
  , 'ui.select2'
  ]
  , app = angular.module('MyApp', modules)

app.run(['$rootScope', '$location', 'user', function ($rootScope, $location, user) {
  $rootScope.$on('$routeChangeStart', function (event, next) {
    // Start loading bar
    NProgress.start()
    // Check permissions
    if (!user.authorize(next.access)) {
      if (user.isLoggedIn()) {
        $location.path('/home')
      } else {
        $location.path('/sign-in')
      }
    }
  })

}])

require('./routes.js')(app)
require('./controllers.js')(app)
require('./services.js')(app)
require('./directives.js')(app)
