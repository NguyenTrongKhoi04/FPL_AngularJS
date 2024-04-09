window.loginCtrl = function ($scope, $http, globalData, $location) {
    $scope.data = {
        username: "",
        password: ""
    }
    $scope.check = {/* hiện thị thống báo khi hasError */
        checkUserName: false,
        checkPassWord: false
    }
    $scope.messageValidation = {/* Thông báo lỗi tương ứng  */
        message_username: "",
        message_password: ""
    }

    $scope.checkLogin = () => {
        $scope.hasError = false;//Giá trị ban đầu.

        // lưu trữ kq của từng trường.
        const validationErrors = {
            username: $scope.data.username === '',
            password: $scope.data.password === ''
        };

        // some : trả về true nếu có 1 giá trị true trong validationErrors
        $scope.hasError = Object.values(validationErrors).some(error => error);

        $scope.check.checkUserName = validationErrors.username;
        $scope.messageValidation.message_username = "Vui lòng không để trống tên đăng nhập";

        $scope.check.checkPassWord = validationErrors.password;
        $scope.messageValidation.message_password = "Vui lòng không để trống mật khẩu";

        return $scope.hasErrors;
    };

    $scope.login = () => {/* Lấy data mà so sánh. */
        $scope.checkLogin();
        if (!$scope.hasError) {
            // Lấy resp dựa vào userName + passWord
            const urlListAccount = `http://localhost:3000/list_Account?fullName=${$scope.data.username}&password=${$scope.data.password}`;
            $http.get(urlListAccount).then(function (response) {
                if (response.data.length === 0) {//Nếu ko có data trả về
                    $scope.check.checkPassWord = response.data.length === 0;
                    $scope.messageValidation.message_password = "Tên tài khoản hoặc mật khẩu không chính xác";
                }
                if (response.data.length > 0) {//TH login success.
                    // tải db user lên cookie
                    const userData = response.data[0]; // Lấy dữ liệu người dùng đầu tiên ( [0] vì response.data là một mảng)
                    userData.authenticated = true;// Thêm trường authenticated.Do bên db.json ko có
                    for (const key in userData) {//Thiết lập trường attribute + value
                        globalData.setCookie(key, userData[key], 1);
                    }
                    console.log(document.cookie);
                    alert("Đăng nhập thành công");
                    // Nếu là user --> website
                    // Nếu là admin --> Trang quản trị
                    const role = document.cookie.split("; ").find(cookie => cookie.startsWith("role=")).split("=")[1];
                    if (role === "user") {
                        $location.path("/");
                        setTimeout(function () {//Để chuyển trang r tải lại trang ko sẽ bị lỗi
                            window.location.reload();
                        }, 10);
                    } else if (role === "admin") {
                        console.log("sang trang admin");
                        window.location.href = 'admin/admin.html';
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    };
}
