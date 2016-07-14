var app = angular.module('moviegifApp', ['ngSanitize','ngRoute']); 
var MASHAPE_KEY = "eZvbygxTuOmshDE1INfsJpAwsMqAp1WsylWjsnoEBubIyhFUI1";
var GIPHY_KEY = "dc6zaTOxFJmzC";

var GIPHY_API_BASE = "http://api.giphy.com/v1/";
var OMDB_API_BASE = "http://www.omdbapi.com/";

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    controller: 'MainCtrl',
    templateUrl: 'templates/home.html',
  });
  $routeProvider.when('/movie/:movieId', {
    controller: 'MovieCtrl',
    templateUrl: 'templates/movie.html',
  });
  
  
  $routeProvider.otherwise('/');
});

app.controller('MainCtrl', function($scope, $http, $location) {
  var loadMovies = function() {
    $http({
      url: OMDB_API_BASE,
      params: {
        s: $scope.searchTerm,
        page: $scope.page
        
      },
      method: 'GET',
    }).then(function(response) {
      $scope.movies = response.data.Search;
      $scope.total = parseInt(response.data.totalResults);
      if(response.data.Error) {
        $scope.movies = response.data;
      }
      console.log(response);
    });
  };
  $scope.searchTerm = $location.search()['s'];
  $scope.page = parseInt($location.search()['page']);
  
  if(!$scope.page) {
    $scope.page = 1;
  }
  
  if($scope.searchTerm) {
    loadMovies();
  }
  
  $scope.doSearch = function() {
    $scope.page = 1;
    $location.search('s', $scope.searchTerm);
    $location.search('page', $scope.page);
    loadMovies();
  };
  
  $scope.prevPage = function() {
    $scope.page -= 1;
    $location.search('page', $scope.page);
    loadMovies();
  };
  $scope.nextPage = function() {
    $scope.page += 1;
    $location.search('page', $scope.page);
    loadMovies();
  };
  
});

app.controller('MovieCtrl', function($scope, $http, $routeParams, $window) {
  $http({
    url: OMDB_API_BASE,
    params: {
      i: $routeParams.movieId
    },
    method: 'GET',
  }).then(function(response) {
    // look at the data! might be different
    console.log(response);
    return $scope.movie = response.data
  }).then(function() {
    return $http({
      url: GIPHY_API_BASE + "gifs/search",
      params: {
        api_key: GIPHY_KEY,
        q: $scope.movie.Plot
      },
    });
  }).then(function(response) {
    console.log(response);
    $scope.gifs = response.data.data;
  });
  
  $scope.goBack = function() {
    $window.history.back();
  };
});
