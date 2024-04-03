angular.module("myRoute", ["ngRoute"]).config(function ($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "views/list.html",
      controller: ProductListController,
    })
    .when("/add", {
      //Định nghĩa route
      templateUrl: "views/add.html",
      controller: ProductAddController,
    })
    .when("/detail", {
      //Định nghĩa route
      templateUrl: "views/detail.html",
    })
    .when("/update/:id", {
      //Định nghĩa route
      templateUrl: "views/update.html",
      controller: ProductUpdateController,
    })
    .when("/dangnhap", {
      //Định nghĩa route
      templateUrl: "views/dangnhap.html",
    })
    .when("/dangky", {
      //Định nghĩa route
      templateUrl: "views/dangky.html",
    });
  // .when(
  //     '/trang-chu1',{ //Định nghĩa route
  //         templateUrl: 'views/trang_chu.html', //view theo route
  //     }
  // )
});
