myApp.controller("_sitebarCtrl", function ($scope) {
    // Login lấy role + userName từ cookie
    console.log(document.cookie);
    const role = document.cookie.split("; ").find(cookie => cookie.startsWith("role=")).split("=")[1];
    const fullName = document.cookie.split("; ").find(cookie => cookie.startsWith("fullName=")).split("=")[1];
    $scope.wellcome = "Xin chào " + role + " : " + fullName;

    $scope.logOut = function () {
        conf = confirm("Bạn muốn đăng xuất?");
        if (conf) {
            // 1. xóa cookie đã thiết lập
            deleteAllCookies();//Call hàm xóa cookie
            alert("Đăng xuất thành công")
            window.location.href = '../index.html#!/home';// 2. Quay về view user
        } else {
            console.log("Hủy đăng xuất");
        }
    };

    function deleteAllCookies() {// Xóa tất cả cookie trong document.cookie
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            const path = '=; path=/';
            const domain = '; domain=' + window.location.hostname;
            document.cookie = name + path + domain + '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        }
    }

});