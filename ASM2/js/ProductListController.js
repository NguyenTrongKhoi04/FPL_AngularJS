window.ProductListController = function ($scope, $http, $location) {
  $scope.hi = "Tạm Biệt";
  const apiUrl = "http://localhost:3000/products";
  // get = hiển thị toàn bộ, hiểm thị 1 bản ghi
  // post = thêm
  // put = sửa
  // delete = xóa
  $scope.listProduct = function () {
    $http.get(apiUrl).then(function (res) {
      if (res.status == 200) {
        console.log(res.data);
        $scope.dataPro = res.data;
      }
    });
  };
  $scope.listProduct();

  $scope.delete = function (id) {
    console.log(12);
    let confirmVertify = confirm("Bạn có chắc chắn muốn xóa không ?");
    // let confirmVertify = window.confirm("Bạn có chắc chắn muốn xóa không ?");
    if (confirmVertify) {
      $http.delete(`${apiUrl}/${id}`).then((res) => {
        if (res.status === 200) {
          alert("xóa thành công");
        }
      });
    }
  };

  $scope.update = function (id) {
    $location.path(`/update/${id}`);
  };
};
