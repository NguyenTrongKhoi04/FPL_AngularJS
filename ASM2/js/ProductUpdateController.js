window.ProductUpdateController = function (
  $scope,
  $http,
  $location,
  $routeParams
) {
  $scope.hi = "Tạm Biệt";
  const apiUrl = "http://localhost:3000/products";

  let id = $routeParams.id;

  $scope.getProductInfor = function () {
    $http
      .get(`${apiUrl}/${id}`)
      .then(function (res) {
        if (res.status == 200) {
          $scope.inputValue = {
            id: res.data.id,
            name: res.data.name,
            time: res.data.time,
            major: res.data.major,
            level: res.data.level,
            image: res.data.image,
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
      $http.put(`${apiUrl}/${id}`, newItem).then((res) => {
        if (res.status == 200) {
          console.log(45);
          alert("sửa thành công");
          $location.path("/home");
        }
      });
    }
  };
};
