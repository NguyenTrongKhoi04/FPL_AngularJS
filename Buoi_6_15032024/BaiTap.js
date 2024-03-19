/**
 * TODO 1) khai báo 1 mảng đối tượng công đân
 * TODO 2) TÊn,sđt,năm sinh,cmt,giới tính (1:nam,2:nữ)
 * TODO 3) Hiện những thông tin sau: TÊn, sđt, cmt,tuôi
 * TODO 4) ĐKNV: >=19 && == Nam =>> đi nghĩa vụ
 */

var currentTime = new Date();
var currentYear = currentTime.getFullYear();
console.log(currentYear);
var app = angular.module("myapp", []).controller("myCtrl", ($scope) => {
  $scope.persons = [
    {
      name: "Trung",
      gender: 0,
      birthYear: 2000,
      phone: "096712390",
      cmt: "0891234544",
    },
    {
      name: "Khôi",
      gender: 1,
      birthYear: 2007,
      phone: "090012345",
      cmt: "0891234566",
    },
    {
      name: "Mạnh",
      gender: 0,
      birthYear: 2003,
      phone: "096744345",
      cmt: "0891234577",
    },
    {
      name: "Huy",
      gender: 1,
      birthYear: 2004,
      phone: "096718885",
      cmt: "0891234588",
    },
  ];

  $scope.getAge = function(birthYear) {
    console.log(currentYear - birthYear);
      return  currentYear - birthYear;
  }
  
});
