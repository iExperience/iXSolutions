var app = angular.module('petitionsApp', ['ngSanitize','ngRoute']); 
var NY_TIMES_API_KEY = '3e1aa1873f764e5d89c73e8eb0b27d9c';

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    controller: 'MainCtrl',
    templateUrl: 'templates/home.html',
  });
  
  $routeProvider.when('/petition/:petitionId', {
    controller: 'PetitionCtrl',
    templateUrl: 'templates/petition.html',
  });
  
  $routeProvider.when('/response/:responseId', {
    controller: 'ResponseCtrl',
    templateUrl: 'templates/response.html',
  });
  
  
  $routeProvider.otherwise('/');
});

app.controller('MainCtrl', function($http, $scope) {
  $http({
    url: 'https://api.whitehouse.gov/v1/petitions.json',
    params: {
      "sortBy": "DATE_REACHED_PUBLIC",
      "sortOrder": "DESC",
    },
    method: 'GET',
  }).then(function(aldkjasdf) {
    // look at the data! might be different
    $scope.petitions = aldkjasdf.data.results;
  });
  
  $http({
    url: 'https://api.whitehouse.gov/v1/responses.json',
    params: {
    },
    method: 'GET',
  }).then(function(response) {
    console.log(response);
    $scope.responses = response.data.results;

  });
  
});

app.controller('ResponseCtrl', function($scope, $http, $routeParams) {
  $http({
    url: 'https://api.whitehouse.gov/v1/responses/'+$routeParams.responseId+'.json',
    method: 'GET',
  }).then(function(response) {
    // look at the data! might be different
    $scope.response = response.data.results[0];
    console.log($scope.response);
    $http({
      url: 'https://api.whitehouse.gov/v1/petitions.json',
      params: {
        "responseId": $scope.response.id
      },
      method: 'GET',
    }).then(function(response) {
      // look at the data! might be different
      $scope.petitions = response.data.results;
    });
  });
});

app.controller('PetitionCtrl', function($scope, $http, $routeParams) {
  $http({
    url: 'https://api.whitehouse.gov/v1/petitions/'+$routeParams.petitionId+'.json',
    method: 'GET',
  }).then(function(response) {
    // look at the data! might be different
    $scope.petition = response.data.results[0]
  });
});
