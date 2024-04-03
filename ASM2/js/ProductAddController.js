window.ProductAddController = function ($scope, $http, $location) {
  $scope.hi = "Tạm Biệt";
  const apiUrl = "http://localhost:3000/products";
  // get = hiển thị toàn bộ, hiểm thị 1 bản ghi
  // post = thêm
  // put = sửa
  // delete = xóa
  $scope.checkData = {
    name: false,
    time: false,
    major: false,
    level: false,
    image: false,
    price: false,
  };
  $scope.onSubmit = () => {
    
    let flag = false;

    if (!$scope.inputValue || !$scope.inputValue.name) {
      $scope.checkData.name = true;
      flag = true;
    }

    if (
      !$scope.inputValue ||
      !$scope.inputValue.time ||
      $scope.inputValue.time < 15
    ) {
      $scope.checkData.time = true;
      flag = true;
    }

    if (!$scope.inputValue || !$scope.inputValue.major) {
      $scope.checkData.major = true;
      flag = true;
    }

    if (!$scope.inputValue || !$scope.inputValue.level) {
      $scope.checkData.level = true;
      flag = true;
    }

    if (!$scope.inputValue || !$scope.inputValue.image) {
      $scope.checkData.image = true;
      flag = true;
    }

    if (
      !$scope.inputValue ||
      !$scope.inputValue.price ||
      $scope.inputValue.time <= 0
    ) {
      $scope.checkData.price = true;
      flag = true;
    }

    // TODO ADD
    if (flag == false) {
      newItem = { ...$scope.inputValue };
      $http.post(apiUrl, newItem).then((res) => {
        if (res.status == 201) {
          console.log(45);
          alert("thêm thành công");
          $location.path("/home");
        }
      });
    }
  };
};