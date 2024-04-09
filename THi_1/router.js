angular.module("myApp", ["ngRoute"]).config(($routeProvider) => {
  $routeProvider
    .when("/list-phone", {
      templateUrl: "index.html",
      controller: ListController,
    })
    .when("/phone/add", {
      templateUrl: "add.html",
      controller: AddController,
    })
    .otherwise({ redirectTo: "/list-phone" });
});
