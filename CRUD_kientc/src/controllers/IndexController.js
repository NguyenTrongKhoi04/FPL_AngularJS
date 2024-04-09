window.IndexController = function($scope, $http, $location){

    let apiUrl = "http://localhost:3000/products";

    $scope.getData = function(){

        $http.get(apiUrl).then(function(response){

            if(response.status == 200){
                $scope.model = response.data;
            }

        });

    }

    $scope.getData();

    $scope.onDelete = function(id){

        let confirm = window.confirm("Xác nhận xóa");
        
        if(confirm){
            $http.delete(`${apiUrl}/${id}`).then(function(response){

                if(response.status == 200){
                    $scope.getData();
                }

            });
        }

    }

    $scope.onDetail = function(id){
        
        $location.path(`/detail/${id}`)

    }

    
    $scope.onUpdate = function(id){
        
        $location.path(`/edit/${id}`)

    }

}


window.CreateController = function($scope, $http, $location){

    let apiUrl = "http://localhost:3000/products";

    $scope.checkData = {
        name : false,
        price : false
    }

    $scope.onSubmit = function(){

        let flag = false;

        if(!$scope.inputValue || !$scope.inputValue.name){
            $scope.checkData.name = true;
            flag = true;
        }else{
            $scope.checkData.name = false;
        }

        if(!$scope.inputValue || !$scope.inputValue.price){
            $scope.checkData.price = true;
            flag = true;
        }else{
            $scope.checkData.price = false;
        }

        if(!flag){

            let newItem = {
                ...$scope.inputValue
            };

            $http.post(apiUrl, newItem).then(function(res){
                if(res.status == 201){
                    $location.path('/index');
                }
            });


        }

    }

}

window.DetailController = function($scope, $http, $routeParams){

    let apiUrl = "http://localhost:3000/products";

    let id = $routeParams.id;

    $scope.getDetail = function(){

        $http.get(`${apiUrl}/${id}`).then(function(res){
            if(res.status == 200){
                $scope.p = res.data;
            }
        });

    }

    $scope.getDetail();

}

window.EditController = function($scope, $http, $routeParams, $location){

    let apiUrl = "http://localhost:3000/products";

    let id = $routeParams.id;

    $scope.getProductInfor = function(){
        $http.get(`${apiUrl}/${id}`).then(function(res){
            if(res.status == 200){
                $scope.model = res.data;
                $scope.inputValue = {
                    'name': res.data.name,
                    'price': res.data.price
                };
            }
        }).catch(function(err){
            $scope.message = `${err.statusText} product with id ${id}`;
        });
    }

    $scope.getProductInfor();

    $scope.checkData = {
        name : false,
        price : false
    }

    $scope.onSubmit = function(){

        let flag = false;

        if(!$scope.inputValue || !$scope.inputValue.name){
            $scope.checkData.name = true;
            flag = true;
        }else{
            $scope.checkData.name = false;
        }

        if(!$scope.inputValue || !$scope.inputValue.price){
            $scope.checkData.price = true;
            flag = true;
        }else{
            $scope.checkData.price = false;
        }

        if(!flag){

            let updateItem = {
                ...$scope.inputValue
            };

            $http.put(`${apiUrl}/${id}`, updateItem).then(function(res){
                if(res.status == 200){
                    $location.path('/index');
                }
            });


        }

    }

}


