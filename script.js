var tweetId = 0;
var tweets;
var $body;

$(document).ready(function(){		
	$body = $('body');	
	var main_tweets = streams.home;
	var tweets = main_tweets;
	var selectedHome = true;
	var selectedTab = "Home";

	setTabName(selectedTab);

	loadTweets(tweets, $body, tweetId, function(x) {
		tweetId = x;
	});	

	$("div#refresh").click(function() {
		refresh();
	});		


	$('div.user').click(function(){
		selectedHome = false;		
		var user = $(this).text();
		selectedTab = user;
		setTabName(selectedTab);		
		var tweets = [];
		for(var i = 0; i < main_tweets.length; i++) {
			if("@"+main_tweets[i].user === user) {
				tweets.push(main_tweets[i]);
			}
		}
		tweetId = 0;
	})

	// setInterval(function(){
	// 	refresh();
	// }, 3000);
});

var loadTweets = function(tweets, $body, id, cb ){

	for(var i = id; i < tweets.length; i++) {
		var $div = $('<div class="tweet"></div>');

		var tweet = tweets[i];
	  var $tweet = $('<div class="message"></div>');
	  $tweet.text(tweet.message);
	  var $tweet_created_at = $('<div class="created_at"></div>');
	  $tweet_created_at.text(tweet.created_at);	  
	  var $user = $('<div class="user"></div>');
	  $user.text('@' + tweet.user);

	  $user.appendTo($div);	  
		$tweet_created_at.appendTo($div);	  
	  $tweet.appendTo($div);	      	  
	  $div.appendTo($body);    
	  id += 1;				  
	}
	cb(id);
}

var refresh = function() {
	loadTweets(tweets, $body, tweetId, function(x) {
		tweetId = x;
	});		
}

var setTabName = function(tabname) {
	$('div.tabname').text(tabname);
}
