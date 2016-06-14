var app = angular.module('phoneBook',[]);

app.controller('PhoneCtrl', function($scope) {

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

    if(isFormValid) {
      $scope.showWelcomeMessage = true;
    }
  };
  
});