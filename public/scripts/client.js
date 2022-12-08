/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { response } = require("express");

$(document).ready(function () {

  // Test / driver code (temporary). Eventually will get this from the server.
  // const tweetData = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      const $tweetSection = $(".tweet-container")
      $tweetSection.prepend($tweet);
    }
  }

  const loadTweets = () => {
    $.get("/tweets", (data) => {
      console.log("data from loadTweets:", data);
      renderTweets(data);
    })
  };

  loadTweets();

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
          <div class="prevtweets">${tweetData.content.text}</div>
        </div>
        <div class="dateposted">
        <div class="date">${timeago.format(tweetData.created_at)}</div>
          <div class="icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i
            class="fa-solid fa-heart"></i></div>
        </div>
    `);
    return $tweetData;
  };
  // const $tweet = createTweetElement(tweetData);
  // renderTweets(tweetData);


  const $form = $("#new-tweet-form");

  $form.on("submit", (event) => {
    event.preventDefault();
    const tweetContent = $("#tweet-text").val();
    if (tweetContent.length === 0) {
      return alert("nothing to tweet. start typing");
    }
    if (tweetContent.length > 140) {
      return alert("tweet content way too long. pls keep it at 140 characters or less")
    }
    const convertedFormData = $form.serialize();
    $.post("/tweets", convertedFormData, (data) => {
      console.log("data from /post eventlistner", data);
      loadTweets(); // GET
    })
  });


  // $.post("/tweets", convertedFormData, (response) => {
  //   console.log(response);
  // });

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});