myApp.controller("_asideCtrl", function ($scope) {
    $scope.selectedTabIndex = 0;
    $scope.onItemClick = function (index) {
        // Cập nhật tab được chọn
        $scope.selectedTabIndex = index;
    }

})