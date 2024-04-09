window.viewUserCtrl = function ($scope, $http, $location, $routeParams) {
    var urlUser = "http://localhost:3000/list_Account" + "/" + $routeParams.id;

    $scope.user;
    $http.get(urlUser).then(function (response) {
        $scope.user = response.data;
        console.log("Lấy thông tin sản phẩm thành công!");
    }).catch(function (error) {
        console.log("Lỗi lấy thông tin sản phẩm");
        console.log(error);
    });


}