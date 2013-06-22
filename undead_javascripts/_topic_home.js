$.scrollTo(0,0);

$(".topic_promote").click(__.prevent(function() {
  Dialog.TopicsFeed.open();
}));

__topics.setup_with(View.TopicMessagesListTimeline,{tweet_template: View.TweetTopic, count: __count});

window.onload=function() {$.scrollTo(0,0);}