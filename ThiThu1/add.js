window.AddController = function ($scope, $http, $location) {
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
  const apiUrl = "http://localhost:3000/products";
  $scope.check = {
    gia: false,
  };

  $scope.onSubmit = function () {
    let flag = false;
    if (!$scope.input || !$scope.input.gia || !$scope.input.gia>100) {
      $scope.check.gia = true;
      flag = true;
    }

    if (!flag) {
      let newItem = {
        ...$scope.input,
      };
      $http.post(apiUrl, newItem).then(function (res) {
          if (res.status == 201) {
              alert("thêm thành công");
          $location.path("/list-foods");
        }
      });
    }
  };
};
