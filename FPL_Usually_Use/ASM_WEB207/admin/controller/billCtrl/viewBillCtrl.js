window.viewBillCtrl = function ($scope, $routeParams, $http, $timeout) {
    //Dựa vào id lấy ra Invoice
    let urlBill = "http://localhost:3000/invoice/" + $routeParams.id;
    let urlProduct = "http://localhost:3000/listProduct";
    $scope.in4 = [];

    $timeout(function () {// Thiết lập biến flag sau 100 giây sử dụng $timeout
        $scope.showData = true;
    }, 100);

    $scope.fetchDataFromServer = async function () {//hàm lấy db. Do ko đồng bộ để gán cho product nên dùng cái này.
        try {
            let billResponse = await $http.get(urlBill); //Lấy Bill theo ID
            $scope.in4 = billResponse.data;
            // console.log($scope.in4);

            $scope.listIDProd = $scope.in4.Product; //listIdProduct
            $scope.listIDProdArray = Object.keys($scope.listIDProd);//ép nó thành mảng để dùng đc includes và phải dùng keys()
            // console.log($scope.listIDProd);
            // console.log($scope.listIDProdArray);

            let productResponse = await $http.get(urlProduct);
            $scope.listProducts = productResponse.data;

            console.log($scope.listProducts);
            $scope.listProductUserBuy = $scope.filterProductsByID($scope.listProducts, $scope.listIDProdArray);


            // console.log($scope.listProductUserBuy);
            // console.log(typeof $scope.listProductUserBuy);

        } catch (error) {
            console.log(error);
            console.log("Lỗi khi lấy dữ liệu");
        }
    }

    $scope.fetchDataFromServer();//Chạy hàm


    $scope.filterProductsByID = function (productList, productIds) {
        let filteredProducts = [];
        for (let product of productList) {
            if (productIds.includes(product.id)) {
                filteredProducts.push(product);
            }
        }
        return filteredProducts;
    };


};
