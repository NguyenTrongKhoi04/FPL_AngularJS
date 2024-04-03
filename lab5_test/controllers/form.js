var app = angular.module("myRoute", []);



app.controller("myController", function($scope) {
     $scope.datas =[
        {
            name : 'Mark',
            office: 'CA',
            age : 21,
            startdate: '2018/04/21',
            salary : '$110.800',
            status: 'Pending'
        },
        {
            name : 'Jacob',
            office: 'CA',
            age : 22,
            startdate: '2018/04/22',
            salary : '$110.800',
            status: 'Pendingw'
        },
        {
            name : 'Larry',
            office: 'CA',
            age : 23,
            startdate: '2018/04/23',
            salary : '$110.800',
            status: 'Pendings'
        },
        {
            name : 'Harry',
            office: 'CA',
            age : 24,
            startdate: '2018/04/24',
            salary : '$110.800',
            status: 'Pending'
        },
        {
            name : 'Anderson',
            office: 'CA',
            age : 25,
            startdate: '2018/04/25',
            salary : '$110.800',
            status: 'Pendingw'
        },
     ]
 
    
});