/*  $scope : là 1 service : giúp kết nối giữa controller và view.
 Chứa dữ liệu và hàm của controller. 

$http : là 1 service để gọi API. sử dụng methods HTTP ( GET,POST,PUT,DELETE )
GET : gửi y.c đến server.
POST : gửi DB lên server. 
PUT : cập nhật db lên server. Thay cũ hoàn toàn bằng mới.
PATCH : cập nhật db lên server. Nhưng chỉ thay đổi 1 phần của db cũ. */
window.homeCtrl = function ($scope, $http, globalData) {
    //  Gán địa chỉ của API để thông qua đ/chỉ đó lấy về DB.
    // API ( APPLICATION PROGRAMMING INTERFACE ) : Giao diện lập trình ứng dụng. Cho phép các app khác nhau giao tiếp + trao đổi DB vs nhau. 
    // Định nghĩa mảng các URL API
    var apiUrls = [
        "http://localhost:3000/ListCarousel",
        "http://localhost:3000/ListBanner",
        "http://localhost:3000/listProduct",
        "http://localhost:3000/list_Accessory"
    ];
    // Khai báo 1 array để lưu trữ db lấy từ API.
    $scope.listCarousel = [];
    $scope.listBanner = [];
    $scope.listProduct = [];
    $scope.ListAccessory = [];

    /*   Dùng http gọi method GET thông qua địa chỉ tới API lấy dữ liệu.
      GET : trả về promise ( là 1 obj biểu diễn kết quả của thao tác bất đồng bộ )

      1. Thao tác ko đồng bộ : Là việc ko chờ kết quả trả về ngay từ server... mà tiếp tục các thao tác khác. 
      2. promise : obj biểu diễn kq của 1 thao tác ko đồng bộ. 
      2.1 Nó có 3 status : pending(chờ)/fulfilled(thành công)/rejected(thất bại). 
      2.2 Khi promise đc tạo : nó ở trạng thái pending. 
      2.3 Tùy vào result mà chuyển sang 2 status còn lại. 
      2.4 () contructor promise : 
      + nó sẽ chạy 1 hàm callback vs 2 parameter là resolve & reject. Đc cung cấp bở promise để thông báo kq của thao tác bất đồng bộ.
      + Nếu thành công -> Gọi hàm resolve & truyền vào obj response ( chứa in4 phản hồi từ API ). khi hàm resolve đc gọi vs kq trả về -> promise chuyển status + truyền kết quả cho các hàm xử lý. 
      ++ Hàm xử lý kq : là hàm callback đc truyền vào hàm then() của promise. Để xử lý kq khi promise đc giải quyết/từ chối.
      + Nếu thất bại   -> Gọi hàm reject và truyền vào obj error ( chứa in4 về lỗi từ API ).
  
      3.hàm callback : là một hàm đc truyền vào 1 hàm khác như 1 parameters. Và đgọi lại khi có kq trả về từ hàm gọi nó.
      3.1 Hàm callback :có 2 parameters : error & response. Chứa in4 về error hoặc db từ server.
      3.2 Dùng xử lý kq trả về từ thao tác bất đồng bộ. 
  
      Hàm then & catch : Là 2 method của obj promise. Dùng xử lý các thao tác bất đồng bộ
      Then : có thể nhận 1||2 tham số.Là 2 hàm callback. tham số thứ 1 chạy thi nhận về kq thành công. Ngược lại là tham số thứ 2. 
      + Hàm then nhận về kq từ hàm resolve.
      catch : nhận vào 1 hàm callback. Khi promise bị từ chối. Có thể dùng nếu ko muỗn truyền tham số thứ 2 cho hàm then() để đoạn cod rõ ràng hơn.
      response : Là db server gửi về cho client khi gửi 1 y.c http đến server. 
      response chứa các in4 như : status , title , db , datatyle. */
    //Trog đoạn này hàm successCallBack nhận kq trả về ( response ) từ hàm resolve của promise. 
    // Duyệt qua mảng apiUrls và gọi các yêu cầu API
    apiUrls.forEach(function (url, index) {
        $http.get(url).then(function (response) {
            // Gán dữ liệu nhận được từ API vào các mảng tương ứng
            switch (index) {
                case 0:
                    $scope.listCarousel = response.data;
                    console.log("Đã tải xog ListCarousel");
                    break;
                case 1:
                    $scope.listBanner = response.data;
                    console.log("Đã tải xog listBanner");
                    break;
                case 2:
                    $scope.listProduct = response.data;
                    console.log("Đã tải xog listProduct");
                    console.log($scope.listProduct);
                    break;
                case 3:
                    $scope.ListAccessory = response.data;
                    console.log("Đã tải xog ListAccessory");
                    break;
                default:
                    break;
            }
        }).catch(function (error) {
            // Xử lý lỗi nếu có
            console.log("Error connection API " + url);
        });
    });

    // #1. Thực hiện đếm ngược cho thời gian hotSale
    $scope.timeHotSale = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    var end = new Date("2024-02-23");/* Khởi tạo ngày kết thúc */
    function updateCountdown() {
        var now = new Date();/* Lấy thời gian hiện tại */
        var distance = end - now;/* Tính khoảng cách giữa thời gian hiện tại và thời gian kết thúc (tính bằng mili giây) */
        if (distance <= 0) {/* Nếu khoảng cách nhỏ hơn hoặc bằng 0, tức là đã hết thời gian */
            clearInterval(timer);/*  Dừng bộ đếm ngược */
            alert("Đã hết thời gian!");/* Thông báo */
            return;/* Thoát khỏi hàm */
        }
        // Tính số ngày, giờ, phút, giây còn lại
        $scope.$apply(function () {
            $scope.timeHotSale.days = Math.floor(distance / (1000 * 60 * 60 * 24)) + " Days";
            $scope.timeHotSale.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + " Hours";
            $scope.timeHotSale.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) + " Minutes";
            $scope.timeHotSale.seconds = Math.floor((distance % (1000 * 60)) / 1000) + " Seconds";
        });
    }
    setInterval(updateCountdown, 1000);

    // #2.Event icon-heart : Khi click vào icon-heart --> heart-icon chuyển sang màu đỏ.
    // Lấy tất cả các phần tử có lớp fa-heart ( heart-icon )
    window.onload = function () {
        heart_icons = document.getElementsByClassName("fa-heart");
        for (var i = 0; i < heart_icons.length; i++) {
            heart_icons[i].onclick = click_heart_icon;
        }
        function click_heart_icon() {
            // Kiểm tra màu hiện tại và đổi sang màu khác
            var heart_icon = this;
            if (heart_icon.style.color == "red") {
                heart_icon.style.color = "grey";
            } else {
                heart_icon.style.color = "red";
            }
        }
    }
    // #3.Chạy sau khi giao diện chạy xog để có thể tooltip.
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

}