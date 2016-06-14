var app = angular.module('firstApp',[]);
app.controller('FormCtrl', function($scope) {
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
      $scope.showWelcomeMessage = true;
    }
  };
  
});