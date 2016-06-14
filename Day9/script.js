$(document).ready(function() {
  var url = "https://api.nytimes.com/svc/topstories/v2/opinion.json";
  var key = "f22d436400ff477a9ea8571b8bf7a9f1";
  $.ajax({
    url: url + "?api-key=" + key,
    method: 'GET',
  }).done(function(response) {
    console.log("done!", response);
    displayResults(response.results);
  }).fail(function(err) {
    throw err;
  });

  $(".search").keypress(function(e) {
    var key = e.keyCode;
    if(key === 13) {
      console.log("value", e.currentTarget.value);
      var searchTerm = e.currentTarget.value;
      var searchURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
      searchURL += '?' + $.param({
        'api-key': "f22d436400ff477a9ea8571b8bf7a9f1",
        'q': searchTerm
      });
      $.ajax({
        url: searchURL,
        method: 'GET',
      }).done(function(response) {
        console.log("done!", response);
        searchResults(response.response.docs);
      }).fail(function(err) {
        throw err;
      });
    }
  });
});

function searchResults(results) {
  $("#list").html("");
  console.log("search", results);
  for (var i = 0; i<results.length; i++) {
    var res = results[i];
    var div = $("<div></div>"); // Containing div
    div.addClass("article");
    var p = $("<p></p>"); // Title with link
    var a = $("<a></a>");
    a.html(res["headline"]["main"]);
    a.attr("href", res["web_url"]);
    a.attr("target", "_blank");
    var span = $("<span></span>"); // Byline
    span.html(res["byline"]["original"]);
    span.addClass("byline");
    // Tie it all together
    p.append(a);
    div.append(p).append(span);
    $("#list").append(div);
  }
}

function displayResults(results) {
  for (var i = 0; i<results.length; i++) {
    var res = results[i];
    var div = $("<div></div>"); // Containing div
    div.addClass("article");
    var p = $("<p></p>"); // Title with link
    var a = $("<a></a>");
    a.html(res["title"]);
    a.attr("href", res["url"]);
    a.attr("target", "_blank");
    var span = $("<span></span>"); // Byline
    span.html(res["byline"]);
    span.addClass("byline");
    // Tie it all together
    p.append(a);
    div.append(p).append(span);
    $("#list").append(div);
  }
}