var app = angular.module("tensionApp", ["ngRoute", "firebase"]);

app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
}]);

app.config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "templates/list.html",
    controller: "ListCtrl",
    resolve: {
        "currentAuth": function($firebaseAuth) {
          return $firebaseAuth().$requireSignIn();
        }
    }
  })
  $routeProvider.when("/login", {
    templateUrl: "templates/login.html",
    controller: "LoginCtrl"
  });
  $routeProvider.when("/signup", {
    templateUrl: "templates/signup.html",
    controller: "SignupCtrl"
  });
  $routeProvider.when("/channel/:channelId", {
    templateUrl: "templates/channel.html",
    controller: "ChannelCtrl",
    resolve: {
        "currentAuth": function($firebaseAuth) {
          return $firebaseAuth().$requireSignIn();
        }
    }
  });
  
  $routeProvider.otherwise("/");
});

app.controller("HeaderCtrl", function($scope, $firebaseAuth, $location) {
  var auth = $firebaseAuth();
  $scope.logout = function() {
    console.log("log out");
    auth.$signOut();
    $location.path("/login");
  };
  
});

app.controller("ListCtrl", function(currentAuth, $scope, $firebaseObject) {
  $scope.curUser = currentAuth;
  var ref = firebase.database().ref().child('channels');
  $scope.channels = $firebaseObject(ref);
  
});

app.controller("LoginCtrl", function($scope, $firebaseAuth, $location) {
  $scope.authObj = $firebaseAuth();
  console.log('asdf');
  $scope.login = function() {
    console.log("do login");
    $scope.authObj.$signInWithEmailAndPassword($scope.email, $scope.password).then(function() {
      $location.path("/");
    });
    
    
  };
  
});

app.controller("SignupCtrl", function($scope, $firebaseAuth, $firebaseObject, $location) {
  $scope.authObj = $firebaseAuth();
  console.log('asdf');
  $scope.signUp = function() {
    $scope.authObj.$createUserWithEmailAndPassword($scope.email, $scope.password).then(function(firebaseUser) {
      var userRef = firebase.database().ref().child('users').child(firebaseUser.uid);
      var user = $firebaseObject(userRef);
      user.name = $scope.name;
      user.$save();
      
      $location.path("/");
    });
  };
  
});

app.controller("ChannelCtrl", function(currentAuth, $scope, $routeParams, $firebaseArray) {
  console.log(currentAuth);
  var ref = firebase.database().ref()
      .child('messages').child($routeParams.channelId);
  $scope.messages = $firebaseArray(ref);
  
  $scope.sendMessage = function() {
    $scope.messages.$add({
      sender: currentAuth.uid,
      text: $scope.newMessage,
      created_at: Date.now()
    });
    
    $scope.newMessage = "";
  };

});