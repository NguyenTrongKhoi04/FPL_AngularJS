window.UpdateController = function ($scope, $http, $location, $routeParams) {
  $scope.formatDate = function (event) {
    var key = event.keyCode || event.which;
    var dateInput = $scope.input.han_su_dung;
    if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
      if (dateInput.length === 2 || dateInput.length === 5) {
        $scope.input.han_su_dung += "/";
      }
    } else if (key === 8) {
      if (dateInput.length === 4 || dateInput.length === 7) {
        $scope.input.han_su_dung = dateInput.slice(0, -1);
      }
    } else {
      event.preventDefault();
    }
  };
  let apiUrl = "http://localhost:3000/products";

  let id = $routeParams.id;

  $scope.getDetail = function () {
    $http.get(`${apiUrl}/${id}`).then(function (res) {
      if (res.status == 200) {
        $scope.input = res.data;
      }
    });
  };

  $scope.getDetail();

  $scope.check = {
    gia: false,
  };

  $scope.onSubmit = function () {
    let flag = false;
    if (!$scope.input || !$scope.input.gia) {
      $scope.check.gia = true;
      flag = true;
    }

    if (!flag) {
      let newItem = {
        ...$scope.input,
      };
      $http.put(apiUrl + "/" + id, newItem).then(function (res) {
        alert("Sửa thành công");
        $location.path("/list-foods");
      });
    }
  };
};
