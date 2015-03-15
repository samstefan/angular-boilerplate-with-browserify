module.exports = function(app) {

  /*
   * Error Interceptor
   */

  app.factory('errorInterceptor', ['$q', '$rootScope', '$location',
    function ($q, $rootScope, $location) {

      return {

        request: function (config) {
          return config || $q.when(config)
        }

      , requestError: function(request){
          return $q.reject(request)
        }

      , response: function (response) {
          return response || $q.when(response)
        }

      , responseError: function (response) {
          if (response.config.url.search('api') === -1) {
            if (response && response.status === 403) {
              var protocol = window.location.protocol
                , host = window.location.host
              document.location.href = protocol + '//' + host
            }

            if (response && response.status === 404) {
              $location.path('/not-found')
            }
          } else {
            return $q.reject(response)
          }
        }

      }
    }
  ])

}