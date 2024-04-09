var myApp = angular.module("myApp", ["ngRoute"]);
myApp.config(function ($routeProvider) {
    $routeProvider
        .when("/", {//dánh sách sản phẩm
            templateUrl: "view/product/listProduct.html",
            controller: listProduct
        })
        .when("/viewProduct/:id", {//view sản phẩm
            templateUrl: "view/product/viewProduct.html",
            controller: viewProduct
        })
        .when("/addProduct", {//thêm sản phẩm
            templateUrl: "view/product/addProduct.html",
            controller: addProduct
        })
        .when("/updateProduct/:id", {//upda Pro
            templateUrl: "view/product/updateProduct.html",
            controller: updateProduct
        })
        /* -------------- */
        .when("/listUser", {
            templateUrl: "view/user/listUser.html",
            controller: listUserCtrl
        })
        .when("/viewUser/:id", {
            templateUrl: "view/user/viewUser.html",
            controller: viewUserCtrl
        })
        .when("/updateUser/:id", {
            templateUrl: "view/user/updateUser.html",
            controller: updateUserCtrl
        })
        /* -------------- */
        .when("/listBill", {//Danh sách hóa đơn
            templateUrl: "view/bill/listBill.html",
            controller: listBillCtrl
        })
        .when("/viewBill/:id", { //
            templateUrl: "view/bill/viewBill.html",
            controller: viewBillCtrl
        })
        .when("/updateBill/:id", {
            templateUrl: "view/bill/updateBill.html",
            controller: updateBillCtrl
        })
        .otherwise({
            template: "<h1>Lỗi 404</h1><p>Trang không tồn tại</p>"
        })
});