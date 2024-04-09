window.updateProduct = function ($scope, $http, $location, $routeParams) {

    let urlProduct = "http://localhost:3000/listProduct" + "/" + $routeParams.id;
    console.log(urlProduct);

    $http.get(urlProduct).then(function (response) {
        console.log("Lấu thông tin sản phẩm thành công");
        $scope.Pro = response.data;
        console.log($scope.Pro);
    }).catch(function (error) {
        console.log("Lỗi API lấy thông tin sản phẩm");
        console.log(error);
    });
    
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
        console.log("ChekIsEmp " + $scope.hasError);
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
        console.log("chekIsnotA " + $scope.hasError);
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

    $scope.update = () => {
        $scope.checkIsEmpty();
        $scope.checkStatusPro();
        $scope.checkIsNotANumber();
        $scope.checkQuantity();
        $scope.checkSale();
        $scope.checkCost();
        console.log($scope.hasError);
        if (!$scope.hasError) {
            let conf = confirm("Xác nhận sửa thông tin sản phẩm");
            if (conf) {
                let product = angular.copy($scope.Pro);
                $http.put(urlProduct, product).then(function (response) {
                    alert("sửa thông tin sản phẩm  thành công");
                    $location.path("/");
                }).catch(function (error) {
                    console.log("Lỗi API put thông tin sản phẩm");
                    console.log(error);
                })
            }
        } else {
            console.log("Lỗi ko sửa thông tin SP");
        }
    }


};