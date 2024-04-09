window.DetailsController = function ($scope, $http, $location, $routeParams) {
  let apiUrl = "http://localhost:3000/products";

  let id = $routeParams.id;

  $scope.getDetail = function () {
    $http.get(`${apiUrl}/${id}`).then(function (res) {
      if (res.status == 200) {
        $scope.input = res.data;
      }
    });
  };

  $scope.getDetail();

     $scope.update = function (id) {
       $location.path("/foods/edit" + id);
     };
  
};
