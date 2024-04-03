angular.module("myApp", ["ngRoute"]).config(($routeProvider) => {
  $routeProvider
    .when("/product/list", {
      templateUrl: "views/list.html",
      controller: ProductListController,
    })
    .when("/product/add", {
      templateUrl: "views/add.html",
      controller: ProductAddController,
    })
    .when("/product/update/:id", {
      templateUrl: "views/update.html",
      controller: ProductUpdateController,
    });
});
