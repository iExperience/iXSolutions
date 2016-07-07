var app = angular.module('phoneBook',[]);

app.controller('PhoneCtrl', function($scope) {
  $scope.newItem = "";
  $scope.newItemQuantity = "";
  $scope.items = [];

  $scope.addItem = function() {
    var repeat = false;
    for(var i = 0; i < $scope.items.length; i++) {
      if($scope.items[i].name === $scope.newItem) {
        $scope.items[i].quantity = parseInt($scope.items[i].quantity,10) + parseInt($scope.newItemQuantity,10);
        repeat = true;
      }
    }
    if(!repeat) {
      var item = {
        "name": $scope.newItem, 
        "quantity": $scope.newItemQuantity,
        "isEditing": false
      };
      $scope.items.push(item);
      $scope.newItem = "";
      $scope.newItemQuantity = "";
    }
  }
  
  $scope.deleteItem = function(i) {
    $scope.items.splice(i, 1);
  };

  $scope.incQuantity = function(item) {
    console.log(item);
    item.quantity = parseInt(item.quantity,10) + 1;
  }

  $scope.decQuantity = function(item) {
    console.log(item);
    if(parseInt(item.quantity,10) - 1 >= 0)
      item.quantity = parseInt(item.quantity,10) - 1;
  }
  
  
});