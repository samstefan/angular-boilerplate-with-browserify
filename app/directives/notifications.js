/*
 * Private functions
 */

function asyncForEach(array, fn, callback) {
  array = array.slice(0)
  function processOne() {
    var item = array.pop()
    fn(item, function() {
      if (array.length > 0) {
        setTimeout(processOne, 0)
      } else {
        callback()
      }
    })
  }
  if (array.length > 0) {
    setTimeout(processOne, 0)
  } else {
    callback()
  }
}

module.exports = function(app) {

  /*
   * Notifications template / controller
   * The template and controller for notifications widget
   */

  app.directive('notifications', function() {
    return {
      restrict: 'E'
    , templateUrl: '/templates/notifications'
    , controller: [ '$scope', function ($scope) {
        var notificationQueue = []
          , queueRunning = false
        $scope.notification = {}

        // listen for notifications
        $scope.$on('notification', function(event, notification) {
          notificationQueue.push(notification)
        })

        setInterval(runQueue, 100)

        function runQueue() {
          if (notificationQueue.length > 0 && !queueRunning) {
            queueRunning = true
            asyncForEach(notificationQueue, function(item, callback) {
              showNotification(item, function() {
                callback()
                notificationQueue.shift()
              })
            }, function() {
              queueRunning = false
            })
          }
        }

        function showNotification (notification, callback) {
          $scope.notification = notification
          $scope.$apply()
          // Hide after 1.5s
          setTimeout(function(){
            $scope.notification = {}
            $scope.$apply()
            // This delay is for the animation timings
            setTimeout(function(){
              callback()
            },700)
          },2500)
        }
      }]
    }
  })
}