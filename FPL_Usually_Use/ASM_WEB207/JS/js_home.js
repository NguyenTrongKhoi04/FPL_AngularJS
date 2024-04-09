// window.onload : Chỉ định hàm này sẽ chạy khi trình duyệt đã tải xong mọi thứ ( ảnh/CSS/JS các tệp tin HTML đc nh )
window.onload = function () {

    // 1. Thực hiện đếm ngược cho thời gian hotSale
    // Lấy các phần tử HTML có lớp countdown
    var days = document.getElementsByClassName("countdown")[0];
    var hours = document.getElementsByClassName("countdown")[1];
    var minutes = document.getElementsByClassName("countdown")[2];
    var seconds = document.getElementsByClassName("countdown")[3];

    // Đặt thời gian kết thúc là ngày 31 tháng 1 năm 2024
    var end = new Date("2024-02-23");

    // Hàm cập nhật bộ đếm ngược
    function updateCountdown() {
        // Lấy thời gian hiện tại
        var now = new Date();
        // Tính khoảng cách giữa thời gian hiện tại và thời gian kết thúc (tính bằng mili giây)
        var distance = end - now;
        // Nếu khoảng cách nhỏ hơn hoặc bằng 0, tức là đã hết thời gian
        if (distance <= 0) {
            // Dừng bộ đếm ngược
            clearInterval(timer);
            // Hiển thị thông báo
            alert("Đã hết thời gian!");
            // Thoát khỏi hàm
            return;
        }
        // Tính số ngày, giờ, phút, giây còn lại
        var d = Math.floor(distance / (1000 * 60 * 60 * 24));
        var h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((distance % (1000 * 60)) / 1000);
        // Cập nhật nội dung của các phần tử HTML
        days.innerHTML = d + " Days";
        hours.innerHTML = h + " Hours";
        minutes.innerHTML = m + " Minutes";
        seconds.innerHTML = s + " Seconds";
    }
    // Tạo một biến timer để lưu trữ id của hàm setInterval
    var timer;
    // Hàm bắt đầu bộ đếm ngược
    function startCountdown() {
        // Gọi hàm updateCountdown mỗi giây và lưu id vào biến timer
        timer = setInterval(updateCountdown, 1000);
    }
    // Gọi hàm startCountdown khi trang web được tải xong
    //window.onload = startCountdown;
    setTimeout(() => {
        startCountdown()
    }, 1000)



    // 2.Event icon-heart : Khi click vào icon-heart --> heart-icon chuyển sang màu đỏ.
    // Lấy tất cả các phần tử có lớp fa-heart ( heart-icon )
    var heart_icons = document.getElementsByClassName("fa-heart");

    // Duyệt qua từng phần tử và gán hàm click_heart_icon cho sự kiện onclick
    for (var i = 0; i < heart_icons.length; i++) {
        heart_icons[i].onclick = click_heart_icon;
    }

    // Hàm click_heart_icon sẽ thay đổi màu của phần tử được click
    function click_heart_icon() {
        // Lấy phần tử được click bằng cách sử dụng từ khóa this
        var heart_icon = this;
        // Kiểm tra màu hiện tại và đổi sang màu khác
        if (heart_icon.style.color == "red") {
            heart_icon.style.color = "grey";
        } else {
            heart_icon.style.color = "red";
        }
    }
    

}
