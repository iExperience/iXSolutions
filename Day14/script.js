var app = angular.module("ChommiesApp", ["ngRoute"]);

var CHOMMIES_API_BASE = "http://ixchommies.herokuapp.com";
var CHOMMIES_API_TOKEN = "gabe1242";

app.config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "templates/feed.html"
  })
  $routeProvider.when("/me", {
    templateUrl: "templates/me.html"
  })
});

app.controller("FeedCtrl", function($scope, $http, $filter) {
  $scope.props = [];
  $scope.newProp = {};
  
  // get full feed of props
  $http({
    url: CHOMMIES_API_BASE + "/props",
    method: "GET",
    params: {
      token: CHOMMIES_API_TOKEN,
    },
  }).then(function(response) {
    console.log(response);
    $scope.props = response.data;
  });
  
  // get listing of brus
  $http({
    url: CHOMMIES_API_BASE + "/brus",
    method: "GET",
    params: {
      token: CHOMMIES_API_TOKEN,
    }
  }).then(function(response) {
    $scope.brus = response.data;
  });

  $scope.addProp = function() {
    // flag for the UI that we are currently submitting
    $scope.isSubmitting = true;
    
    // reset any error message that existed
    $scope.errorMessage = "";
    
    // submit prop to /props
    $http({
      url: CHOMMIES_API_BASE + "/props",
      method: "POST",
      params: {
        token: CHOMMIES_API_TOKEN,
        props: $scope.newProp.text,
        for: $scope.newProp.receiver.id
      },
    }).then(function(response) {
      // if successful, add to the list and clear form
      $scope.props.unshift(response.data);
      $scope.newProp = {}
    }).catch(function(response) {
      // if it failed, show the error from the API
      $scope.errorMessage = response.data.message;
    }).finally(function() {
      // we're done submitting
      $scope.isSubmitting = false;
    });
  }
});

app.controller("MeCtrl", function($scope, $http) {
  $scope.props = [];
  // request all my props from /props/me
  $http({
    url: CHOMMIES_API_BASE + "/props/me",
    method: "GET",
    params: {
      token: CHOMMIES_API_TOKEN,
    },
  }).then(function(response) {
    $scope.props = response.data;
  });
});