var tweetId = 0;
var tweets;
var $body;

$(document).ready(function(){		
	$body = $('body');	
	tweets = streams.home;
	loadTweets(tweets, $body, tweetId, function(x) {
		tweetId = x;
	});	

	$("div#refresh").click(function() {
		console.log('hi')
		refresh();
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

var refresh = function() {
	
	loadTweets(tweets, $body, tweetId, function(x) {
		tweetId = x;
	});		
}