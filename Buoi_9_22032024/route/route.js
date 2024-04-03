angular.module("myRoute", ['ngRoute']).config( function ($routeProvider){
    $routeProvider
      .when("/", {
        templateUrl: "view/home.html",
      })
      .when("/list", {
        templateUrl: "view/list.html",
      });
});
