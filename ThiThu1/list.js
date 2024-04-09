window.ListController = function ($scope, $http, $location) {
    const apiUrl = "http://localhost:3000/products";

    $scope.getListData = function () {
        $http.get("http://localhost:3000/products").then((res) => {
          if (res.status == 200) {
            $scope.listData = res.data;
          }
        });
    }
  $scope.getListData();
  
  $scope.delete = function (id) {
    let confirm = window.confirm("bạn có chắc chắc muốn xóa");

    if (confirm) {
          $http.delete("http://localhost:3000/products/" + id).then((res) => {
            if (res.status == 200) {
              alert('xóa thành công')
              $scope.getListData();
            }
          });
    }
  }
  $scope.detail = function (id) {

        $location.path("/foods/detail"+id);
   }
}