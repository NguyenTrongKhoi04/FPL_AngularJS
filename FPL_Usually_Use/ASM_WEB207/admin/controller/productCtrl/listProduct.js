window.listProduct = function ($scope, $http, $location) {

    // sản phẩm hiện thị ở danh sách vs các trường.
    /* 
    stt    
    id
    tên sp
    image
    giá gốc
    sale
    giá bán (-->)
    trạng thái (còn hàng/hết hàng/dừng bán) (+)
    người tạo (+)
    ngày tạo (+)
    ngày sửa (+)
    người sửa (+)
    */

    // 1. Thông qua $http vs đường dẫn Url --> lấy db    
    // 2. đổ db vào list
    // 3. Quả html lặp obj theo index
    // 4. Hiện thị obj {{}}
    var urlListProduct = "http://localhost:3000/listProduct";

    // Khai báo 1 array để lưu trữ db lấy từ API.
    $scope.listProduct = [];
    $http.get(urlListProduct).then(function (response) {
        console.log("Đã tải xong danh sách sản phẩm");
        $scope.listProduct = response.data;
        console.log(response.data);
    }).catch(function (error) {
        console.log("Error connection API litsProduct");
        console.log(error);
    });

    $scope.delete = function (id) {
        let conf = confirm("Bạn muốn xóa sẩn phẩm " + id);
        if (conf) {
            let urlDelete = urlListProduct + "/" + id;
            $http.delete(urlDelete).then(function (response) {
                alert("Xóa sản phẩm " + id + " thành công");
            }).catch(function (error) {
                console.log("Lỗi xóa sản phẩm " + id);
                console.log(error);
            });
        }
    };


    /* 
    thêm mới/sửa/view 
        1. chuyển trang
    xóa. 
        1. x.đ index
        2. conf
        3. xóa theo index
    */







}