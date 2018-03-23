// var tweetId = 0;
// var tweets;
// var main_tweets;
// var $body;

$(document).ready(function(){		
	var $feed = $('div.feed');
	var main_tweets = streams;
	// var tweets = main_tweets;
	
	var selectedHome = true;
	var selectedTab = "Home";

	setTabName(selectedTab);

	loadTweets(main_tweets, $feed, selectedHome, selectedTab);	

	$("div#refresh").click(function() {
		loadTweets(main_tweets, $feed, selectedHome, selectedTab);
	});		

	$(document).on('click', '.user', function(){
		selectedHome = false;		
		var user = $(this).text();
		selectedTab = user;
		setTabName(selectedTab);		
		loadTweets(main_tweets, $feed, selectedHome, selectedTab);

		//tweetId = 0;
	})

	// setInterval(function(){
	// 	refresh();
	// }, 3000);
});

var loadTweets = function(tweets, feed, selectedHome, selectedTab){	
	feed.html('');
	var tweets = fetchTweets(tweets, selectedHome, selectedTab);

	for(var i = 0; i < tweets.length; i++) {
		var $div = $('<div class="tweet"></div>');

		var tweet = tweets[i];
	  var $tweet = $('<div class="message"></div>');
	  $tweet.text(tweet.message);
	  var $tweet_created_at = $('<div class="created_at"></div>');
	  $tweet_created_at.text(timeago().format(tweet.created_at));	  
	  var $user = $('<div class="user"></div>');

	  $user.text('@' + tweet.user);

	  $user.appendTo($div);	  
		$tweet_created_at.appendTo($div);	  
	  $tweet.appendTo($div);	      	  
	  $div.appendTo(feed); 		  
	}

}

var setTabName = function(tabname) {
	$('div.tabname').text(tabname);
}

var fetchTweets = function(tweets, selectedHome, selectedTab) {
	if(selectedHome) {
		return sortTweetsByCreatedAt(streams.home);
	} else {
		var userName = selectedTab.slice(1);
		return sortTweetsByCreatedAt(streams.users[userName]);
	}
}


var sortTweetsByCreatedAt = function(tweets) {
	var tweets = tweets.sort(function(a, b) {
	  if (a.created_at > b.created_at) {
	    return -1;
	  }
	  if (a.created_at < b.created_at){
	    return 1;
	  }
	  return 0;			
	});

	return tweets;
}


var tweet = function(message, user_name) {

}