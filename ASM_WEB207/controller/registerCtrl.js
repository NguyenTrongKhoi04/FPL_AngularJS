window.registerCtrl = function ($scope, $http, $location, globalData) {

    var uuid = window.uuid; // Nếu sử dụng npm hoặc yarn

    var urlListAccount = "http://localhost:3000/list_Account";
    $scope.ARI = { /* in4 tài khoản đăng ký */
        id: uuid.v4(),/* tạo 1 uuid phiên bản 4 */
        fullName: "",
        phoneNumber: "",
        email: "",
        password: "",
        re_password: "",
        gender: "",
        image_user: "",
        role: "user"
    };

    $scope.showMessageError = {/* hiện thị nội dung lỗi */
        fullName: false,
        phoneNumber: false,
        email: false,
        password: false,
        re_password: false
    };
    $scope.messageError = {/* nội dung thông báo */
        fullName: "",
        phoneNumber: "",
        email: "",
        password: "",
        re_password: ""
    }
    $scope.register = async function () {
        $scope.isEmpty();
        $scope.passwordError();
        $scope.emailError();
        $scope.notANumber();
        $scope.checkPasswordMatch();
        console.log($scope.hasError);
        await $scope.checkAccountExists();/* chờ check xem trùng ko. */
        if (!$scope.hasError) {
            let account = angular.copy($scope.ARI); // tạo một bản sao sâu của $scope.ARI
            delete account.re_password; // xóa thuộc tính re_password
            $http.post(urlListAccount, account).then(function (response) {
                // Tạo cookie mới. Vs các tham số (tên cookie , giá trị , thời hạn hết hạn của cookie , cho bieuest cookie có thể truy cập trên tất cả các trang ).
                document.cookie = "authenticated=true; Path=/;";
                for (const key in $scope.ARI) {//Duyệt thiết lập từng cookies vs từng thuộc tính.
                    if (key !== "re_password") {
                        document.cookie = `${key}=${$scope.ARI[key]};Path=/;`;
                    }
                }
                console.log(document.cookie);
                alert("đăng ký tài khoản thành công :))");
                $location.path("/home");
            }).catch(function (error) {
                console.log(error);
                alert("Đăng ký tài khoản lỗi");
            });
        }
    }
    /* 
    async : định nghĩa 1 hàm bất đồng bộ. Cho phép đợi 1 promise đc giải quyết r mới tiếp tục các dòng mã tiếp theo.
    await : dùng trog hàm đó. Để 1 dòng lệnh bất đồng bộ nào đó chạy và trả về kq thì mới chạy tiếp câu lệnh dưới.
    */

    $scope.checkAccountExists = async function () {
        const data = {
            fullName: $scope.ARI.fullName,
            email: $scope.ARI.email,
            phoneNumber: $scope.ARI.phoneNumber,
        };
        await $http.get("http://localhost:3000/list_Account")
            .then(function (response) {
                var listAccountInDB = response.data;/* lấy ra danh sách */
                /* duyệt các đối tượng trog ds */
                for (const account of listAccountInDB) {
                    for (const key of ["fullName", "phoneNumber"]) {
                        if (data[key] == account[key]) {
                            $scope.showMessageError[key] = true;
                            $scope.messageError[key] = `${key} đã tồn tại`;
                        }
                    }
                    if (data.email != "" && data.email == account.email) {/* kiểm tra email */
                        $scope.showMessageError.email = true;
                        $scope.messageError.email = "email đăng nhập đã tồn tại";
                    }
                    $scope.hasError = Object.values($scope.showMessageError).some(Boolean);/* cập nhật trạng thái lỗi */
                    console.log("Lỗi trùng " + $scope.hasError);
                    console.log($scope.showMessageError);
                    return $scope.hasError = Object.values($scope.showMessageError).some(Boolean);
                }
            })
            .catch((error) => {/* Xử lý lỗi khi gửi request */
                alert("Đăng ký tài khoản thất bại. Vui lòng kiểm tra thông tin và thử lại");
                console.error("Lỗi đăng ký tài khoản:", error);
            });
    };

    $scope.isEmpty = function () {/* hàm check trống */
        $scope.hasError = false;
        for (var prop in $scope.ARI) {
            if (prop !== 'email' && prop !== 'gender' && prop !== 'image_user' && $scope.ARI[prop] == "") {/* tb trống.Nhưng trừ trường Email */
                $scope.messageError[prop] = "Vui lòng không để trống " + prop;
                $scope.showMessageError[prop] = true;
                $scope.hasError = true;
            } else {
                $scope.showMessageError[prop] = false;
            }
        };
        console.log("sau khi check trống : " + $scope.hasError);
    };
    $scope.notANumber = function () {/* hàm check ko là số */
        var firstChar = $scope.ARI.phoneNumber.charAt(0);
        var isValidNumber = checkPhoneNumber($scope.ARI.phoneNumber);
        if ($scope.ARI.phoneNumber == "") {
            showError("Vui lòng không để trống số điện thoại");
        } else if (!isValidNumber) {
            showError("Vui lòng nhập số điện thoại là số!");
        } else if (firstChar !== '0') {
            showError("Số điện thoại bắt đầu bằng số 0");
        }
        function showError(message) {
            $scope.showMessageError.phoneNumber = true;
            $scope.messageError.phoneNumber = message;
            $scope.hasError = true;
        }
        console.log("sau khi check số : " + $scope.hasError);
    }

    $scope.passwordError = function () {
        if (!checkPassword($scope.ARI.password) && $scope.showMessageError.password == false) {
            $scope.showMessageError.password = true;
            $scope.messageError.password = "Mật khẩu không hợp lệ";
            $scope.hasError = true;
        }
        console.log("sau khi check password : " + $scope.hasError);
    };
    $scope.emailError = function () {
        if ($scope.ARI.email != "" && !checkEmail($scope.ARI.email)) {
            $scope.showMessageError.email = true;
            $scope.messageError.email = "email không hợp lệ ( example@example.com ) ";
            $scope.hasError = true;
        }
        console.log("sau khi check mail : " + $scope.hasError);
    };

    $scope.checkPasswordMatch = function () { /* Ktr trùng password */
        if ($scope.ARI.password !== $scope.ARI.re_password) {
            $scope.showMessageError.re_password = true;
            $scope.messageError.re_password = "Mật khẩu xác nhận không trùng";
            $scope.hasError = true;
        }
        console.log("sau khi check passwordMatch : " + $scope.hasError);
    };

    function checkPhoneNumber(phoneNumber) {
        var bool = isNaN(phoneNumber);
        return !bool;/* nếu là số thì là true. Còn ko là false*/
    }
    function checkPassword(password) {
        var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return regex.test(password);/* Nếu phù hợp, trả về true, nếu không, trả về false */
    }
    function checkEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);/* Nếu phù hợp, trả về true, nếu không, trả về false */
    }
}
