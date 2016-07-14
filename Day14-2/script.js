var app = angular.module("ChommiesApp", ["ngRoute"]);

var CHOMMIES_API_BASE = "http://ixchommies.herokuapp.com";
var CHOMMIES_API_TOKEN = "77a4f045e0dde06bfd0060b12f9def12";

app.config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "templates/feed.html"
  })
  $routeProvider.when("/me", {
    templateUrl: "templates/me.html"
  })
});

app.controller("AppCtrl", function($scope) {
  $scope.showMe = true
  $scope.$on('$routeChangeSuccess', function(event, route) { 
    if(route.$$route.originalPath == "/me") {
      $scope.showMe = false;
    } else {
      $scope.showMe = true;
    }
  });
  
});

app.controller("FeedCtrl", function($scope, $http, $filter) {
  $scope.isSending = false;
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
    $scope.isSending = true;
    $scope.errorMessage = "";
      
    // submit prop to /props
    $http({
      url: CHOMMIES_API_BASE + "/props",
      method: "POST",
      params: {
        token: CHOMMIES_API_TOKEN,
      },
      data: {
        props: $scope.newProp.text,
        for: $scope.newProp.receiver
      },
    }).then(function(response) {
      // if successful, add to the list and clear form
      $scope.props.unshift(response.data);
      $scope.newProp = {}
    }).catch(function(response) {
      console.log(response);
      $scope.errorMessage = response.data.message;
    }).finally(function() {
      $scope.isSending = false;
    });
  }
});

app.controller("MeCtrl", function($scope, $http) {
  $scope.props = undefined;
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