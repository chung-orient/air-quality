angular.module('Ad_TintucCtr', ['ngAnimate', 'ui.bootstrap'])
    .controller("Ad_TintucCtr", ['$scope', '$rootScope', '$http', '$filter', 'Upload', '$interval', '$state', '$stateParams', '$sce', '$timeout', '$window', function ($scope, $rootScope, $http, $filter, Upload, $interval, $state, $stateParams, $sce, $timeout, $window) {
        //--------------------Defined-----------------------
        $scope.ListNewType = [
            { value: 0, text: 'Tin tức' },
            { value: 1, text: 'Thư viện' }
        ]
        $scope.ListTrangthai = [
            { value: 0, text: 'Khoá' },
            {value: 1, text: 'Kích hoạt'}
        ]
        $scope.option = {
            numPerPage: 30,
            currentPage: 1,
            sort: "IsOrder",
            tenSort: "IsOrder",
            ob: "desc",
            Status: null,
            tenStatus: "Tất cả",
            Total: 0,
            View: 0,
            Phanloai: null,
            Nhom: null,
            Pages: [30, 50, 100, 200, 500],
            totalpage: 1,
            s: ""
        }
        $scope.setPageSize = function (pz) {
            $scope.option.currentPage = 1;
            $scope.option.numPerPage = pz;
            $scope.List_Tintuc();
        };
        $scope.search = function () {
            $scope.option.currentPage = 1;
            $scope.List_Tintuc();
            $(".searchbar.true>input").focus();
        };
        $scope.ModalViewEditTintuc = function (t) {
            $scope.News_ID_View = t.News_ID;
            t.selectRow = true;
            $scope.Modal_AddTintuc("update");
        };
        $scope.Modal_AddTintuc = function (type) {
            if (type === 'add') {
                $scope.modalTitle = "Thêm mới tin tức";
                $scope.focusBtnAdd = true;
                $scope.Tintuc = {
                    News_ID: null, IsActive: true, IsHot: false, Users_ID: $rootScope.login.u.Users_ID, IsOrder: $scope.MaxSTTTintuc + 1, NewType: 0
                };
                $scope.hinhanhtin = null;
                CKEDITOR.instances["Contents"].setData("");
                $("form.ng-dirty").removeClass("ng-dirty");
                $("#ModalAddTintuc").modal("show");
            }
            else {
                $scope.modalTitle = "Cập nhật tin tức";
                $http({
                    method: "POST",
                    url: "Func/callProc",
                    data: {
                        proc: "CMS_News_GetByID", pas: [
                            { "par": "News_ID", "va": $scope.News_ID_View }
                        ]
                    },
                    contentType: 'application/json; charset=utf-8'
                }).then(function (res) {
                    if (res.data.error !== 1) {
                        var data = JSON.parse(res.data.data);
                        $scope.Tintuc = data[0][0];
                        CKEDITOR.instances["Contents"].setData($scope.Tintuc.Contents);
                        $("#ModalAddTintuc").modal("show");
                    }
                });
            }
        };
        $scope.Add_Tintuc = function (frm) {
            if ($scope.loadding) {
                return false;
            }
            if (!valid(frm)) {
                Swal.fire({
                    type: 'warning',
                    icon: 'warning',
                    title: 'Thông báo',
                    text: 'Vui lòng nhập thông tin trường có dấu *'
                });
                return false;
            }
            $scope.Tintuc.Contents = CKEDITOR.instances["Contents"].getData();
            $scope.Tintuc.Contents = $scope.Tintuc.Contents.replace(/\n/g, "<br>");
            $scope.loadding = true;
            swal.showLoading();
            $http({
                method: 'POST',
                url: "Danhmuc/Update_Tintuc",
                headers: {
                    'Content-Type': undefined,
                },
                transformRequest: function () {
                    var formData = new FormData();
                    formData.append("tintuc", JSON.stringify($scope.Tintuc));
                    if ($scope.hinhanhtin) {
                        formData.append('anhtin', $scope.hinhanhtin, $scope.hinhanhtin.name);
                    }
                    return formData;
                }
            }).then(function (res) {
                $scope.loadding = false;
                closeswal();
                if (res.data.error === 2) {
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Thông báo',
                        text: res.data.ms
                    });
                    return false;
                }
                else if (res.data.error !== 0) {
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Thông báo',
                        text: 'Có lỗi khi thêm tin tức!'
                    });
                    return false;
                }
                $("#ModalAddTintuc").modal("hide");
                $scope.option.s = "";
                $scope.option.currentPage = 1;
                $scope.List_Tintuc();
                showtoastr('Đã cập nhật thành công !');
            }, function (response) { // optional
                $scope.loadding = false;
            });
        };
        $scope.List_Tintuc = function () {
            $scope.CheckAll = false;
            $scope.focusBtnAdd = false;
            $scope.focusBtnImport = false;
            $scope.checkLen = 0;
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "CMS_News_List",
                    pas: [
                        { "par": "p", "va": $scope.option.currentPage },
                        { "par": "pz", "va": $scope.option.numPerPage },
                        { "par": "sort", "va": $scope.option.sort },
                        { "par": "ob", "va": $scope.option.ob },
                        { "par": "status", "va": $scope.option.Status },
                        { "par": "s", "va": $scope.option.s }
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
        $scope.List_Topic = function () {
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "CMS_Topic_ListAllTD",
                    pas: [
                        { "par": "a", "va": null },
                    ]
                },
                contentType: 'application/json; charset=utf-8'
            }).then(function (res) {
                if (res.data.error === 1) {
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Thông báo',
                        text: 'Có lỗi khi load dữ liệu topic!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.topics = data;
            });
        };
        // Delete Can cu
        $scope.Del_Tintuc = function (rowto) {
            Swal.fire({
                title: 'Xác nhận?',
                text: "Bạn có muốn xóa các tin tức đã chọn không?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2196f3',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có!',
                cancelButtonText: 'Không!'
            }).then((result) => {
                if (result.value) {
                    $scope.arr = [];
                    angular.forEach(rowto, function (value, key) {
                        if (rowto[key].checked) {
                            $scope.arr.push(rowto[key].News_ID);
                        }
                    });
                    $http({
                        method: "POST",
                        url: "/Danhmuc/Del_Tintuc",
                        data: { t: $rootScope.login.tk, ids: $scope.arr },
                        contentType: 'application/json; charset=utf-8'
                    }).then(function (res) {
                        if (res.data.error === 1) {
                            Swal.fire({
                                icon: 'error',
                                type: 'error',
                                title: 'Thông báo',
                                text: "Bạn không thể xóa tin tức vì còn tồn tại dữ liệu liên quan !"
                            });
                            return false;
                        } else {
                            $scope.arr = [];
                            $scope.checkLen = 0;
                            $scope.option.s = "";
                            $scope.option.currentPage = 1;
                            $scope.List_Tintuc();
                            showtoastr('Đã xóa dữ liệu thành công !');
                        }
                    });
                }
            });
        };
        //-----------------Common----------------
        $scope.inputFile = function (ev) {
            $(ev.target).closest('.box-logoimg').find('input[type=file]').trigger('click');
        }
        $scope.imageUpload = function (f) {
            var ms = false;
            angular.forEach(f, function (fi) {
                if (fi.size > 1 * 1024 * 1024) {
                    ms = true;
                } else {
                    fi.Dinhdang = fi.name.substring(fi.name.lastIndexOf(".") + 1);
                }
                fi.name = "anhtintuc" + fi.name;
            });
            if (ms) {
                Swal.fire({
                    icon: 'warning',
                    type: 'warning',
                    title: '',
                    text: 'Bạn chỉ được upload file có dung lượng tối đa 1MB!'
                });
            }
            else {
                $scope.hinhanhtin = f[0];
            }
        };
        $scope.clearAnhnen = function () {
            $scope.hinhanhtin = null;
            if ($scope.Tintuc.Images)
                $scope.Tintuc.Images = null;
        };
        $scope.CheckChecked = function (data) {
            var filtereds = $filter('filter')(data, { checked: true }, true);
            data.forEach(function (t) {
                t.selectRow = false;
            });
            $scope.checkLen = filtereds.length;
        };
        $scope.toggleAll = function (rowto, check) {
            $scope.CheckAll = check;
            angular.forEach(rowto, function (value, key) {
                rowto[key].checked = $scope.CheckAll;
            });
            $scope.CheckChecked(rowto);
        };
        //-----------------------------
        $scope.initOne = function () {
            $scope.tooltipanh = 'Phóng to ảnh';
            $scope.tooltipTC = 'Tùy chọn chức năng';
            $scope.tooltipModal = 'Phóng to';
            $scope.ob = { detail_news: false };
            $scope.List_Topic();
            $scope.$watch('option.currentPage', $scope.List_Tintuc);
        };
        $scope.initOne();
    }]);