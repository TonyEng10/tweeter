$(document).ready(function () {
  const counter = $("#real-counter");

  $("#tweet-text").on("keypress", function () {
    let tweetLength = (140 - this.value.length);
    counter.text(tweetLength);
    if (tweetLength <= 0) {
      $("output").removeClass("counter noClass").addClass("redcounter");
    }
  })
  
  $("#tweet-text").on("keyup", function () {
    let tweetLength = (140 - this.value.length);
    counter.text(tweetLength);
    if (tweetLength >= 0) {
      $("output").removeClass("redcounter noClass").addClass("counter");
    }
  })
  });

