angular.module("myController", ["ngRoute"]).config(($routeProvider) => {

    $routeProvider.when('/index', {
        templateUrl: "views/index.html",
        controller: IndexController 
    });

    $routeProvider.when('/create', {
        templateUrl: "views/create.html",
        controller: CreateController 
    });

    $routeProvider.when('/detail/:id', {
        templateUrl: "views/detail.html",
        controller: DetailController 
    });

    $routeProvider.when('/edit/:id', {
        templateUrl: "views/update.html",
        controller: EditController 
    });

})