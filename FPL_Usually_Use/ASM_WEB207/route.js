var app = angular.module("myApp", ["ngRoute"]);
//Đặt trc app.run() để thiết lập lại giá trị của isAuthenticated và id nếu người dùng đã login
app.service('globalData', function () {
    const userData = {
        authenticated: false,
        id: null,
        fullName: null,
        phoneNumber: null,
        email: null,
        password: null,
        gender: null,
        image_user: null,
        role: null,
    };
    this.getUserData = () => userData;

    this.setUserData = (newData) => {
        Object.assign(userData, newData);
    };
    this.setCookie = (name, value) => {
        document.cookie = name + "=" + (value || "") + "; path=/";
    }
});

app.run(function ($rootScope, globalData) {
    $rootScope.showSidebar = true;/* Để thiết lập qua trang nào đó nó có hiện sitebar hay ko. */
    // g.sử có cookie sau : username=johndoe;authenticated=true;sessionid=123456
    //  Lấy chuỗi cookie từ broswer lưu trữ () biến cookies. Dùng split chia chuỗi cookies thành các cặp name-value dựa vào ;
    var cookies = document.cookie.split(";");// ["username=johndoe", "authenticated=true", "sessionid=123456"]
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'authenticated' && value === 'true') {
            const userAttributes = ['authenticated', 'id', 'fullName', 'phoneNumber', 'email', 'password', 'gender', 'image_user', 'role'];
            const newData = userAttributes.reduce((acc, attribute) => {
                const cookieName = `${attribute}=`;
                const cookieValue = cookies.find(cookie => cookie.trim().startsWith(cookieName));
                if (cookieValue) {
                    if (attribute === "authenticated") {
                        acc[attribute] = Boolean(cookieValue.trim().split('=')[1]); // Nếu thuộc tính là authenticated, chuyển chuỗi thành boolean
                    } else {
                        acc[attribute] = cookieValue.trim().split('=')[1]; // Nếu không, giữ nguyên giá trị chuỗi
                    }
                }
                return acc;//trả về acc trog mỗi lần lặp
            }, {});
            if (newData.id) {//Kiểm tra có id? 
                globalData.setUserData(newData);
            }
        }
    }
    console.log("cookies : " + cookies);
    console.log("Dữ liệu mới : " + JSON.stringify(globalData.getUserData()));
});

app.config(function ($routeProvider) {
    $routeProvider
        // Default mặc định gọi ra cái này.
        .when("/", {
            templateUrl: "view/home.html",
            controller: homeCtrl
        })
        .when("/home", {
            templateUrl: "view/home.html",
            controller: homeCtrl
        })
        .when("/listProduct", {
            templateUrl: "view/listProduct.html",
        })
        .when("/product/:id", {
            templateUrl: "view/product.html",
            controller: productCtrl
        }).when("/register", {
            templateUrl: "view/register.html",
            controller: registerCtrl
        }).when("/login", {
            templateUrl: "view/login.html",
            controller: loginCtrl
        }).when("/listCart", {//Dánh sách sản phẩm trong giỏ hàng
            templateUrl: "view/cart.html",
            controller: cartCtrl
        })
        .otherwise({// Trường hợp ko tồn tại. 
            template: "<h1>Lỗi 404</h1><p>Trang không tồn tại</p>"
        });
});

