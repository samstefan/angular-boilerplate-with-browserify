module.exports = function(app) {
  require('./controllers/error')(app)
  require('./controllers/meta')(app)
  require('./controllers/header')(app)
  require('./controllers/home')(app)
  require('./controllers/sign-in')(app)
}