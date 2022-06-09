angular.module('ThuvienCtr', ['ngAnimate', 'ui.bootstrap'])
    .controller("ThuvienCtr", ['$scope', '$rootScope', '$http', '$filter', 'Upload', '$interval', '$state', '$stateParams', '$sce', '$timeout', '$window', function ($scope, $rootScope, $http, $filter, Upload, $interval, $state, $stateParams, $sce, $timeout, $window) {
        $scope.option = {
            numPerPage: 30,
            currentPage: 1,
            Total: 0,
            Pages: [30, 50, 100, 200, 500],
            totalpage: 1,
        };
        $scope.List_Thuvien = function (topic_id) {
            //$scope.ListTop5_Tintuc(topic_id);
            $scope.ob.Topic_ID = topic_id;
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "CMS_News_ListHome",
                    pas: [
                        { "par": "Topic_ID", "va": topic_id },
                        { "par": "p", "va": $scope.option.currentPage },
                        { "par": "pz", "va": $scope.option.numPerPage }
                    ]
                },
                contentType: 'application/json; charset=utf-8'
            }).then(function (res) {
                if (res.data.error === 1) {
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Thông báo',
                        text: 'Có lỗi khi load dữ liệu thư viện!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.thuviens = data;
                $scope.thuviens_all = dataCC[3];
                $scope.option.Total = dataCC[1][0].total;
                $scope.MaxSTTThuvien = dataCC[2][0].maxSTT;
                $scope.option.noOfPages = Math.ceil($scope.option.Total / $scope.option.numPerPage);
                $scope.paxpz = ($scope.option.currentPage - 1) * $scope.option.numPerPage;
                closeswal();
                $(".top-page").animate({ scrollTop: 0 }, 0);
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        $scope.GetDetail_Tintuc = function (t) {
            $scope.ob.detail_thuvien = true;
            $scope.Thuvien = t;
        }
        $scope.initOne = function () {
            $scope.ob = { detail_thuvien: false };
            $scope.Topic = $rootScope.topics_thuvien.find(x => x.Topic_ID === $stateParams.id);
            $scope.$watch('option.currentPage', function (newVal, oldVal) {
                $scope.List_Thuvien($stateParams.id);
            }, true);
        };
        $scope.initOne();
    }]);