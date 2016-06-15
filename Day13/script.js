var app = angular.module("RouterApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "templates/top.html",
    })
    .when("/search", {
      templateUrl: "templates/search.html"
    })
    .otherwise("/");
});

app.controller("TopStoriesCtrl", function($scope, $http) {
  var url = "https://api.nytimes.com/svc/topstories/v2/opinion.json" +
    "?api-key=6c1830c231564612bbf5484ce7933e27"
  $scope.articles = [];
  $http({
    method: "GET",
    url: url
  }).then(function(response) {
    $scope.articles = response.data.results;
  });
});

app.controller("SearchCtrl", function($scope, $http) {
  //$scope.searchTerm = "";
  $scope.search = function() {
    console.log("search clicked");
    var url = "https://api.nytimes.com/svc/topstories/v2/opinion.json" +
    "?api-key=6c1830c231564612bbf5484ce7933e27"
    $scope.articles = [];
    $http({
      method: "GET",
      url: url
    }).then(function(response) {
      $scope.articles = response.data.results;
    });
  };

});

