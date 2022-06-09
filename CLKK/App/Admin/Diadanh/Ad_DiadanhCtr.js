angular.module('Ad_DiadanhCtr', ['ngAnimate', 'ui.bootstrap'])
    .controller("Ad_DiadanhCtr", ['$scope', '$rootScope', '$http', '$filter', 'Upload', '$interval', '$state', '$stateParams', '$sce', '$timeout', '$window', function ($scope, $rootScope, $http, $filter, Upload, $interval, $state, $stateParams, $sce, $timeout, $window) {
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
            sort: "STT",
            tenSort: "STT",
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
            $scope.BindListAll();
        };
        $scope.search = function () {
            $scope.option.currentPage = 1;
            $scope.BindListAll();
            $(".searchbar.true>input").focus();
        };
        $scope.Refresh = function () {
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
            $scope.BindListAll();
        };
        $scope.ListSortCC = [
            { id: 'STT', text: "Thứ tự" },
            { id: 'Ten', text: "Tên" },
            { id: 'Trangthai', text: "Trạng thái" }
        ]
        $scope.setSortCC = function (t) {
            $scope.option.sort = t.id;
            $scope.option.ob = 'asc';
            $scope.BindListAll();
        }
        $scope.BindListAll = function () {
            let stateName = $state.current.name;
            switch (stateName) {
                case 'ad_diadanh':
                    $scope.List_Diadanh();
                    break;
                case 'ad_coquanquanly':
                    $scope.List_CoquanQuanly();
                    break;
            }
        };
        //---------------Địa danh------------------
        $scope.ModalViewEditDiadanh = function (t) {
            $scope.Diadanh_ID_View = t.Diadanh_ID;
            t.selectRow = true;
            $scope.Modal_AddDiadanh("update");
        };
        $scope.Modal_AddDiadanh = function (type) {
            $scope.List_Par_Diadanh();
            if (type === 'add') {
                $scope.modalTitle = "Thêm mới địa danh";
                $scope.focusBtnAdd = true;
                $scope.Diadanh = {
                    Diadanh_ID: null, Trangthai: true, STT: $scope.MaxSTTDiadanh + 1, Level: 1
                };
                $("form.ng-dirty").removeClass("ng-dirty");
                $("#ModalAddDiadanh").modal("show");
            }
            else {
                $scope.modalTitle = "Cập nhật địa danh";
                $http({
                    method: "POST",
                    url: "Func/callProc",
                    data: {
                        proc: "TD_Diadanh_GetByID", pas: [
                            { "par": "Diadanh_ID", "va": $scope.Diadanh_ID_View }
                        ]
                    },
                    contentType: 'application/json; charset=utf-8'
                }).then(function (res) {
                    if (res.data.error !== 1) {
                        var data = JSON.parse(res.data.data);
                        $scope.Diadanh = data[0][0];
                        let idx = $scope.diadanhchas.findIndex(x => x.Diadanh_ID === $scope.Diadanh.Diadanh_ID);
                        if (idx > -1) {
                            $scope.diadanhchas.splice(idx, 1);
                        };
                        $("#ModalAddDiadanh").modal("show");
                    }
                });
            }
        };
        $scope.Add_Diadanh = function (frm) {
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
            if ($scope.Diadanh.CapCha_ID) {
                $scope.Diadanh.Level = $scope.diadanhchas.find(x => x.Diadanh_ID === $scope.Diadanh.CapCha_ID).Level + 1;
            }
            $scope.loadding = true;
            swal.showLoading();
            $http({
                method: 'POST',
                url: "Danhmuc/Update_Diadanh",
                data: {
                    model: $scope.Diadanh
                },
                contentType: 'application/json; charset=utf-8'
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
                        text: 'Có lỗi khi thêm địa danh!'
                    });
                    return false;
                }
                $("#ModalAddDiadanh").modal("hide");
                $scope.option.s = "";
                $scope.option.currentPage = 1;
                $scope.List_Diadanh();
                showtoastr('Đã cập nhật thành công !');
            }, function (response) { // optional
                $scope.loadding = false;
            });
        };
        $scope.List_Diadanh = function () {
            $scope.CheckAll = false;
            $scope.focusBtnAdd = false;
            $scope.focusBtnImport = false;
            $scope.checkLen = 0;
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_Diadanh_List",
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
                        text: 'Có lỗi khi load dữ liệu địa danh!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.diadanhs = data;
                $scope.diadanhs_all = dataCC[3];
                $scope.option.Total = dataCC[1][0].total;
                $scope.MaxSTTDiadanh = dataCC[2][0].maxSTT;
                $scope.option.noOfPages = Math.ceil($scope.option.Total / $scope.option.numPerPage);
                $scope.paxpz = ($scope.option.currentPage - 1) * $scope.option.numPerPage;
                closeswal();
                $(".top-page").animate({ scrollTop: 0 }, 0);
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        $scope.List_Par_Diadanh = function () {
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_Diadanh_ListTD",
                    pas: [
                        { "par": "a", "va": "" }
                    ]
                },
                contentType: 'application/json; charset=utf-8'
            }).then(function (res) {
                if (res.data.error === 1) {
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Thông báo',
                        text: 'Có lỗi khi load dữ liệu địa danh!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.diadanhchas = data;
                closeswal();
                $(".top-page").animate({ scrollTop: 0 }, 0);
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        $scope.Del_Diadanh = function (rowto) {
            Swal.fire({
                title: 'Xác nhận?',
                text: "Bạn có muốn xóa các địa danh đã chọn không?",
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
                            $scope.arr.push(rowto[key].Diadanh_ID);
                        }
                    });
                    $http({
                        method: "POST",
                        url: "/Danhmuc/Del_Diadanh",
                        data: { t: $rootScope.login.tk, ids: $scope.arr },
                        contentType: 'application/json; charset=utf-8'
                    }).then(function (res) {
                        if (res.data.error === 1) {
                            Swal.fire({
                                icon: 'error',
                                type: 'error',
                                title: 'Thông báo',
                                text: "Bạn không thể xóa địa danh vì còn tồn tại dữ liệu liên quan !"
                            });
                            return false;
                        } else {
                            $scope.arr = [];
                            $scope.checkLen = 0;
                            $scope.option.s = "";
                            $scope.option.currentPage = 1;
                            $scope.List_Diadanh();
                            showtoastr('Đã xóa dữ liệu thành công !');
                        }
                    });
                }
            });
        };
        //---------------Cơ quan quản lý---------------
        $scope.ModalViewEditCoquanQuanly = function (t) {
            $scope.CoquanQuanly_ID_View = t.CoquanQuanly_ID;
            t.selectRow = true;
            $scope.Modal_AddCoquanQuanly("update");
        };
        $scope.Modal_AddCoquanQuanly = function (type) {
            $scope.List_Par_CoquanQuanly();
            $scope.List_Par_Diadanh();
            if (type === 'add') {
                $scope.modalTitle = "Thêm mới cơ quan quản lý";
                $scope.focusBtnAdd = true;
                $scope.CoquanQuanly = {
                    CoquanQuanly_ID: null, Trangthai: true, STT: $scope.MaxSTTCoquanQuanly + 1, Level: 1
                };
                $("form.ng-dirty").removeClass("ng-dirty");
                $("#ModalAddCoquanQuanly").modal("show");
            }
            else {
                $scope.modalTitle = "Cập nhật cơ quan quản lý";
                $http({
                    method: "POST",
                    url: "Func/callProc",
                    data: {
                        proc: "TD_CoquanQuanly_GetByID", pas: [
                            { "par": "CoquanQuanly_ID", "va": $scope.CoquanQuanly_ID_View }
                        ]
                    },
                    contentType: 'application/json; charset=utf-8'
                }).then(function (res) {
                    if (res.data.error !== 1) {
                        var data = JSON.parse(res.data.data);
                        $scope.CoquanQuanly = data[0][0];
                        let idx = $scope.coquanquanlychas.findIndex(x => x.CoquanQuanly_ID === $scope.CoquanQuanly.CoquanQuanly_ID);
                        if (idx > -1) {
                            $scope.coquanquanlychas.splice(idx, 1);
                        };
                        $("#ModalAddCoquanQuanly").modal("show");
                    }
                });
            }
        };
        $scope.Add_CoquanQuanly = function (frm) {
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
            if ($scope.CoquanQuanly.CapCha_ID) {
                $scope.CoquanQuanly.Level = $scope.coquanquanlychas.find(x => x.CoquanQuanly_ID === $scope.CoquanQuanly.CapCha_ID).Level + 1;
            }
            $scope.loadding = true;
            swal.showLoading();
            $http({
                method: 'POST',
                url: "Danhmuc/Update_CoquanQuanly",
                data: {
                    model: $scope.CoquanQuanly
                },
                contentType: 'application/json; charset=utf-8'
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
                        text: 'Có lỗi khi thêm cơ quan quản lý!'
                    });
                    return false;
                }
                $("#ModalAddCoquanQuanly").modal("hide");
                $scope.option.s = "";
                $scope.option.currentPage = 1;
                $scope.List_CoquanQuanly();
                showtoastr('Đã cập nhật thành công !');
            }, function (response) { // optional
                $scope.loadding = false;
            });
        };
        $scope.List_CoquanQuanly = function () {
            $scope.CheckAll = false;
            $scope.focusBtnAdd = false;
            $scope.focusBtnImport = false;
            $scope.checkLen = 0;
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_CoquanQuanly_List",
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
                        text: 'Có lỗi khi load dữ liệu cơ quan quản lý!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.coquanquanlys = data;
                $scope.coquanquanlys_all = dataCC[3];
                $scope.option.Total = dataCC[1][0].total;
                $scope.MaxSTTCoquanQuanly = dataCC[2][0].maxSTT;
                $scope.option.noOfPages = Math.ceil($scope.option.Total / $scope.option.numPerPage);
                $scope.paxpz = ($scope.option.currentPage - 1) * $scope.option.numPerPage;
                closeswal();
                $(".top-page").animate({ scrollTop: 0 }, 0);
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        $scope.List_Par_CoquanQuanly = function () {
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_CoquanQuanly_ListTD",
                    pas: [
                        { "par": "a", "va": "" }
                    ]
                },
                contentType: 'application/json; charset=utf-8'
            }).then(function (res) {
                if (res.data.error === 1) {
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Thông báo',
                        text: 'Có lỗi khi load dữ liệu cơ quan quản lý!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.coquanquanlychas = data;
                closeswal();
                $(".top-page").animate({ scrollTop: 0 }, 0);
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        $scope.Del_CoquanQuanly = function (rowto) {
            Swal.fire({
                title: 'Xác nhận?',
                text: "Bạn có muốn xóa các cơ quan quản lý đã chọn không?",
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
                            $scope.arr.push(rowto[key].CoquanQuanly_ID);
                        }
                    });
                    $http({
                        method: "POST",
                        url: "/Danhmuc/Del_CoquanQuanly",
                        data: { t: $rootScope.login.tk, ids: $scope.arr },
                        contentType: 'application/json; charset=utf-8'
                    }).then(function (res) {
                        if (res.data.error === 1) {
                            Swal.fire({
                                icon: 'error',
                                type: 'error',
                                title: 'Thông báo',
                                text: "Bạn không thể xóa cơ quan quản lý vì còn tồn tại dữ liệu liên quan !"
                            });
                            return false;
                        } else {
                            $scope.arr = [];
                            $scope.checkLen = 0;
                            $scope.option.s = "";
                            $scope.option.currentPage = 1;
                            $scope.List_CoquanQuanly();
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
            $scope.List_Par_Diadanh();
            let stateName = $state.current.name;
            switch (stateName) {
                case 'ad_diadanh':
                    $scope.$watch('option.currentPage', $scope.List_Diadanh);
                    break;
                case 'ad_coquanquanly':
                    $scope.$watch('option.currentPage', $scope.List_CoquanQuanly);
                    break;
            }
        };
        $scope.initOne();
    }]);