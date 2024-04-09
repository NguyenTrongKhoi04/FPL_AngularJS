app.controller("_siteBarCtrl", function ($scope, globalData, $location, $http) {

    const personalData = globalData.getUserData();//Lấy in4 user
    $scope.notLogin = function () {/* TH chưa login thì nó hiện phần đăng nhập  */
        if (personalData.authenticated === false) {
            return true;
        } else {
            return false;
        }
    }
    $scope.hasLogin = function () {
        if (personalData.authenticated === true) {
            $scope.userName = personalData.fullName;
            return true;
        } else {
            return false;
        }
    }

    $scope.logOut = function () {//Đăng xuất
        const cookies = document.cookie.split(';');
        cookies.forEach((cookie) => {//Vòng lặp xóa đi các giá trị của cookie
            const cookieName = cookie.split('=')[0];
            document.cookie = `${cookieName}=; expires=Wed, 27 Feb 2019 07:41:28 GMT;`;
        });
        alert("Đăng xuất thành công");

        $location.path("/"); // Chuyển hướng đến trang chủ
        setTimeout(function () {
            window.location.reload(); // Tải lại trang
        }, 10);
    }

    if (document.cookie) {//TH có đăng nhập
        let idUser = document.cookie.split("; ").find(cookie => cookie.startsWith("id=")).split("=")[1];//id user
        $scope.numberCart2 = 0;
        if (idUser) {//Nếu có dữ liệu là true
            let urlCart = "http://localhost:3000/listCart";//Lấy ds dựa vào IDuser xem bao nhiêu mảng;
            $http.get(urlCart).then(function (response) {//Lấy db
                console.log(response.data);
                let dsCart = response.data.filter(function (items) {//Lọc
                    return items.idUser === idUser;
                });;
                $scope.numberCart2 = dsCart.length;

            }).catch(function (error) {
                $scope.numberCart2 = 0;
                console.log("Lỗi truy vấn số lương hóa đơn");
            });
        }
    } else {
        $scope.numberCart2 = 0;//TH đăng xuất cookie rỗng. Gán lại = 0
    }


    // Khi thực hiện click vòa giỏ hàng thì chek xem login chưa
    $scope.checkLogin = () => {
        if (document.cookie) {//nếu có login
            $scope.url = "#!/listCart";
        } else {
            $scope.url = null;
            alert("Vùi lòng đăng nhập để xem thông tin giỏ hàng");
        }
    }
});
