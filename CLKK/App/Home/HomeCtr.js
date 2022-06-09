angular.module('HomeCtr', ['ngAnimate', 'ui.bootstrap'])
    .controller("HomeCtr", ['$scope', '$rootScope', '$http', '$filter', 'Upload', '$interval', '$state', '$stateParams', '$sce', '$timeout', '$window', function ($scope, $rootScope, $http, $filter, Upload, $interval, $state, $stateParams, $sce, $timeout, $window) {
        $scope.ListTD_Tramquantrac = function () {
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_Tramquantrac_ListTD",
                    pas: [
                        { "par": "Loaiquantrac_ID", "va": "3BAF4349669E45818774D576E701EC69" }
                    ]
                },
                contentType: 'application/json; charset=utf-8'
            }).then(function (res) {
                if (res.data.error === 1) {
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Thông báo',
                        text: 'Có lỗi khi load dữ liệu trạm quan trắc!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.tramquantracs = data;
                $scope.ob.Tramquantrac_ID = $scope.tramquantracs[0].Tramquantrac_ID;
                $scope.$watch('ob.Time', $scope.Get_Thongso);
                closeswal();
                $(".top-page").animate({ scrollTop: 0 }, 0);
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        $scope.List_AQIDetail = function () {
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_AQIDetail_List",
                    pas: [
                        { "par": "a", "va": null }
                    ]
                },
                contentType: 'application/json; charset=utf-8'
            }).then(function (res) {
                if (res.data.error === 1) {
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Thông báo',
                        text: 'Có lỗi khi load dữ liệu mô tả AQI!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.aqidetails = data;
                closeswal();
            });
        };
        $scope.Get_Thongso = function () {
            if ($scope.ob.Time) {
                swal.showLoading();
                $http({
                    method: "POST",
                    url: "Func/callProc",
                    data: {
                        proc: "TD_Thongso_GetAQI",
                        pas: [
                            { "par": "Tramquantrac_ID", "va": $scope.ob.Tramquantrac_ID },
                            { "par": "Ngaythuchien", "va": $scope.ob.Time }
                        ]
                    },
                    contentType: 'application/json; charset=utf-8'
                }).then(function (res) {
                    if (res.data.error === 1) {
                        Swal.fire({
                            icon: 'error',
                            type: 'error',
                            title: 'Thông báo',
                            text: 'Có lỗi khi load dữ liệu thông số!'
                        });
                        return false;
                    }
                    let dataCC = JSON.parse(res.data.data);
                    let data = dataCC[0];
                    if (!data[0]) {
                        Swal.fire({
                            icon: 'warning',
                            type: 'warning',
                            title: 'Thông báo',
                            text: 'Không có dữ liệu vào thời gian này!'
                        });
                        return false;
                    }
                    $scope.AQIView = data[0];
                    $scope.AQIViewD = dataCC[1];
                    $scope.Temp = Math.round($scope.AQIViewD.find(x => x.Tenthongso === "Temp").Giatrithongso);
                    $scope.RH = Math.round($scope.AQIViewD.find(x => x.Tenthongso === "RH").Giatrithongso);
                    $scope.AQIDetail = $scope.aqidetails.find(x => x.min <= $scope.AQIView.AQI && $scope.AQIView.AQI <= x.max);
                    closeswal();
                    $(".top-page").animate({ scrollTop: 0 }, 0);
                    showtoastr('Đã tải dữ liệu thành công !');
                });
            }
        };
        $scope.initOne = function () {
            $scope.ob = {};
            let stateName = $state.current.name;
            switch (stateName) {
                case 'home':
                    $scope.List_AQIDetail();
                    $scope.ListTD_Tramquantrac();
                    //$scope.$watch('option.currentPage', $scope.List_Loaiquantrac);
                    break;
            }
        };
        $scope.initOne();
    }]);