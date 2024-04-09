window.listBillCtrl = function ($scope, $http, $location) {

    //Lấy db về thui :>>
    let urlInvoice = "http://localhost:3000/invoice";

    $http.get(urlInvoice).then(function (response) {
        $scope.data = response.data;
        console.log($scope.data);
        console.log( typeof $scope.data);
        console.log("Lấy danh sách hóa đơn thành công r nhé :>> hihii");

    }).catch(function (error) {
        console.log(error);
        console.log("Lỗi lấy danh sách hóa đơn");
    });

    $scope.delete = function (idInvoice) {//Xóa hóa đơn dựa vào ID Hóa Đơn
        if (confirm("Bạn chắc chắn xóa hóa đơn " + idInvoice)) {
            $http.delete(urlInvoice + "/" + idInvoice).then(function (response) {
                alert("Xóa hóa đơn " + idInvoice + " thành công");
            }).catch(function (error) {
                console.log(error);
                console.log("Lỗi xóa hóa đơn " + idInvoice);
            });
        }
    }

}