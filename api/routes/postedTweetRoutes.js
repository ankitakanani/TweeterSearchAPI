module.exports = function(app) {
    var postedTweetController = require('../controller/postedTweetController');
  
    app.route('/postedTweet')
      .post(postedTweetController.createPostedTweet);
  };