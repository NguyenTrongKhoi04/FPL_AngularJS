angular.module("myRoute", ["ngRoute"]).config(function ($routeProvider) {
  $routeProvider
    .when("/home", {
      //Định nghĩa route
      templateUrl: "views/list.html",
    })
    .when("/add", {
      //Định nghĩa route
      templateUrl: "views/add.html",
    })
    .when("/detail", {
      //Định nghĩa route
      templateUrl: "views/detail.html",
    })
    .when("/update", {
      //Định nghĩa route
      templateUrl: "views/update.html",
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
