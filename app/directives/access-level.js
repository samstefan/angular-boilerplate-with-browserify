module.exports = function(app) {

  /*
   * Access Level
   * Shows and hides content base on user access level
   */

  app.directive('accessLevel', ['$rootScope', 'user', function($rootScope, Auth) {

    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        var prevDisp = element.css('display')
          , userRole
          , accessLevel

        $scope.user = Auth.user

        $scope.$watch('user', function(user) {
          if (user.role) {
            userRole = user.role
          }
          updateCSS()
        }, true)

        attrs.$observe('accessLevel', function(al) {

          var access = routingConfig.accessLevels

          switch (al) {

          case 'admin':
            accessLevel = access.admin
            break;
          case 'user':
            accessLevel = access.user
            break;
          case 'public':
            accessLevel = access.public
            break;
          case 'anon':
            accessLevel = access.anon
            break;
          }

          updateCSS()
        })

        function updateCSS() {
          if (userRole && accessLevel) {
            if (!Auth.authorize(accessLevel, userRole)) {
              element.css('display', 'none')
            } else {
              element.css('display', prevDisp)
            }
          }
        }
      }
    }
  }])

}