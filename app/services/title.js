module.exports = function(app) {

  /*
   * Set header title
   */

  app.factory('title', function() {

    var title = document.title
    return {
      title: function() {
        return title
      }
    , setTitle: function(newTitle) {
        title = newTitle
      }
    }
  })

}