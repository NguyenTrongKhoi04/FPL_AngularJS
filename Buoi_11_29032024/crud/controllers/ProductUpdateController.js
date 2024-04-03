window.ProductUpdateController = function ($scope, $http, $routeParams, $location) {
  let apiUrl = "http://localhost:3000/products";

  let id = $routeParams.id;

  $scope.getProductInfor = function () {
    $http
      .get(`${apiUrl}/${id}`)
      .then(function (res) {
        if (res.status == 200) {
          $scope.model = res.data;
          $scope.inputValue = {
            name: res.data.name,
            price: res.data.price,
          };
        }
      })
      .catch(function (err) {
        $scope.message = `${err.statusText} product with id ${id}`;
      });
  };

  $scope.getProductInfor();

  $scope.checkData = {
    name: false,
    price: false,
  };

  $scope.onSubmit = function () {
    let flag = false;

    if (!$scope.inputValue || !$scope.inputValue.name) {
      $scope.checkData.name = true;
      flag = true;
    } else {
      $scope.checkData.name = false;
    }

    if (!$scope.inputValue || !$scope.inputValue.price) {
      $scope.checkData.price = true;
      flag = true;
    } else {
      $scope.checkData.price = false;
    }

    if (!flag) {
      let updateItem = {
        ...$scope.inputValue,
      };

      $http.put(`${apiUrl}/${id}`, updateItem).then(function (res) {
        if (res.status == 200) {
          $location.path("/product/list");
        }
      });
    }
  };
};
