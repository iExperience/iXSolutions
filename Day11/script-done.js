var app = angular.module('nytimesApp', ['ngSanitize','ngRoute']); 
var NY_TIMES_API_KEY = '3e1aa1873f764e5d89c73e8eb0b27d9c';

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    controller: 'MainCtrl',
    templateUrl: 'templates/home-done.html',
  });
  $routeProvider.when('/petition/:petitionId', {
    controller: 'PetitionCtrl',
    templateUrl: 'templates/petition-done.html',
  });
  
  $routeProvider.otherwise('/');
});

app.controller('MainCtrl', function($scope, $http) {
  $http({
    url: 'https://api.whitehouse.gov/v1/petitions.json',
    params: {
      "sortBy": "DATE_REACHED_PUBLIC",
      "sortOrder": "DESC",
    },
    method: 'GET',
  }).then(function(response) {
    // look at the data! might be different
    $scope.petitions = response.data.results;
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
