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

app.config(function($routeProvider, $locationProvider) {
  $routeProvider.when("/login", {
    templateUrl: "templates/login.html",
    controller: "LoginCtrl"
  });
  $routeProvider.when("/signup", {
    templateUrl: "templates/signup.html",
    controller: "SignupCtrl"
  });
  $routeProvider.when("/", {
    templateUrl: "templates/list.html",
    controller: "ListCtrl",
    resolve: {
        "currentAuth": function($firebaseAuth) {
          return $firebaseAuth().$requireSignIn();
        }
    }
  })
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

app.directive("fileread", function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                    // or all selected files:
                    // scope.fileread = changeEvent.target.files;
                });
            });
        }
    }
});

app.controller("ChannelCtrl", function(currentAuth, $scope, $routeParams, $firebaseObject, $firebaseArray) {
  console.log(currentAuth);
  var ref = firebase.database().ref()
      .child('messages').child($routeParams.channelId);
  $scope.messages = $firebaseArray(ref);
  
  var usersRef = firebase.database().ref()
      .child('users');
  $scope.users = $firebaseObject(usersRef);
  
  $scope.sendMessage = function() {
    var imgRef = firebase.storage().ref().child($scope.newMessage.image.name);
    var uploadTask = imgRef.put($scope.newMessage.image)// Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, function(error) {
      console.log(error);
    }, function() {
      // Upload completed successfully, now we can get the download URL
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log("Download", downloadURL, $scope.newMessage);
      $scope.messages.$add({
        sender: currentAuth.uid,
        text: $scope.newMessage.text,
        image: downloadURL,
        created_at: Date.now()
      });
    });
    
  };

});