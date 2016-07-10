var app = angular.module('Instamood',[]);

app.controller('MainCtrl', function($scope, $http) {
	
	$scope.hasToken = true;
	var token = window.location.hash;
	console.log(token);
  if (!token) {
    $scope.hasToken = false;
  }
  token = token.split("=")[1];

  $scope.getInstaPics = function() {
	  var INSTA_API_BASE_URL = "https://api.instagram.com/v1";
	  var path = "/users/self/media/recent";
	  var mediaUrl = INSTA_API_BASE_URL + path;
	  $http({
	    method: "JSONP",
	    url: mediaUrl,
	    params: {
	    	access_token: token,
	    	callback: "JSON_CALLBACK"
	    }
	  }).then(function(response) {
	  	showInstaPics(response);
	  	analyzeSentiments(response);
	  })
	};

	var showInstaPics = function(response) {
		$scope.picArray = response.data.data;
	}

	var analyzeSentiments = function(response) {
		var allPics = response.data.data;
		$scope.picScores = [];
		angular.forEach(allPics, function(value, key) {
			var caption = value.caption.text;
			var SENTIMENT_API_BASE_URL = "https://twinword-sentiment-analysis.p.mashape.com/analyze/";
			$http({
				method: "GET",
				url: SENTIMENT_API_BASE_URL,
				headers: {
        	"X-Mashape-Key": "H0IoG8ybyymshvm2IlQmwZk8Vlqlp1KD3F2jsn2RLpghqszsGI"
      	},
      	params :{
      		text: caption
      	}
			}).then(function(response) {
				$scope.picScores[key] = response.data.score;
			})
		})
	}


});
