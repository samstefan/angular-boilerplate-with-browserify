/*
 * Load module dependencies
 */

var _ = require('underscore')

module.exports = function ($http, model) {

  this.getOne = function (id, success, error) {
    $http.get('/api/' + model + '/' + id).success(success).error(error)
  }

  this.getAll = function (id, success, error) {
    $http.get('/api/' + model + '/').success(success).error(error)
  }

  this.save = function (data, success, error) {
    $http.post('/api/' + model, data).success(success).error(error)
  }

  this.update = function (data, id, success, error) {
    $http(
      { url: '/api/' + model + '/' + id
      , data: data
      , method: 'PATCH'
      }).success(success).error(error)
  }

  this.remove = function (id, success, error) {
    $http.delete('/api/' + model + '/' + id).success(success).error(error)
  }

  this.extend = function (properties) {
    properties = properties || {}
    _.extend(this, properties)
  }

  return this
}