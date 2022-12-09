
$(document).ready(function () {

  const $tweetSection = $(".tweet-container");

  const renderTweets = function (tweets) {
    $tweetSection.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetSection.prepend($tweet);
    }
  };

  const loadTweets = () => {
    $.get("/tweets", (data) => {
      console.log("data from loadTweets:", data);
      renderTweets(data);
    });
  };

  loadTweets();

  const escape = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweetData) => {
    const $tweetData = $(`
      <article class="storedtweets">
        <div class="avataremail">
          <div class="tweeticon">
          <img width="40px" height="40px"
              src=${tweetData.user.avatars}>
          <p class="iconname">${tweetData.user.name}</p>
        </div>
          <div class="email">${tweetData.user.handle}</div>
        </div>
        <div class="prevtweetsborder">
          <div class="prevtweets">${escape(tweetData.content.text)}</div>
        </div>
        <div class="dateposted">
        <div class="date">${timeago.format(tweetData.created_at)}</div>
          <div class="icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i
            class="fa-solid fa-heart"></i></div>
        </div>
    `);
    return $tweetData;
  };

  const $form = $("#new-tweet-form");
  const $errorlong = $(".too-long");
  const $errornotext = $(".no-text");

  $(document).ready(() => {
    $errorlong.hide();
    $errornotext.hide();
  });

  $form.on("submit", (event) => {
    event.preventDefault();
    const tweetContent = $("#tweet-text").val();
    if (tweetContent.length === 0) {
      $errorlong.slideUp();
      return $errornotext.slideDown(600);
    }
    if (tweetContent.length > 140) {
      $errornotext.slideUp();
      return $errorlong.slideDown(600);
    } else
      $errorlong.slideUp(600);
      $errornotext.slideUp(600);
    
    const convertedFormData = $form.serialize();

    $.post("/tweets", convertedFormData, (data) => {
      console.log("data from /post eventlistner", data);
      loadTweets(); // GET
      $("#tweet-text").val("").attr("placeholder", "What are you humming about?");
      let tweetLength = (140 - $("#tweet-text").val().length); // below updates counter after post and clear
      const counter = $("#real-counter");
      counter.text(tweetLength);
    });
  });
});