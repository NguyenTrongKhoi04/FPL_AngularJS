angular.module("myRoute", ['ngRoute']).config( function ($routeProvider){
    $routeProvider
      .when("/trang_chu", {
        templateUrl: "view/home.html",
      })
      .when("/list", {
        templateUrl: "view/list.html",
      });
});
