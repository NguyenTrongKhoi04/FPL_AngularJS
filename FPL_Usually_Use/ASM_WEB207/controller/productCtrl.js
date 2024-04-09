/* 
    $routeParams : Để biết ID sản phẩm chọn vào là gì?
    $http : Dùng để thao tác với db.json.
 */
window.productCtrl = function ($scope, $routeParams, $http) {

    var Url_productID = "http://localhost:3000/listProduct" + "/" + $routeParams.id;/* Lấy địa chỉ API của spct dựa vòa ID */
    console.log("http://localhost:3000/listProduct" + "/" + $routeParams.id);

    $scope.product;

    $http.get(Url_productID).then(function (response) {
        $scope.product = response.data;
        console.log(response.data);
    }).catch(function (error) {
        console.log("Không truy ra sản phẩm theo ID!!");
    });

    var uuid = window.uuid; // Nếu sử dụng npm hoặc yarn

    $scope.addToCart = () => {
        let idUser = document.cookie.split("; ").find(cookie => cookie.startsWith("id=")).split("=")[1];//id user
        $scope.product.idUser = idUser;
        $scope.product.idCart = uuid.v4();
        let urlCart = "http://localhost:3000/listCart";
        let Cart = $scope.product;
        console.log(Cart);
        let conf = confirm("Thêm sản phẩm vào giỏ hàng?");
        if (conf) {
            $http.post(urlCart, Cart).then(function (response) {
                alert("Thêm sản phẩm vào giở hàng thành công");
                console.log("Thêm sản phẩm vào giở hàng thành công");
            }).catch(function (error) {
                console.log("Lỗi thêm sản phẩm vào giỏ hàng");
                console.log(error);
            });
        }
    }

    addresses = {
        hanoi: [
            "Cửa hàng online (Còn hàng)",
            "120 Thái Hà, Q. Đống Đa (Hết hàng)",
            "398 Cầu Giấy, Q. Cầu Giấy (Còn hàng)",
            "42 Phố Vọng, Hai Bà Trưng (Hết hàng)"
        ],
        hcm: [
            "Cửa hàng online (Còn hàng)",
            "123 Lê Lợi, Q.1 (Còn hàng)",
            "456 Nguyễn Trãi, Q.5 (Hết hàng)",
            "789 Cộng Hoà, Tân Bình (Còn hàng)"
        ]
        // Thêm các mảng khác tại đây
    };
    showAddresses = function () {
        var city = document.getElementById("stores").value;/* Lấy giá trị của combobox */
        var div = document.getElementById("addresses");/* Lấy phần tử div để hiển thị danh sách địa chỉ */
        div.innerHTML = "";/* Xóa nội dung cũ của div */
        var list = document.createElement("ul");/* Tạo một danh sách không có dấu đầu dòng */
        list.style.listStyle = "circle";
        // Duyệt qua mảng địa chỉ tương ứng với giá trị của combobox
        for (var i = 0; i < addresses[city].length; i++) {
            // Tạo một phần tử li cho mỗi địa chỉ
            var item = document.createElement("li");
            // Gán nội dung của địa chỉ cho phần tử li
            item.textContent = addresses[city][i];
            // Thêm phần tử li vào danh sách
            list.appendChild(item);
        }
        div.appendChild(list);/* Thêm danh sách vào div */
    }
    // Dùng để gọi đến hàm showAddress sau khi load xog trang web. 
    window.onload = showAddresses();
}





