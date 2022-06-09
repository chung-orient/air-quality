angular.module('TintucCtr', ['ngAnimate', 'ui.bootstrap'])
    .controller("TintucCtr", ['$scope', '$rootScope', '$http', '$filter', 'Upload', '$interval', '$state', '$stateParams', '$sce', '$timeout', '$window', function ($scope, $rootScope, $http, $filter, Upload, $interval, $state, $stateParams, $sce, $timeout, $window) {
        $scope.option = {
            numPerPage: 30,
            currentPage: 1,
            Total: 0,
            Pages: [30, 50, 100, 200, 500],
            totalpage: 1,
        };
        $scope.List_Topic = function () {
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "CMS_Topic_ListTopicNews",
                    pas: [
                        { "par": "a", "va": '' }
                    ]
                },
                contentType: 'application/json; charset=utf-8'
            }).then(function (res) {
                closeswal();
                if (res.data.error === 1) {
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Thông báo',
                        text: 'Có lỗi khi load dữ liệu chủ đề!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.topics = data;
                $scope.List_Tintuc($scope.topics[0].Topic_ID);
            });
        }
        $scope.ListTop5_Tintuc = function (topic_id) {
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "CMS_News_ListTop5",
                    pas: [
                        { "par": "Topic_ID", "va": topic_id }
                    ]
                },
                contentType: 'application/json; charset=utf-8'
            }).then(function (res) {
                if (res.data.error === 1) {
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Thông báo',
                        text: 'Có lỗi khi load dữ liệu tin tức!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                $scope.top5_tintucs = dataCC[0];
            });
        }
        $scope.List_Tintuc = function (topic_id) {
            $scope.ListTop5_Tintuc(topic_id);
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
                        text: 'Có lỗi khi load dữ liệu tin tức!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.tintucs = data;
                $scope.tintucs_all = dataCC[3];
                $scope.option.Total = dataCC[1][0].total;
                $scope.MaxSTTTintuc = dataCC[2][0].maxSTT;
                $scope.option.noOfPages = Math.ceil($scope.option.Total / $scope.option.numPerPage);
                $scope.paxpz = ($scope.option.currentPage - 1) * $scope.option.numPerPage;
                closeswal();
                $(".top-page").animate({ scrollTop: 0 }, 0);
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        $scope.GetDetail_Tintuc = function (t) {
            $scope.ob.detail_news = true;
            $scope.Tintuc = t;
        }
        $scope.initOne = function () {
            $scope.ob = { detail_news: false };
            $scope.List_Topic();
        };
        $scope.initOne();
    }]);