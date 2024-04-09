window.addProduct = function ($scope, $http, $location) {

    // sản phẩm hiện thị ở danh sách vs các trường.
    /* 
    stt    
    id
    tên sp
    image
    giá gốc
    sale
    giá bán (-->)
    trạng thái (còn hàng/hết hàng/dừng bán) (+)
    người tạo (+)
    ngày tạo (+)
    ngày sửa (+)
    người sửa (+)
    */
    // tạo biến chữa dữ liệu
    $scope.Pro = {
        namePro: "",
        costPro: "",
        quantity: "",
        sale: "",
        origin: "Xuất Xứ",
        urlImg: "",
        describe: "",
        status: "",
        createBy: "",
        createAt: ""
    }

    // hiện thị content lỗi
    $scope.showErrorContent = {
        namePro: false,
        costPro: false,
        quantity: false,
        sale: false,
        origin: false,
        urlImg: false,
        describe: false,
        status: false
    }
    // Lỗi hiện thị
    $scope.contentError = {
        namePro: "",
        costPro: "",
        quantity: "",
        sale: "",
        origin: "",
        urlImg: "",
        describe: "",
        status: ""
    }



    $scope.checkIsEmpty = function () {
        $scope.hasError = false;
        const properties = ["namePro", "quantity", "costPro", "urlImg"];
        properties.forEach((property) => {
            if (!$scope.Pro[property]) {// Kiểm tra giá trị của thuộc tính
                $scope.showErrorContent[property] = true;// Hiển thị thông báo lỗi
                $scope.contentError[property] = "Vui lòng nhập thông tin cho trường " + property;
                $scope.hasError = true;
            } else {
                $scope.showErrorContent[property] = false;// Ẩn thông báo lỗi
            }
        });
        if ($scope.Pro.origin === "Xuất Xứ") {
            // Hiển thị thông báo lỗi cho trường origin
            $scope.showErrorContent.origin = true;
            $scope.contentError.origin = "Vui lòng chọn xuất xứ cho sản phẩm";
            $scope.hasError = true;
        } else {
            $scope.showErrorContent.origin = false;
        }
        console.log($scope.hasError);
    }

    $scope.checkIsNotANumber = function () {
        const properties = ["costPro", "sale", "quantity"];
        properties.forEach((property) => {
            if (isNaN($scope.Pro[property])) {
                $scope.showErrorContent[property] = true;
                $scope.contentError[property] = "Vui lòng nhập " + property + " là số!";
                $scope.hasError = true;
            } else {
                $scope.showErrorContent[property] = false;
            }
        });
        $scope.checkSale();
        $scope.checkQuantity();
    }

    $scope.checkStatusPro = () => {
        if ($scope.Pro.status == undefined || $scope.Pro.status == "") {
            $scope.showErrorContent.status = true;
            $scope.contentError.status = "Vui lòng nhập chọn trạng thái cho sản phẩm ";
            $scope.hasError = true;
        } else {
            $scope.showErrorContent.status = false;
        }
    }

    $scope.checkSale = () => {
        if (!isNaN($scope.Pro.sale) && (Number($scope.Pro.sale) > 50 || Number($scope.Pro.sale) < 0)) {
            $scope.showErrorContent.sale = true;
            $scope.contentError.sale = " 0% < Giảm giá < 50%";
            $scope.hasError = true;
        }
        console.log("chekSale " + $scope.hasError);
    }

    $scope.checkQuantity = () => {
        console.log($scope.Pro.quantity);
        if ((!isNaN($scope.Pro.quantity) && Number($scope.Pro.quantity) > 100) || Number($scope.Pro.quantity) <= 0) {
            $scope.showErrorContent.quantity = true;
            $scope.contentError.quantity = "Số lượng sản phẩm 0< số lượng <100";
            $scope.hasError = true;
        }
        console.log("ChekQuang " + $scope.hasError);
    }
    $scope.checkCost = () => {
        console.log($scope.Pro.costPro);
        if (!isNaN($scope.Pro.costPro) && Number($scope.Pro.costPro) <= 0) {
            $scope.showErrorContent.costPro = true;
            $scope.contentError.costPro = "Giá sản phẩm >0";
            $scope.hasError = true;
        }
        console.log("ChekQuang " + $scope.hasError);
    }


    var urlListProduct = "http://localhost:3000/listProduct";
    $scope.Add = function () {
        $scope.checkIsEmpty();
        $scope.checkStatusPro();
        $scope.checkIsNotANumber();
        $scope.checkQuantity();
        $scope.checkSale();
        $scope.checkCost();
        if (!$scope.hasError) {
            let conf = confirm("Xác nhận thêm sản phẩm");
            if (conf) {
                $scope.Pro.createBy = document.cookie.split("; ").find(cookie => cookie.startsWith("id=")).split("=")[1];;
                $scope.Pro.createAt = new Date();
                //
                let product = angular.copy($scope.Pro);
                $http.post(urlListProduct, product).then(function (response) {
                    alert("Thếm sản phẩm mới thành công");
                    $location.path("/");
                }).catch(function (error) {
                    console.log("Lỗi API post sản phẩm");
                    console.log(error);
                })
            }
        }
    }
};