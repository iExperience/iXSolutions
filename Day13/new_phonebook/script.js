var app = angular.module("NewPhoneApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "./sign_up.html",
    })
    .when("/phone_book", {
      templateUrl: "./phone_book.html"
    })
    .otherwise("/");
});

app.controller("SignUpCtrl", function($scope, $http) {
  // checks if an email is in proper form (students should have their own 
  // function to do this--we have a regular expression here)
  var isValidEmail = function(email) {
    return /^[\w0-9.]+@[\w0-9.]+\.[\w]+/.test(email);
  };
  
  // checks if a phone is in xxx-xxx-xxxx format (students should have their own 
  // function to do this--we have a regular expression here)
  var isValidPhone = function(phone) {
    return /^\d{3}-\d{3}-\d{4}$/.test(phone);
  };
  
  var isValidName = function(name) {
    return (name && name.length > 0);
  };
  
  var isValidPassword = function(password) {
    if(!password || password.length < 6) return false;
    return true;
  };
  
  var isValidRepeatPassword = function(password, repeatPassword) {
    return password === repeatPassword;
  };
  
  // handler that happens when form is submitted
  $scope.formSubmitted = function() {
    // reset the error message
    $scope.errorMessages = [];
    
    // check that all inputs are valid, and add to the
    // error message if they are not 
    var isFormValid = true;
    if(!isValidName($scope.name)) {
      $scope.errorMessages.push("Name cannot be left empty");
      isFormValid = false;
    }
    
    if(!isValidEmail($scope.email)) {
      $scope.errorMessages.push("Double check your email");
      isFormValid = false;
    } 
    
    if(!isValidPhone($scope.phone)) {
      $scope.errorMessages.push("Phone number must be in XXX-XXX-XXXX format");
      isFormValid = false;
    }
    
    if(!isValidPassword($scope.password)) {
      $scope.errorMessages.push("Make sure your password has at least 6 characters");
      isFormValid = false;
    }
    
    if(!isValidRepeatPassword($scope.password, $scope.passwordAgain)) {
      $scope.errorMessages.push("Make sure both passwords match");
      isFormValid = false;
    }
    
    if(isFormValid) {
      window.location = "#/phone_book";
    }
  };

});

app.controller("PhoneCtrl", function($scope) {
  $scope.newName = "";
  $scope.newNumber = "";
  $scope.people = [];

  $scope.addPerson = function() {
    if(isValidPhone($scope.newNumber) && isValidName($scope.newName)) {
      var person = {"name": $scope.newName, "number": $scope.newNumber};
      $scope.people.push(person);
      console.log(person);
      $scope.newName = "";
      $scope.newNumber = "";
    }
  }

  // checks if a phone is in xxx-xxx-xxxx format (students should have their own 
  // function to do this--we have a regular expression here)
  var isValidPhone = function(phone) {
    return /^\d{3}-\d{3}-\d{4}$/.test(phone);
  };

  var isValidName = function(name) {
    return (name && name.length > 0);
  };

  // handler that happens when form is submitted
  $scope.formSubmitted = function() {
    // reset the error message
    $scope.errorMessages = [];

    // check that all inputs are valid, and add to the
    // error message if they are not 
    var isFormValid = true;
    if(!isValidName($scope.name)) {
      $scope.errorMessages.push("Name cannot be left empty");
      isFormValid = false;
    }

    if(!isValidPhone($scope.phone)) {
      $scope.errorMessages.push("Phone number must be in XXX-XXX-XXXX format");
      isFormValid = false;
    }
  };

});
