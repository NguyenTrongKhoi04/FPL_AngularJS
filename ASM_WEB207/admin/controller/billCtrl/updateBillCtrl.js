window.updateBillCtrl = function ($scope, $routeParams, $location, $http) {

    let idInvoice = $routeParams.id;
    let urlInvoice = "http://localhost:3000/invoice/" + idInvoice;



    $scope.in4 = [];
    $http.get(urlInvoice).then(function (response) {
        $scope.in4 = response.data;
        console.log($scope.in4);
        $scope.in4.trangThaiHoaDon;// Lưu giữ giá trị ban đầu của trạng thái
        $scope.initStatus = $scope.in4.trangThaiHoaDon; //Lưu lại trạng thái ban đầu

    }).catch(function (error) {
        console.log(error);
        console.log("Lỗi truy in4 Invoice");
    });

    $scope.updateInvoice = function () {
        console.log($scope.in4.trangThaiHoaDon);
        console.log($scope.initStatus);
        if (($scope.in4.trangThaiHoaDon != $scope.initStatus) && confirm("Bạn muốn cập nhật trạng thái hóa đơn")) { //Nếu khác trạng thái ban đầu --> cập nhật
            $http.patch(urlInvoice, $scope.in4).then(function (response) {
                alert("Cập nhật trạng thái hóa đơn thành công");
            }).catch(function (error) {
                console.log(error);
                console.log("Lỗi cập nhật trạng thái hóa đơn");
            });
        }
    }

};