module.exports = function(app) {
  require('./services/error-interceptor')(app)
  require('./services/notification')(app)
  require('./services/title')(app)
  require('./services/user')(app)
}