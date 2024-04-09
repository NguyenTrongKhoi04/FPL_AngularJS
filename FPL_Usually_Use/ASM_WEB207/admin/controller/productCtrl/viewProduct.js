window.viewProduct = function ($scope, $http, $location, $routeParams) {

    var urlListProduct = "http://localhost:3000/listProduct" + "/" + $routeParams.id;
    console.log($routeParams.id);
    console.log(urlListProduct);

    $http.get(urlListProduct).then(function (response) {
        $scope.dataPro = response.data;
        if ($scope.dataPro.describe === "") {
            $scope.dataPro.describe = "Trống";
        }
        console.log(response.data);
    }).catch(function (error) {
        console.log("Lỗi hiện thị thông tin sản phẩm" + $routeParams.id);
        console.log(error);
    });
};