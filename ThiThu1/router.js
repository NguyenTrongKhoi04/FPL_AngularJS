angular.module("myApp", ["ngRoute"]).config(($routeProvider) => {
  $routeProvider
    .when("/list-foods", {
      templateUrl: "list.html",
      controller: ListController,
    })
    .when("/foods/add", {
      templateUrl: "add.html",
      controller: AddController,
    })
    .when("/foods/edit:id", {
      templateUrl: "update.html",
      controller: UpdateController,
    })
    .when("/foods/detail:id", {
      templateUrl: "details.html",
      controller: DetailsController,
    });
  // .otherwise({
  //   redirect: "/list-foods",
  // });
});
