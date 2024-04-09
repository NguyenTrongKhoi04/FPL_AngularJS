window.AddController = function ($route, $http, $scope) {
  $scope.onSubmit = function () {
    alert("xin chào");
  };
  $scope.inputValue = { hang: null };
  $scope.inputValue.hang = "SamSung";
};
