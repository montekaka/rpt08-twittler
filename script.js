// var tweetId = 0;
// var tweets;
// var main_tweets;
// var $body;

$(document).ready(function(){		
	var $feed = $('div.feed');		
	var main_tweets = streams.home;
	// var tweets = main_tweets;
	
	var selectedHome = true;
	var selectedTab = "Home";

	setTabName(selectedTab);

	loadTweets(main_tweets, $feed);	

	$("div#refresh").click(function() {
		if(selectedHome) {		
			loadTweets(main_tweets, $feed);
		}	else {
			var tweets = filterTweetOnUser(main_tweets, selectedTab);
			loadTweets(tweets, $feed);			
		}	
	});		

	$(document).on('click', '.user', function(){
		selectedHome = false;		
		var user = $(this).text();
		selectedTab = user;
		setTabName(selectedTab);		
		var tweets = filterTweetOnUser(main_tweets, user);
		loadTweets(tweets, $feed);

		//tweetId = 0;
	})

	// setInterval(function(){
	// 	refresh();
	// }, 3000);
});

var loadTweets = function(tweets, feed){	
	feed.html('');
	var tweets = sortTweetsByCreatedAt(tweets);

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

var filterTweetOnUser = function(main_tweets, user_name){
	var user_tweets = [];
	for(var i = 0; i < main_tweets.length; i++) {
		if("@"+main_tweets[i].user === user_name) {
			user_tweets.push(main_tweets[i]);
		}
	}
	return user_tweets;
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
