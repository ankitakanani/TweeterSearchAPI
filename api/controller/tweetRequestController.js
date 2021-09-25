var tweetRequestDatabase = require('../database/tweetRequestDatabase');
var Twitter = require('twitter');
const config=require('../../config')
const PaginationController = require('./paginationController')
const  googleIt = require('google-it')

exports.getTweetRequest = function(req, res) {
  var tweetRequestId = req.params.tweetRequestId;
  tweetRequestDatabase.selectTweetRequest(tweetRequestId, function(tweetRequest) {
    res.json(tweetRequest);
  });
};

exports.createTweetRequest = function(req, res) {
  var tweetRequest = {
    device_token: req.body.device_token,
    hashtags: req.body.hashtags
  };
  tweetRequestDatabase.insertTweetRequest(tweetRequest, function(tweetRequest) {
    res.json(tweetRequest);
  });
};
exports.relevantData = function(req, res) {
  googleIt({'query': 'covfefe irony','diagnostics': 'true'}).then(results => {
    // access to results object here
    console.log("cvbjsdbc")
    res.json(results)
  }).catch(e => {
    console.log(e)
    resp.json(e)
    // any possible errors that might have occurred (like no Internet connection)
  })
  
};
exports.relevantTweets = async function(req, resp) {
    var client = new Twitter({
      consumer_key:config.TWITTER_APP_API_KEY,
      consumer_secret: config.TWITTER_APP_API_SECRET,
      bearer_token: config.TWITTER_APP_BEARER_TOKEN
    });
    let response = await  client.get('search/tweets', 
    PaginationController.setPaginationParams({q: '#ios #swift',count:2,
    // "refresh_url":"?since_id=1401385979831803905&q=%23ios%20%23swift&include_entities=1", //refresh the search(newer tweets) 
    "next_results":"?max_id=1401324807841476610&q=%23ios%20%23swift&count=2&include_entities=1" //the next tweets(older),
  }));
  // Filter tweets to fit our schema
  // let tweets = await FilterTweets(response.statuses);
  resp.json({tweets:response.statuses, search_metadata: response.search_metadata}) ;
},

exports.deleteTweetRequest = function(req, res) {
  var tweetRequestId = req.params.tweetRequestId;
  tweetRequestDatabase.deleteTweetRequest(tweetRequestId, function() {
    res.status(200).end();
  });
}