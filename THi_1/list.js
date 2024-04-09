window.ListController = function($route, $http, $scope){
    const apiUrl = "http://localhost:3000/phone";

    $http.get(apiUrl).then((res) => {
        console.log(res);
        if (res.status == 200) {
            $scope.listPhone = res.data;
        }
    })
}