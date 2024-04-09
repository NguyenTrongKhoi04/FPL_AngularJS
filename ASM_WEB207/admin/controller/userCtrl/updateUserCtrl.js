window.updateUserCtrl = function ($scope, $http, $location, $routeParams) {

    var urlListUser = "http://localhost:3000/list_Account" + "/" + $routeParams.id;
    $scope.User;
    $http.get(urlListUser).then(function (response) {
        $scope.User = response.data;
        console.log("load dữ liệu người dung thành công");
    }).catch(function (error) {
        console.log("lỗi load danh sách người dùng");
        console.log(error);
    });

    $scope.PwTrim = function () {
        $scope.User.password = $scope.User.password.replace(/\s/g, '');
    }

    $scope.update = () => {
        let conf = confirm("Thực hiện thay đổi mật khẩu?");
        if (conf) {
            let user = angular.copy($scope.User);
            console.log(user);
            $http.put(urlListUser, user).then(function (response) {
                console.log("Thay đổi mật khẩu thành công");
                alert("Sửa mật khẩu người dùng thành công");
            }).catch(function (error) {
                console.log("lỗi thay đổi mật khẩu người dùng");
                console.log(error);
            });
        }
    }

}