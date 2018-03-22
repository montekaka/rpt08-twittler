$(document).ready(function(){
	var $body = $('body');
	//$body.html('');
	var tweets = streams.home;
	var tweetId = 0;
	loadTweets(tweets, $body, tweetId, function(x) {
		tweetId = x;
	});	
});

var loadTweets = function(tweets, $body, id, cb ){

	for(var i = id; i < tweets.length; i++) {
		var tweet = tweets[i];
	  var $tweet = $('<div></div>');
	  $tweet.text('@' + tweet.user + ': ' + tweet.message);
	  $tweet.appendTo($body);     
	  id += 1;			
	}
	cb(id);
}

