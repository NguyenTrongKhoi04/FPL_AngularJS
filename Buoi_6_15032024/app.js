// function myFunction ($scope){
//     // Lưu ý scope sẽ luôn được xuất hiện
//     // Sau $scope thì sẽ khởi tạo 1 biến để render ra dữ liệu 
//     $scope.xinChao = "Mạnh là con chó";
// }

// Khai báo Angular JS cùng với vùng màn hình sử dụng
var app = angular.module('myapp',[]);
// map function myFunction với vùng demoController 
// để render dữ liệu
// app.controller('demoController',myFunction);

// Viết tắt
app.controller("demoController", function($scope){
    $scope.xinChao = "Hello";

    // Hiển thị thông tin sinh viên: ma, ten, namsinh
    $scope.ma = "PH31193";
    $scope.ten = "Vu Thi Mai Chinh";
    $scope.namsinh = 2003;

    // ĐỐI TƯỢNG
    $scope.sinhvien = {
        ma: "PH12345",
        ten: "Chinh qua xinh",
        namsinh: 2003,
        tinhtrang: true
    };
    
 
    // Khai báo đối tượng: ma, ten, gia, nam
    // 1. Hiển thị tất cả thông tin, nếu giá > 1000 thì hiển thị dòng hàng cao cấp
    $scope.sanpham = {
        ma: "B001",
        ten: "Bánh Mochi",
        gia: 12000,
        nam: 2014
    };

       // MẢNG ĐỐI TƯỢNG
       $scope.sv = [
        {
            ma: "PH12345",
            ten: "Chinh qua xinh",
            namsinh: 2003,
            tinhtrang: true
        },
        {
            ma: "PH78910",
            ten: "Mạnh xấu lắm",
            namsinh: 2000,
            tinhtrang: true
        },
    ];

})
