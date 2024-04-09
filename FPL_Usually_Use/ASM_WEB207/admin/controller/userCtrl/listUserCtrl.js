window.listUserCtrl = function ($scope, $http, $location) {

    /* 
        STT
        ID
        Tên Đăng Nhập
        email 
        số điện thoại
        giới tính
        mật khẩu
        ảnh người dùng (trên PC)
    */
    var urlListUser = "http://localhost:3000/list_Account";
    $scope.listUser;
    $http.get(urlListUser).then(function (response) {
        $scope.listUser = response.data;
        console.log("load dữ liệu người dung thành công");
    }).catch(function (error) {
        console.log("lỗi load danh sách người dùng");
        console.log(error);
    });

    $scope.delete = function (id, fullName) {
        let conf = confirm("Bạn muỗn xóa người dùng " + fullName);
        if (conf) {
            let urlProDele = urlListUser + "/" + id;
            $http.delete(urlProDele).then(function (response) {
                console.log("Xóa người dùng thành công " + id);
            }).catch(function (error) {
                console.log("Xóa người dùng thất bại " + id);
                console.log(error);
            });
        }
    };




}