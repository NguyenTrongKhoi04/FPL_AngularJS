window.cartCtrl = function ($scope, $http, $routeParams, $location) {
    /* Hiện thị danh sách sản phẩm trong giỏ hàng của User */
    let IDUser = document.cookie.split("; ").find(cookie => cookie.startsWith("id=")).split("=")[1];//id user

    let urlListCart = "http://localhost:3000/listCart";//Lấy hết sau lọc theo ID sau
    $scope.listCartUser = []; //Danh sách lưu trữ giỏ hàng
    $scope.productMap = {}; // Đối tượng để lưu thông tin sản phẩm duy nhất theo idPro
    $http.get(urlListCart).then(function (response) {
        $scope.listCartUser = response.data.filter(function (items) {//Lọc
            return items.idUser === IDUser;
        });
        for (const invoice of $scope.listCartUser) {/* Lấy in4 Pro là duy nhất để hiện thị lên view */
            const idPro = invoice.id;
            if (!$scope.productMap[idPro]) {
                $scope.productMap[idPro] = invoice; // Lưu thông tin sản phẩm theo idPro
            }
        }
    }).catch(function (error) {
        console.log(error);
        console.log("Lỗi truy vấn ra danh sách giỏ hàng theo IdUser");
    });

    $scope.total = 0;
    $scope.ChoosePro = function (idPro, isSelected) { //idPro tương ứng vs checkbox.
        console.log('Checkbox với ID', idPro, 'là', isSelected ? 'được chọn' : 'không được chọn')
        $scope.total = $scope.total || 0; //Giá trị tổng của sản phẩm
        let prod = $scope.findProductById(idPro, $scope.listCartUser);//Lấy ra Pro đc chọn theo ID trong list
        const price = $scope.getPropertyValue("costPro", prod);
        const sale = $scope.getPropertyValue("sale", prod);
        const quantity = $scope.getProductCountById(idPro);
        if (isSelected) {//Nếu thêm 1 SP đc chọn
            $scope.total += (price * sale / 100) * quantity;/* console.log(prod);console.log("Giá sản phẩm " + $scope.getPropertyValue("costPro", prod));console.log("Sale sản phẩm " + $scope.getPropertyValue("sale", prod));console.log("SL sp " + $scope.getProductCountById(idPro)); */
            $scope.in4.tongSoLuongSanPham += $scope.getProductCountById(idPro);//Tính tổng  SL SP
            $scope.in4.Product[idPro] = $scope.getProductCountById(idPro);//Thêm đối tượng vào hóa đơn
        } else {//Nếu bỏ đi 1 SP chọn   
            $scope.total -= (price * sale / 100) * quantity;
            $scope.in4.tongSoLuongSanPham -= $scope.getProductCountById(idPro);//Tính lại SL SP
            delete $scope.in4.Product[idPro];//Xóa đối tượng đó khỏi hóa đơn.
        }
        $scope.in4.tongTienSanPham = $scope.total;//Cập nhật lại tổng tiền sản phẩm
        $scope.in4.tongThanhToan = $scope.total + $scope.in4.phiShip;//Tổng thanh toán = Tổng giá tất cả SP + Phí Ship
        console.log($scope.in4.Product);
    };

    $scope.findProductById = function (id, productList) {//Lấy ra Pro () listPro dựa vào id
        console.log(productList);
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].id === id) {
                return productList[i];
            }
        }
    };

    $scope.getPropertyValue = function (propertyName, object) {//Lấy giá trị thuộc tính của Pro
        if (!object.hasOwnProperty(propertyName)) {//Ktr xem thuộc tính tồn tại ko
            console.log("Thuộc tính lấy đây SP ko tồn tại");
            return undefined; // Trả về undefined nếu thuộc tính không tồn tại
        } return object[propertyName];// Truy cập và trả về giá trị thuộc tính
    }

    $scope.getProductCountById = function (idPro) { //Đếm ố lượng SP trog giỏ dựa vào id
        let count = 0;
        for (const invoice of $scope.listCartUser) {
            if (invoice.id === idPro) {
                count++;
            }
        } return count;
    }

    $scope.removeToCart = async function (idPro, isSelected) {//Khi xóa kiểm tra xem nó có đang đc chọn ko để trừ vào tổng tìn :>>
        var conf = confirm("Bạn muốn xóa sản phẩm ra khỏi giỏ hàng " + idPro);
        if (conf) {
            if (isSelected) {//Nếu checkbox đag chọn. Khi xóa udpa lại tổng tiền.
                let prod = $scope.findProductById(idPro, $scope.listCartUser);//Lấy ra Pro đc chọn theo ID trong list
                const price = $scope.getPropertyValue("costPro", prod);
                const sale = $scope.getPropertyValue("sale", prod);
                const quantity = $scope.getProductCountById(idPro);
                $scope.total -= (price * sale / 100) * quantity;
            }//Nếu nó đag ko đc chọn. Thì xóa ko upda lại tổng tiền.
            //Thực hiện xóa khỏi DB
            var deleteCount = $scope.getProductCountById(idPro);//Số lần xóa. Tại ko xóa tất cả cart theo id pro đc
            for (var i = 0; i < deleteCount; i++) {
                await $http({
                    method: 'DELETE',
                    url: 'http://localhost:3000/listCart/' + idPro
                }
                ).then(function (response) {
                    console.log("Biến đếm i " + i);
                    console.log("Biến đếm deleteCount " + deleteCount);
                    if (i == deleteCount - 1) {
                        alert("Sản phẩm đã được xóa khỏi giỏ hàng!");
                    }
                    console.log($scope.total);
                }).catch(function (error) {
                    console.log(error);
                    console.log("Lỗi khi xóa sản phẩm khỏi giỏ hàng");
                });
            }
        }
    }

    function findObjectById(obj, id) { //Lấy ra thông tin giỏ hàng dựa vào id sản phẩm. Để khi + SP
        const items = Object.values(obj);
        return items.find(item => item.id === id) || null;//find chỉ dành cho mảng nên ép từ obj -> mảng
    }

    $scope.prodDiscount = function (idPro, isSelected) {/* giảm SL sản phẩm -> dựa vào id xóa 1 lần bên .json */
        console.log("Sản phẩm giảm nó đang được chọn : " + isSelected);
        //1. TH xóa mà nó đag đc checkbox. Tăng/giảm --> cập nhật lại tổng tiền
        //2. TH nếu còn sl là 1 thì ko giảm mà xóa. Nên conf lại
        if ($scope.getProductCountById(idPro) == 1) {//TH còn sl còn 1
            var conf = confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng?");
            if (conf) {
                $scope.deleteCartById(idPro).then(function (response) {
                    isSelected && $scope.recalculateTotal(idPro, "decrease", 1);
                });
            }
        } else {//TH sl > 1 : ko cần conf
            $scope.deleteCartById(idPro);
            isSelected && $scope.recalculateTotal(idPro, "decrease", 1);//reCalculateToTal
        }
    };

    $scope.deleteCartById = (idPro, type) => {/* xóa giỏ hàng theo ID sản phẩm. 1 lần */
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/listCart/' + idPro
        }).then(function (response) {
            console.log($scope.total);
        }).catch(function (error) {
            console.log(error);
            console.log("Lỗi khi giảm sl sản phẩm");
        });
    }

    $scope.recalculateTotal = function (idPro, type, quantity) {//Tính lại tổng tiền. ?ko biết tăng/giảm + sl bao nhiêu
        const prod = $scope.findProductById(idPro, $scope.listCartUser);// Lấy ra sản phẩm được chọn theo ID trong giỏ hàng
        // Lấy giá bán và chiết khấu của sản phẩm
        const price = $scope.getPropertyValue("costPro", prod);
        const sale = $scope.getPropertyValue("sale", prod);
        if (type === "increase") {//Nếu SL tăng --> tổng tiền tăng
            console.log("Đã tính lại tổng += vs sl" + quantity);
            $scope.total += (price * sale / 100) * quantity;
        } else if (type === "decrease") {//SL giảm --> tổng tiền giảm
            console.log("Đã tính lại tổng -= vs sl" + quantity);
            $scope.total -= (price * sale / 100) * quantity;
        } else {
            console.log("Lỗi tính lại tổng tiền rồi :>");
        }
    }

    $scope.in4 = {/* thông tin ban đầu của User */
        tenNguoiDung: document.cookie.split("; ").find(cookie => cookie.startsWith("fullName=")).split("=")[1],//tên người nhận hàng
        soDienThoai: document.cookie.split("; ").find(cookie => cookie.startsWith("phoneNumber=")).split("=")[1],
        tongSoLuongSanPham: 0, /* Tổng số lượng SP */
        tongTienSanPham: 0, /* Tổng tiền tất cả sản phẩm */
        Product: {},//{IDPro : quantity}
        diaChi: "", /* Địa chỉ nhận hàng */
        dichVuVanChuyen: "VNExpress",/* Dịch vụ vận chuyển */
        hinhThucThanhToan: "Thanh toán khi nhận hàng",/* Hình thức thanh toán */
        ngayDatHang: new Date().toISOString(),/* ngày đặt hàng */
        phiShip: 40000,/* Phí vận chuyển */
        trangThaiHoaDon: "Chờ Thanh Toán",/* Trạng thái hóa đơn (Chờ thành toán/Thanh toán thành công/Hủy) */
        tongThanhToan: 0,
    }

    $scope.checkValidate = function () {
        $scope.validationFields = { //Các fiels cần chek lỗi
            fullName: $scope.in4.tenNguoiDung,//ko null
            phoneNumber: $scope.in4.soDienThoai,//Ko null + là số 
            address: $scope.in4.diaChi, //Ko null
            tongTienSP: $scope.in4.tongTienSanPham, //>0
        };

        $scope.showError = { //Nếu lỗi thì hiện thị
            fullName: false,
            phoneNumber: false,
            address: false,
            tongTienSP: false,
        }
        $scope.ContentError = {// Nội dung lỗi hiện thị
            fullName: "",
            phoneNumber: "",
            address: "",
            tongTienSP: "",
        }

        //Dùng vòng lặp lặp ra giá trị của các key. Xem nó có null ko
        for (const key in $scope.validationFields) {
            if (key != "tongTienSP" && $scope.validationFields[key] === "") {//Tổng tiền ko cần chek null
                $scope.showError[key] = true;
                $scope.ContentError[key] = "Vui lòng không để trống trường " + key;
                $scope.hasError = true;//Có lỗi
            } else {
                $scope.showError[key] = false;
            }
        }
        $scope.showError.phoneNumber = isNaN($scope.validationFields.phoneNumber) && !$scope.showError.phoneNumber;//TH ko trống nhưng ko là số
        $scope.ContentError.phoneNumber = $scope.showError.phoneNumber ? "Vui lòng nhập số điện thoại là số" : "";
        $scope.hasError = $scope.hasError || $scope.showError.phoneNumber;

        $scope.showError.tongTienSP = Number($scope.validationFields.tongTienSP) === 0;
        $scope.ContentError.tongTienSP = $scope.showError.tongTienSP ? "Vui lòng chọn sản phẩm để đặt hàng" : "";
        $scope.hasError = $scope.hasError || $scope.showError.tongTienSP;
    }

    $scope.order = function () {
        $scope.hasError = false; $scope.checkValidate();
        if (!$scope.hasError && confirm("Bạn muốn đặt hàng?")) {
            //Lấy thông tin hóa đơn ở in4 bắn lên server ;>
            const invoice = $scope.in4;
            $http.post("http://localhost:3000/invoice", invoice).then(function (response) {
                console.log("Đặt hàng thành công");
                alert("Đặt hàng thành công.");
                $location.path("/");
            }).catch(function (error) {
                console.log(error);
                console.log("Tạo hóa đơn không thành công. Vui lòng liên hệ vs admin để đc tư vấn ;>");
            });

        }
    }
    /* Khi tạo hóa đơn.
        idHD
        idUser : nameUser (Ko cần) , SĐT (ko cần)
        Product [idPr : sl]
        SL product ( tổng ) 
        Tổng tiền
        payOptions
        dvcc
        address
        orderdate
        shipCost
        trạng thái đơn hàng : Chờ thanh toán
    */
    $scope.view = function () {
        console.log("Trong cookie : " + document.cookie.split("; ").find(cookie => cookie.startsWith("fullName=")).split("=")[1]);
        console.log("Trên UI : " + $scope.in4.nameUser);
    }
}