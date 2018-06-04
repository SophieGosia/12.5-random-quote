const prefix = 'https://cors-anywhere.herokuapp.com/';
const tweetLink = 'https://twitter.com/intent/tweet?text=';
const quoteUrl = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

function getQuote() {
  $.getJSON(prefix + quoteUrl, createTweet);
  $.ajaxSetup({
    cache: false
  });
}

function createTweet(input) {
  const {
    title,
    content,
  } = input[0];

  const quote = $(content).text().trim();
  const author = title || 'Unknown author';

  const tweet = 'Quote of the day - ${quote} Author: ${author}';

  if (tweet.length > 140) {
    getQuote();
  } else {
    const href = tweetLink + encodeURIComponent(tweet);
    $('.quote').text(quote);
    $('.author').text(`Author: ${author}`);
    $('.tweet').attr('href', href);
  }
}

$(document).ready(function () {
  getQuote();
  $('.trigger').click(function () {
    getQuote();
  });
});
