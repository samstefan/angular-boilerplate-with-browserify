module.exports = function(app) {
  require('./directives/access-level')(app)
  require('./directives/notifications')(app)
}