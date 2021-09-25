module.exports = function(app) {
    var tweetRequestController = require('../controller/tweetRequestController');
  
    app.route('/tweetRequest/:tweetRequestId')
      .get(tweetRequestController.getTweetRequest)
      .delete(tweetRequestController.deleteTweetRequest);
  
    app.route('/tweetRequest')
      .post(tweetRequestController.createTweetRequest);

      app.route('/tweetRecentSearch')
      .get(tweetRequestController.relevantTweets);
  };