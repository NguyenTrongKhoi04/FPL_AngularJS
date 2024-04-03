window.ProductAddController = function ($scope, $http, $location) {
  $scope.hi = "Tạm Biệt";
  const apiUrl = "http://localhost:3000/products";
  // get = hiển thị toàn bộ, hiểm thị 1 bản ghi
  // post = thêm
  // put = sửa
  // delete = xóa
  $scope.Validate = {
    name: false,
    price: false,
  };
  $scope.onSubmit = () => {
    let flag = false;

    if (!$scope.inputValidate || !$scope.inputValidate.name) {
      $scope.Validate.name = true;
      flag = true;
    }
    if (!$scope.inputValidate || !$scope.inputValidate.name) {
      $scope.Validate.price = true;
      flag = true;
    }z
    if (flag == false) {
      newItem = { ...$scope.inputValidate };
      $http.post(apiUrl, newItem).then((res) => {
        if (res.status == 201) {
          console.log(45);
          $location.path("/product/list");
        }
      });
    }
  };
};
