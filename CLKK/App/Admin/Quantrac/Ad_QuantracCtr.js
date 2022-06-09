angular.module('Ad_QuantracCtr', ['ngAnimate', 'ui.bootstrap'])
    .controller("Ad_QuantracCtr", ['$scope', '$rootScope', '$http', '$filter', 'Upload', '$interval', '$state', '$stateParams', '$sce', '$timeout', '$window', function ($scope, $rootScope, $http, $filter, Upload, $interval, $state, $stateParams, $sce, $timeout, $window) {
        //--------------------Defined-----------------------
        $scope.ListTrangthai = [
            { value: false, text: 'Khoá' },
            { value: true, text: 'Kích hoạt' }
        ]
        $scope.option = {
            numPerPage: 30,
            currentPage: 1,
            sort: "STT",
            tenSort: "STT",
            ob: "asc",
            Status: null,
            tenStatus: "Tất cả",
            Total: 0,
            View: 0,
            Phanloai: null,
            Nhom: null,
            Pages: [30, 50, 100, 200, 500],
            totalpage: 1,
            s: "",
            loaiquantracs: [],
            diadanhs: [],
            tramquantracs: [],
            fromdate: null,
            todate: null
        };
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
                sort: "STT",
                tenSort: "STT",
                ob: "asc",
                Status: null,
                tenStatus: "Tất cả",
                Total: 0,
                View: 0,
                Phanloai: null,
                Nhom: null,
                Pages: [30, 50, 100, 200, 500],
                totalpage: 1,
                s: "",
                loaiquantracs: [],
                diadanhs: [],
                tramquantracs: [],
                fromdate: null,
                todate: null
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
                case 'ad_loaiquantrac':
                    $scope.List_Loaiquantrac();
                    break;
                case 'ad_qcvn':
                    $scope.List_QCVN();
                    break;
                case 'ad_tramquantrac':
                    $scope.List_Tramquantrac();
                    break;
                case 'ad_thongsomau':
                    $scope.List_Thongsomau();
                    break;
                case 'ad_thongso':
                    $scope.List_Thongso();
                    break;
                case 'ad_laymau':
                    $scope.List_Laymau();
                    break;
                case 'ad_kiemduyet':
                    $scope.List_Kiemduyet();
                    break;
            }
        };
        //------------Adv Search-----------------
        $scope.complete_AdvSearch = function (string, m, $event, i, type) {
            var keyCode = $event.keyCode;
            if (keyCode === 40) {
                // Down
                $("ul.autoUser" + i).focus();
                $event.preventDefault();
            }
            if (!string) {
                string = "";
            }
            //string = string.replace("@", "");
            m["Focus" + i] = !m["Focus" + i];
            var output = [];
            switch (type) {
                case 'diadanh':
                    angular.forEach($scope.diadanhchas, function (u) {
                        if ((u.Diadanh_Ten || "").toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                            output.push(u);
                        }
                    });
                    $scope.diadanhs_advsearch = output;
                    if ($scope.option.diadanhs.length > 0) {
                        angular.forEach($scope.option.diadanhs, function (item) {
                            var i = $scope.diadanhs_advsearch.findIndex(x => x.Diadanh_ID === item.Diadanh_ID);
                            if (i !== -1) {
                                $scope.diadanhs_advsearch.splice(i, 1);
                            }
                        });
                    }
                    break;
                case 'loaiquantrac':
                    angular.forEach($scope.loaiquantracs, function (u) {
                        if ((u.Loaiquantrac_Ten || "").toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                            output.push(u);
                        }
                    });
                    $scope.loaiquantracs_advsearch = output;
                    if ($scope.option.loaiquantracs.length > 0) {
                        angular.forEach($scope.option.loaiquantracs, function (item) {
                            var i = $scope.loaiquantracs_advsearch.findIndex(x => x === item);
                            if (i !== -1) {
                                $scope.loaiquantracs_advsearch.splice(i, 1);
                            }
                        });
                    }
                    break;
                case 'tramquantrac':
                    angular.forEach($scope.tramquantracs, function (u) {
                        if ((u.Tramquantrac_Ten || "").toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                            output.push(u);
                        }
                    });
                    $scope.tramquantracs_advsearch = output;
                    if ($scope.option.tramquantracs.length > 0) {
                        angular.forEach($scope.option.tramquantracs, function (item) {
                            var i = $scope.tramquantracs_advsearch.findIndex(x => x === item);
                            if (i !== -1) {
                                $scope.tramquantracs_advsearch.splice(i, 1);
                            }
                        });
                    }
            }
        };
        $scope.clickAdd_AdvSearch = function (u, type) {
            switch (type) {
                case 'diadanh':
                    $scope.option.diadanhs.push(u);

                    var i = $scope.diadanhs_advsearch.findIndex(x => x.Diadanh_ID === u.Diadanh_ID);
                    if (i !== -1) {
                        $scope.diadanhs_advsearch.splice(i, 1);
                    }
                    $scope.option.Focus2 = false;
                    $scope.option.searchD = "";
                    break;
                case 'loaiquantrac':
                    $scope.option.loaiquantracs.push(u);

                    var i = $scope.loaiquantracs_advsearch.findIndex(x => x === u);
                    if (i !== -1) {
                        $scope.loaiquantracs_advsearch.splice(i, 1);
                    }
                    $scope.option.Focus1 = false;
                    $scope.option.searchL = "";
                    break;
                case 'tramquantrac':
                    $scope.option.tramquantracs.push(u);

                    var i = $scope.tramquantracs_advsearch.findIndex(x => x === u);
                    if (i !== -1) {
                        $scope.tramquantracs_advsearch.splice(i, 1);
                    }
                    $scope.option.Focus1 = false;
                    $scope.option.searchT = "";
                    break;
            }
        }
        $scope.RemoveDieukien = function () {
            $scope.option.diadanhs = [];
            $scope.option.loaiquantracs = [];
            $scope.option.tramquantracs = [];
            $scope.option.fromdate = null;
            $scope.option.todate = null;
        }
        //---------- Loại quan trắc --------------------
        $scope.ModalViewEditLoaiquantrac = function (t) {
            $scope.Loaiquantrac_ID_View = t.Loaiquantrac_ID;
            t.selectRow = true;
            $scope.Modal_AddLoaiquantrac("update");
        };
        $scope.Modal_AddLoaiquantrac = function (type) {
            if (type === 'add') {
                $scope.modalTitle = "Thêm mới loại quan trắc";
                $scope.focusBtnAdd = true;
                $scope.Loaiquantrac = {
                    Loaiquantrac_ID: null, Trangthai: true, STT: $scope.MaxSTTLoaiquantrac + 1, Level: 1
                };
                $("form.ng-dirty").removeClass("ng-dirty");
                $("#ModalAddLoaiquantrac").modal("show");
            }
            else {
                $scope.modalTitle = "Cập nhật loại quan trắc";
                $http({
                    method: "POST",
                    url: "Func/callProc",
                    data: {
                        proc: "TD_Loaiquantrac_GetByID", pas: [
                            { "par": "Loaiquantrac_ID", "va": $scope.Loaiquantrac_ID_View }
                        ]
                    },
                    contentType: 'application/json; charset=utf-8'
                }).then(function (res) {
                    if (res.data.error !== 1) {
                        var data = JSON.parse(res.data.data);
                        $scope.Loaiquantrac = data[0][0];
                        $("#ModalAddLoaiquantrac").modal("show");
                    }
                });
            }
        };
        $scope.Add_Loaiquantrac = function (frm) {
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
            $scope.loadding = true;
            swal.showLoading();
            $http({
                method: 'POST',
                url: "Danhmuc/Update_Loaiquantrac",
                data: {
                    model: $scope.Loaiquantrac
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
                $("#ModalAddLoaiquantrac").modal("hide");
                $scope.option.s = "";
                $scope.option.currentPage = 1;
                $scope.List_Loaiquantrac();
                showtoastr('Đã cập nhật thành công !');
            }, function (response) { // optional
                $scope.loadding = false;
            });
        };
        $scope.List_Loaiquantrac = function () {
            $scope.CheckAll = false;
            $scope.focusBtnAdd = false;
            $scope.focusBtnImport = false;
            $scope.checkLen = 0;
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_Loaiquantrac_List",
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
                        text: 'Có lỗi khi load dữ liệu loại quan trắc!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.loaiquantracs = data;
                $scope.loaiquantracs_all = dataCC[3];
                $scope.option.Total = dataCC[1][0].total;
                $scope.MaxSTTLoaiquantrac = dataCC[2][0].maxSTT;
                $scope.option.noOfPages = Math.ceil($scope.option.Total / $scope.option.numPerPage);
                $scope.paxpz = ($scope.option.currentPage - 1) * $scope.option.numPerPage;
                closeswal();
                $(".top-page").animate({ scrollTop: 0 }, 0);
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        // Delete loại quan trắc
        $scope.Del_Loaiquantrac = function (rowto) {
            Swal.fire({
                title: 'Xác nhận?',
                text: "Bạn có muốn xóa các loại quan trắc đã chọn không?",
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
                            $scope.arr.push(rowto[key].Loaiquantrac_ID);
                        }
                    });
                    $http({
                        method: "POST",
                        url: "/Danhmuc/Del_Loaiquantrac",
                        data: { t: $rootScope.login.tk, ids: $scope.arr },
                        contentType: 'application/json; charset=utf-8'
                    }).then(function (res) {
                        if (res.data.error === 1) {
                            Swal.fire({
                                icon: 'error',
                                type: 'error',
                                title: 'Thông báo',
                                text: "Bạn không thể xóa loại quan trắc vì còn tồn tại dữ liệu liên quan !"
                            });
                            return false;
                        } else {
                            $scope.arr = [];
                            $scope.checkLen = 0;
                            $scope.option.s = "";
                            $scope.option.currentPage = 1;
                            $scope.List_Loaiquantrac();
                            showtoastr('Đã xóa dữ liệu thành công !');
                        }
                    });
                }
            });
        };
        //---------- QCVN --------------------
        $scope.ModalViewEditQCVN = function (t) {
            $scope.QCVN_ID_View = t.QCVN_ID;
            t.selectRow = true;
            $scope.Modal_AddQCVN("update");
        };
        $scope.Modal_AddQCVN = function (type) {
            if (type === 'add') {
                $scope.modalTitle = "Thêm mới QCVN";
                $scope.focusBtnAdd = true;
                $scope.QCVN = {
                    QCVN_ID: null, Trangthai: true, STT: $scope.MaxSTTQCVN + 1
                };
                $("form.ng-dirty").removeClass("ng-dirty");
                $("#ModalAddQCVN").modal("show");
            }
            else {
                $scope.modalTitle = "Cập nhật QCVN";
                $http({
                    method: "POST",
                    url: "Func/callProc",
                    data: {
                        proc: "TD_QCVN_GetByID", pas: [
                            { "par": "QCVN_ID", "va": $scope.QCVN_ID_View }
                        ]
                    },
                    contentType: 'application/json; charset=utf-8'
                }).then(function (res) {
                    if (res.data.error !== 1) {
                        var data = JSON.parse(res.data.data);
                        $scope.QCVN = data[0][0];
                        $("#ModalAddQCVN").modal("show");
                    }
                });
            }
        };
        $scope.Add_QCVN = function (frm) {
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
            $scope.loadding = true;
            swal.showLoading();
            $http({
                method: 'POST',
                url: "Danhmuc/Update_QCVN",
                data: {
                    model: $scope.QCVN
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
                        text: 'Có lỗi khi thêm QCVN!'
                    });
                    return false;
                }
                $("#ModalAddQCVN").modal("hide");
                $scope.option.s = "";
                $scope.option.currentPage = 1;
                $scope.List_QCVN();
                showtoastr('Đã cập nhật thành công !');
            }, function (response) { // optional
                $scope.loadding = false;
            });
        };
        $scope.List_QCVN = function () {
            $scope.CheckAll = false;
            $scope.focusBtnAdd = false;
            $scope.focusBtnImport = false;
            $scope.checkLen = 0;
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_QCVN_List",
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
                        text: 'Có lỗi khi load dữ liệu loại QCVN!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.qcvns = data;
                $scope.qcvns_all = dataCC[3];
                $scope.option.Total = dataCC[1][0].total;
                $scope.MaxSTTQCVN = dataCC[2][0].maxSTT;
                $scope.option.noOfPages = Math.ceil($scope.option.Total / $scope.option.numPerPage);
                $scope.paxpz = ($scope.option.currentPage - 1) * $scope.option.numPerPage;
                closeswal();
                $(".top-page").animate({ scrollTop: 0 }, 0);
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        // Delete QCCVN
        $scope.Del_QCVN = function (rowto) {
            Swal.fire({
                title: 'Xác nhận?',
                text: "Bạn có muốn xóa các QCVN đã chọn không?",
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
                            $scope.arr.push(rowto[key].QCVN_ID);
                        }
                    });
                    $http({
                        method: "POST",
                        url: "/Danhmuc/Del_QCVN",
                        data: { t: $rootScope.login.tk, ids: $scope.arr },
                        contentType: 'application/json; charset=utf-8'
                    }).then(function (res) {
                        if (res.data.error === 1) {
                            Swal.fire({
                                icon: 'error',
                                type: 'error',
                                title: 'Thông báo',
                                text: "Bạn không thể xóa QCVN vì còn tồn tại dữ liệu liên quan !"
                            });
                            return false;
                        } else {
                            $scope.arr = [];
                            $scope.checkLen = 0;
                            $scope.option.s = "";
                            $scope.option.currentPage = 1;
                            $scope.List_QCVN();
                            showtoastr('Đã xóa dữ liệu thành công !');
                        }
                    });
                }
            });
        };
        //------------ Tram quan trac ---------------
        $scope.ListLoaiQCVN = [
            { value: 0, text: 'A1' }
        ];
        $scope.ModalViewEditTramquantrac = function (t) {
            $scope.Tramquantrac_ID_View = t.Tramquantrac_ID;
            t.selectRow = true;
            $scope.Modal_AddTramquantrac("update");
        };
        $scope.Modal_AddTramquantrac = function (type) {
            if (type === 'add') {
                $scope.modalTitle = "Thêm mới trạm quan trắc";
                $scope.focusBtnAdd = true;
                $scope.Tramquantrac = {
                    Tramquantrac_ID: null, Trangthai: true, STT: $scope.MaxSTTTramquantrac + 1, Nguoitao: $rootScope.login.u.Users_ID
                };
                $("form.ng-dirty").removeClass("ng-dirty");
                $("#ModalAddTramquantrac").modal("show");
            }
            else {
                $scope.modalTitle = "Cập nhật trạm quan trắc";
                $http({
                    method: "POST",
                    url: "Func/callProc",
                    data: {
                        proc: "TD_Tramquantrac_GetByID", pas: [
                            { "par": "Tramquantrac_ID", "va": $scope.Tramquantrac_ID_View }
                        ]
                    },
                    contentType: 'application/json; charset=utf-8'
                }).then(function (res) {
                    if (res.data.error !== 1) {
                        var data = JSON.parse(res.data.data);
                        $scope.Tramquantrac = data[0][0];
                        $("#ModalAddTramquantrac").modal("show");
                    }
                });
            }
        };
        $scope.Add_Tramquantrac = function (frm) {
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
            $scope.loadding = true;
            swal.showLoading();
            $http({
                method: 'POST',
                url: "Danhmuc/Update_Tramquantrac",
                data: {
                    model: $scope.Tramquantrac
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
                        text: 'Có lỗi khi thêm trạm quan trắc!'
                    });
                    return false;
                }
                $("#ModalAddTramquantrac").modal("hide");
                $scope.option.s = "";
                $scope.option.currentPage = 1;
                $scope.List_Tramquantrac();
                showtoastr('Đã cập nhật thành công !');
            }, function (response) { // optional
                $scope.loadding = false;
            });
        };
        $scope.List_Tramquantrac = function () {
            $('.adv-search .dropdown-menu.show').removeClass('show');
            $scope.CheckAll = false;
            $scope.focusBtnAdd = false;
            $scope.focusBtnImport = false;
            $scope.checkLen = 0;
            let ddids = '';
            if ($scope.option.diadanhs.length > 0) {
                angular.forEach($scope.option.diadanhs, function (r) {
                    ddids += r.Diadanh_ID + ',';
                });
                ddids = ddids.slice(0, -1);
            }
            let lqts = '';
            if ($scope.option.loaiquantracs.length > 0) {
                angular.forEach($scope.option.loaiquantracs, function (r) {
                    lqts += r.Loaiquantrac_ID + ',';
                });
                lqts = lqts.slice(0, -1);
            }
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_Tramquantrac_List",
                    pas: [
                        { "par": "p", "va": $scope.option.currentPage },
                        { "par": "pz", "va": $scope.option.numPerPage },
                        { "par": "sort", "va": $scope.option.sort },
                        { "par": "ob", "va": $scope.option.ob },
                        { "par": "status", "va": $scope.option.Status },
                        { "par": "s", "va": $scope.option.s },
                        { "par": "lqtids", "va": lqts },
                        { "par": "ddids", "va": ddids }
                    ]
                },
                contentType: 'application/json; charset=utf-8'
            }).then(function (res) {
                if (res.data.error === 1) {
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Thông báo',
                        text: 'Có lỗi khi load dữ liệu loại trạm quan trắc!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.tramquantracs = data;
                $scope.tramquantracs_all = dataCC[3];
                $scope.option.Total = dataCC[1][0].total;
                $scope.MaxSTTTramquantrac = dataCC[2][0].maxSTT;
                $scope.option.noOfPages = Math.ceil($scope.option.Total / $scope.option.numPerPage);
                $scope.paxpz = ($scope.option.currentPage - 1) * $scope.option.numPerPage;
                closeswal();
                $(".top-page").animate({ scrollTop: 0 }, 0);
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        $scope.Del_Tramquantrac = function (rowto) {
            Swal.fire({
                title: 'Xác nhận?',
                text: "Bạn có muốn xóa các trạm quan trắc đã chọn không?",
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
                            $scope.arr.push(rowto[key].Tramquantrac_ID);
                        }
                    });
                    $http({
                        method: "POST",
                        url: "/Danhmuc/Del_Tramquantrac",
                        data: { t: $rootScope.login.tk, ids: $scope.arr },
                        contentType: 'application/json; charset=utf-8'
                    }).then(function (res) {
                        if (res.data.error === 1) {
                            Swal.fire({
                                icon: 'error',
                                type: 'error',
                                title: 'Thông báo',
                                text: "Bạn không thể xóa trạm quan trắc vì còn tồn tại dữ liệu liên quan !"
                            });
                            return false;
                        } else {
                            $scope.arr = [];
                            $scope.checkLen = 0;
                            $scope.option.s = "";
                            $scope.option.currentPage = 1;
                            $scope.List_Tramquantrac();
                            showtoastr('Đã xóa dữ liệu thành công !');
                        }
                    });
                }
            });
        };
        //-----Từ điển----------
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
        $scope.ListTrangthaiTramquantrac = [
            { value: 0, text: 'Mất kết nối' },
            { value: 1, text: 'Hoạt động tốt' }
        ]
        //--------------- Thong so mau ------------------
        $scope.changeTypeThongsomau = function (loaiquantrac) {
            $scope.ob.Loaiquantrac = loaiquantrac;
            $scope.List_Thongsomau();
        };
        $scope.Input_AddThongsomau = function () {
            if ($scope.thongsomaus.length === 0) {
                var stt = 1;
            }
            else {
                stt = $scope.thongsomaus[$scope.thongsomaus.length - 1].STT + 1;
            }
            $scope.thongsomaus.push({ Loaiquantrac_ID: $scope.ob.Loaiquantrac.Loaiquantrac_ID, STT: stt, Trangthai: true, isInput: true, Nguoitao: $rootScope.login.u.Users_ID, isAdd: true });
        };
        $scope.Input_UpdateThongsomau = function (t) {
            $scope.org_Thongsomau = angular.copy(t);
            t.isInput = true;
        };
        $scope.Cancel_UpdateThongsomau = function (t) {
            if (!t.Thongsomau_ID) {
                let idx = $scope.thongsomaus.findIndex(x => x.isAdd);
                if (idx > -1) {
                    $scope.thongsomaus.splice(idx, 1);
                }
            }
            else {
                $scope.List_Thongsomau();
            }
        };
        $scope.Add_Thongsomau = function (model) {
            if ($scope.loadding) {
                return false;
            }
            if (!model.Thongsomau_Ten || !model.Donvi) {
                Swal.fire({
                    type: 'warning',
                    icon: 'warning',
                    title: 'Thông báo',
                    text: 'Vui lòng nhập thông tin trường có dấu *'
                });
                return false;
            }
            $scope.loadding = true;
            swal.showLoading();
            $http({
                method: 'POST',
                url: "Danhmuc/Update_Thongsomau",
                data: {
                    model: model
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
                        text: 'Có lỗi khi thêm thông số mẫu!'
                    });
                    return false;
                }
                $scope.List_Thongsomau();
                showtoastr('Đã cập nhật thành công !');
            }, function (response) { // optional
                $scope.loadding = false;
            });
        };
        $scope.List_Thongsomau = function () {
            if (!$scope.ob.Loaiquantrac) {
                Swal.fire({
                    type: 'warning',
                    icon: 'warning',
                    title: 'Thông báo',
                    text: 'Vui lòng chọn loại quan trắc'
                });
                return false;
            }
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_Thongsomau_List",
                    pas: [
                        { "par": "Loaiquantrac_ID", "va": $scope.ob.Loaiquantrac.Loaiquantrac_ID },
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
                        text: 'Có lỗi khi load dữ liệu thông số mẫu!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.thongsomaus = data;
                $scope.option.Total = dataCC[1][0].total;
                closeswal();
                $(".top-page").animate({ scrollTop: 0 }, 0);
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        $scope.Del_Thongsomau = function (rowto, t) {
            t.checked = true;
            Swal.fire({
                title: 'Xác nhận?',
                text: "Bạn có muốn xóa các thông số mẫu đã chọn không?",
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
                            $scope.arr.push(rowto[key].Thongsomau_ID);
                        }
                    });
                    $http({
                        method: "POST",
                        url: "/Danhmuc/Del_Thongsomau",
                        data: { t: $rootScope.login.tk, ids: $scope.arr },
                        contentType: 'application/json; charset=utf-8'
                    }).then(function (res) {
                        if (res.data.error === 1) {
                            Swal.fire({
                                icon: 'error',
                                type: 'error',
                                title: 'Thông báo',
                                text: "Bạn không thể xóa thông số mẫu vì còn tồn tại dữ liệu liên quan !"
                            });
                            return false;
                        } else {
                            $scope.arr = [];
                            $scope.List_Thongsomau();
                            showtoastr('Đã xóa dữ liệu thành công !');
                        }
                    });
                }
            });
        };
        //--------------- Thong so ------------------
        $scope.ListSortTS = [
            { id: 'STT', text: "Thứ tự" },
            { id: 'Ngay', text: "Ngày thực hiện" },
            { id: 'Trangthai', text: "Trạng thái" }
        ]
        $scope.changeTypeThongso = function (loaiquantrac) {
            $scope.ob.Loaiquantrac = loaiquantrac;
            $scope.List_TenThongso();
            $scope.List_Thongso();
            $scope.ListTD_Tramquantrac();
        };
        $scope.List_TenThongso = function () {
            if (!$scope.ob.Loaiquantrac) {
                Swal.fire({
                    type: 'warning',
                    icon: 'warning',
                    title: 'Thông báo',
                    text: 'Vui lòng chọn loại quan trắc'
                });
                return false;
            }
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_Thongsomau_ListTen",
                    pas: [
                        { "par": "Loaiquantrac_ID", "va": $scope.ob.Loaiquantrac.Loaiquantrac_ID }
                    ]
                },
                contentType: 'application/json; charset=utf-8'
            }).then(function (res) {
                if (res.data.error === 1) {
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Thông báo',
                        text: 'Có lỗi khi load dữ liệu thông số mẫu!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.thongsomaus = data;
                closeswal();
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        $scope.Input_AddThongso = function () {
            if ($scope.thongsos.length === 0) {
                var stt = 1;
            }
            else {
                stt = $scope.option.Total + 1;
            }
            $scope.thongsos.push({ STT: stt, Trangthai: true, isInput: true, Nguoitao: $rootScope.login.u.Users_ID, isAdd: true });
        };
        $scope.Input_UpdateThongso = function (t) {
            $scope.org_Thongso = angular.copy(t);
            t.isInput = true;
        };
        $scope.Cancel_UpdateThongso = function (t) {
            if (!t.Thongso_ID) {
                let idx = $scope.thongsos.findIndex(x => x.isAdd);
                if (idx > -1) {
                    $scope.thongsos.splice(idx, 1);
                }
            }
            else {
                $scope.List_Thongso();
            }
        };
        $scope.ListTD_Tramquantrac = function () {
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_Tramquantrac_ListTD",
                    pas: [
                        { "par": "Loaiquantrac_ID", "va": $scope.ob.Loaiquantrac.Loaiquantrac_ID }
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
                closeswal();
                $(".top-page").animate({ scrollTop: 0 }, 0);
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        $scope.Add_Thongso = function (model) {
            var thongso = { Thongso_ID: model.Thongso_ID, Laymau_ID: model.Laymau_ID, Ngaythuchien: model.Ngaythuchien, Nguoitao: $rootScope.login.u.Users_ID, STT: model.STT, Tramquantrac_ID: model.Tramquantrac_ID, Trangthai: model.Trangthai, Ngaytao: model.Ngaytao };
            var thongso_kq = [];
            angular.forEach($scope.thongsomaus, function (r) {
                let tskq = { Tenthongso: r.Thongsomau_Ten, Donvi: r.Donvi, Giatrithongso: model[r.Thongsomau_Ten] ? model[r.Thongsomau_Ten] : null };
                thongso_kq.push(tskq);
            });
            if ($scope.loadding) {
                return false;
            }
            if (!model.Tramquantrac_ID || !model.Ngaythuchien) {
                Swal.fire({
                    type: 'warning',
                    icon: 'warning',
                    title: 'Thông báo',
                    text: 'Vui lòng nhập thông tin trường trạm quan trắc và ngày thực hiện'
                });
                return false;
            }
            $scope.loadding = true;
            swal.showLoading();
            $http({
                method: 'POST',
                url: "Danhmuc/Update_Thongso",
                data: {
                    Thongso: thongso, lst_ThongsoKetqua: thongso_kq
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
                        text: 'Có lỗi khi thêm thông số!'
                    });
                    return false;
                }
                $scope.List_Thongso();
                showtoastr('Đã cập nhật thành công !');
            }, function (response) { // optional
                $scope.loadding = false;
            });
        };
        $scope.List_Thongso = function () {
            if (!$scope.ob.Loaiquantrac) {
                Swal.fire({
                    type: 'warning',
                    icon: 'warning',
                    title: 'Thông báo',
                    text: 'Vui lòng chọn loại quan trắc'
                });
                return false;
            }
            let ddids = '';
            if ($scope.option.diadanhs.length > 0) {
                angular.forEach($scope.option.diadanhs, function (r) {
                    ddids += r.Diadanh_ID + ',';
                });
                ddids = ddids.slice(0, -1);
            }
            let tqts = '';
            if ($scope.option.tramquantracs.length > 0) {
                angular.forEach($scope.option.tramquantracs, function (r) {
                    tqts += r.Tramquantrac_ID + ',';
                });
                tqts = tqts.slice(0, -1);
            }
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_Thongso_List",
                    pas: [
                        { "par": "Loaiquantrac_ID", "va": $scope.ob.Loaiquantrac.Loaiquantrac_ID },
                        { "par": "sort", "va": $scope.option.sort },
                        { "par": "ob", "va": $scope.option.ob },
                        { "par": "status", "va": $scope.option.Status },
                        { "par": "s", "va": $scope.option.s },
                        { "par": "tqtids", "va": tqts },
                        { "par": "ddids", "va": ddids },
                        { "par": "fromdate", "va": $scope.option.fromdate },
                        { "par": "todate", "va": $scope.option.todate }
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
                $scope.thongsos = data;
                $scope.option.Total = dataCC[1][0].total;
                closeswal();
                $(".top-page").animate({ scrollTop: 0 }, 0);
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        $scope.Del_Thongso = function (rowto, t) {
            t.checked = true;
            Swal.fire({
                title: 'Xác nhận?',
                text: "Bạn có muốn xóa các thông số đã chọn không?",
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
                            $scope.arr.push(rowto[key].Thongso_ID);
                        }
                    });
                    $http({
                        method: "POST",
                        url: "/Danhmuc/Del_Thongso",
                        data: { t: $rootScope.login.tk, ids: $scope.arr },
                        contentType: 'application/json; charset=utf-8'
                    }).then(function (res) {
                        if (res.data.error === 1) {
                            Swal.fire({
                                icon: 'error',
                                type: 'error',
                                title: 'Thông báo',
                                text: "Bạn không thể xóa thông số vì còn tồn tại dữ liệu liên quan !"
                            });
                            return false;
                        } else {
                            $scope.arr = [];
                            $scope.List_Thongso();
                            showtoastr('Đã xóa dữ liệu thành công !');
                        }
                    });
                }
            });
        };
        //----------------- Lay mau -----------------------
        $scope.changeTypeLaymau = function (loaiquantrac) {
            $scope.ob.Loaiquantrac = loaiquantrac;
            $scope.ListTD_Tramquantrac();
            $scope.List_Laymau();
        };
        $scope.ListTrangthaiLaymau = [
            { value: false, text: 'Chưa thực hiện' },
            { value: true, text: 'Đã thực hiện' }
        ]
        $scope.ModalViewEditLaymau = function (t) {
            $scope.Laymau_ID_View = t.Laymau_ID;
            t.selectRow = true;
            $scope.Modal_AddLaymau("update");
        };
        $scope.Modal_AddLaymau = function (type) {
            if (type === 'add') {
                $scope.modalTitle = "Thêm mới lấy mẫu";
                $scope.focusBtnAdd = true;
                $scope.Laymau = {
                    Laymau_ID: null, Trangthai: false, STT: $scope.MaxSTTLaymau + 1, Nguoitao: $rootScope.login.u.Users_ID
                };
                $("form.ng-dirty").removeClass("ng-dirty");
                $("#ModalAddLaymau").modal("show");
            }
            else {
                $scope.modalTitle = "Cập nhật lấy mẫu";
                $http({
                    method: "POST",
                    url: "Func/callProc",
                    data: {
                        proc: "TD_Laymau_GetByID", pas: [
                            { "par": "Laymau_ID", "va": $scope.Laymau_ID_View }
                        ]
                    },
                    contentType: 'application/json; charset=utf-8'
                }).then(function (res) {
                    if (res.data.error !== 1) {
                        var data = JSON.parse(res.data.data);
                        $scope.Laymau = data[0][0];
                        $("#ModalAddLaymau").modal("show");
                    }
                });
            }
        };
        $scope.Add_Laymau = function (frm) {
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
            $scope.loadding = true;
            swal.showLoading();
            $http({
                method: 'POST',
                url: "Danhmuc/Update_Laymau",
                data: {
                    model: $scope.Laymau
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
                        text: 'Có lỗi khi thêm lấy mẫu!'
                    });
                    return false;
                }
                $("#ModalAddLaymau").modal("hide");
                $scope.option.s = "";
                $scope.option.currentPage = 1;
                $scope.List_Laymau();
                showtoastr('Đã cập nhật thành công !');
            }, function (response) { // optional
                $scope.loadding = false;
            });
        };
        $scope.List_Laymau = function () {
            $('.adv-search .dropdown-menu.show').removeClass('show');
            $scope.CheckAll = false;
            $scope.focusBtnAdd = false;
            $scope.focusBtnImport = false;
            $scope.checkLen = 0;
            let tqts = '';
            if ($scope.option.tramquantracs.length > 0) {
                angular.forEach($scope.option.tramquantracs, function (r) {
                    tqts += r.Tramquantrac_ID + ',';
                });
                tqts = tqts.slice(0, -1);
            }
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_Laymau_List",
                    pas: [
                        { "par": "p", "va": $scope.option.currentPage },
                        { "par": "pz", "va": $scope.option.numPerPage },
                        { "par": "sort", "va": $scope.option.sort },
                        { "par": "ob", "va": $scope.option.ob },
                        { "par": "status", "va": $scope.option.Status },
                        { "par": "s", "va": $scope.option.s },
                        { "par": "tqtids", "va": tqts }
                    ]
                },
                contentType: 'application/json; charset=utf-8'
            }).then(function (res) {
                if (res.data.error === 1) {
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Thông báo',
                        text: 'Có lỗi khi load dữ liệu lấy mẫu!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.laymaus = data;
                $scope.laymaus_all = dataCC[3];
                $scope.option.Total = dataCC[1][0].total;
                $scope.MaxSTTLaymau = dataCC[2][0].maxSTT;
                $scope.option.noOfPages = Math.ceil($scope.option.Total / $scope.option.numPerPage);
                $scope.paxpz = ($scope.option.currentPage - 1) * $scope.option.numPerPage;
                closeswal();
                $(".top-page").animate({ scrollTop: 0 }, 0);
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        $scope.Del_Laymau = function (rowto) {
            Swal.fire({
                title: 'Xác nhận?',
                text: "Bạn có muốn xóa các lấy mẫu đã chọn không?",
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
                            $scope.arr.push(rowto[key].Laymau_ID);
                        }
                    });
                    $http({
                        method: "POST",
                        url: "/Danhmuc/Del_Laymau",
                        data: { t: $rootScope.login.tk, ids: $scope.arr },
                        contentType: 'application/json; charset=utf-8'
                    }).then(function (res) {
                        if (res.data.error === 1) {
                            Swal.fire({
                                icon: 'error',
                                type: 'error',
                                title: 'Thông báo',
                                text: "Bạn không thể xóa lấy mẫu vì còn tồn tại dữ liệu liên quan !"
                            });
                            return false;
                        } else {
                            $scope.arr = [];
                            $scope.checkLen = 0;
                            $scope.option.s = "";
                            $scope.option.currentPage = 1;
                            $scope.List_Laymau();
                            showtoastr('Đã xóa dữ liệu thành công !');
                        }
                    });
                }
            });
        };
        //Import
        $scope.openModalImport_Thongso = function (laymau) {
            $scope.Laymau = laymau;
            $scope.ListCV = [];
            $scope.ListCVTemp = [];
            $scope.ob.urlImport = 'ImportExcelThongso';
            $scope.ob.fileMau = laymau.DataLoggerID.trim();
            $('input[name=ExcelFile]').val('');
            $("#ModalUpload").modal("show");
        };
        $scope.ImportExcel = function (frm, t) {
            $scope.loadding = true;
            swal.showLoading();
            var Urlaction = "/Danhmuc/" + $scope.ob.urlImport;

            var formData = new FormData();
            formData.append("t", $rootScope.login.tk);
            formData.append("Laymau_ID", $scope.Laymau.Laymau_ID);
            formData.append("Nguoitao", $rootScope.login.u.Users_ID);
            if ($('input[name=ExcelFile]').val() != "") {
                formData.append('ExcelFile', $('input[name=ExcelFile]')[0].files[0]);
            } else {
                Swal.fire({
                    icon: 'error',
                    type: 'error',
                    title: '',
                    text: 'Bạn chưa chọn file để import lên !'
                });

                return false;
            };

            $http.post(Urlaction, formData, {
                withCredentials: false,
                headers: {
                    'Content-Type': undefined,
                },
                transformRequest: angular.identity
            }).then(function (res) {
                $scope.loadding = false;
                closeswal();
                if (res.data.error === 1) {
                    hideloading();
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: '',
                        text: res.data.ms
                    });

                    $('input[name=ExcelFile]').val('');
                    return false;
                }
                else {
                    if (res.data.ms != "") {
                        Swal.fire({
                            icon: 'error',
                            type: 'error',
                            title: '',
                            text: res.data.ms
                        }).then((result) => {
                            $("#ModalUpload").modal("hide");
                            let lm = $scope.laymaus.find(x => x.Laymau_ID === $scope.Laymau.Laymau_ID);
                            if (lm) {
                                lm.Trangthai = true;
                            }
                        });
                    }
                    else {
                        $("#ModalUpload").modal("hide");
                        let lm = $scope.laymaus.find(x => x.Laymau_ID === $scope.Laymau.Laymau_ID);
                        if (lm) {
                            lm.Trangthai = true;
                        }
                    }
                    showtoastr('Import thành công!.');
                    $('input[name=ExcelFile]').val('');
                }
            });
        };
        //------------------ Kiem duyet --------------------
        $scope.List_Kiemduyet = function () {
            $scope.CheckAll = false;
            $scope.focusBtnAdd = false;
            $scope.focusBtnImport = false;
            $scope.checkLen = 0;
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_Kiemduyet_List",
                    pas: [
                        { "par": "Loaiquantrac_ID", "va": $scope.ob.Loaiquantrac.Loaiquantrac_ID },
                        { "par": "sort", "va": $scope.option.sort },
                        { "par": "ob", "va": $scope.option.ob },
                        { "par": "status", "va": $scope.option.Status },
                        { "par": "s", "va": $scope.option.s },
                    ]
                },
                contentType: 'application/json; charset=utf-8'
            }).then(function (res) {
                if (res.data.error === 1) {
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Thông báo',
                        text: 'Có lỗi khi load dữ liệu kiểm duyệt!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.kiemduyets = data;
                angular.forEach($scope.kiemduyets, function (r) {
                    r.Tramquantrac_ID = $scope.ob.Tramquantrac.Tramquantrac_ID;
                    r.Loaiquantrac_ID = $scope.ob.Loaiquantrac.Loaiquantrac_ID;
                    r.Nguoitao = $rootScope.login.u.Users_ID;
                });
                $scope.option.Total = dataCC[1][0].total;
                closeswal();
                $(".top-page").animate({ scrollTop: 0 }, 0);
                showtoastr('Đã tải dữ liệu thành công !');
            });
        };
        $scope.changeTypeKiemduyet = function (loaiquantrac) {
            $scope.ob.Loaiquantrac = loaiquantrac;
            $scope.ListTD_Tramquantrac();
            $scope.List_Laymau();
        };
        $scope.changeTramKiemduyet = function (tramquantrac) {
            $scope.ob.Tramquantrac = tramquantrac;
            $scope.List_Kiemduyet();
        };
        $scope.Add_Kiemduyet = function () {
            if ($scope.loadding) {
                return false;
            }
            $scope.loadding = true;
            swal.showLoading();
            $http({
                method: 'POST',
                url: "Danhmuc/Update_Kiemduyet",
                data: {
                    lst: $scope.kiemduyets
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
                        text: 'Có lỗi khi thêm kiểm duyệt!'
                    });
                    return false;
                }
                Swal.fire({
                    icon: 'success',
                    type: 'success',
                    title: 'Đã kiểm duyệt dữ liệu thành công!'
                });
            }, function (response) { // optional
                $scope.loadding = false;
            });
        };
        //------------------ Bieu do ----------------
        $scope.changeTypeKiemduyet = function (loaiquantrac) {
            $scope.ob.Loaiquantrac = loaiquantrac;
            $scope.ListTD_Tramquantrac();
        };
        $scope.changeTramKiemduyet = function (tramquantrac) {
            $scope.ob.Tramquantrac = tramquantrac;
            $scope.List_TypeThongso();
            $scope.List_Bieudo();
        };
        $scope.List_TypeThongso = function () {
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_Thongsomau_List",
                    pas: [
                        { "par": "Loaiquantrac_ID", "va": $scope.ob.Loaiquantrac.Loaiquantrac_ID },
                        { "par": "sort", "va": null },
                        { "par": "ob", "va": null },
                        { "par": "status", "va": null },
                        { "par": "s", "va": null },
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
                $scope.thongsos = data;
                closeswal();
            });
        }
        $scope.List_Bieudo = function () {
            swal.showLoading();
            $http({
                method: "POST",
                url: "Func/callProc",
                data: {
                    proc: "TD_Thongso_ListByChart",
                    pas: [
                        { "par": "Tramquantrac_ID", "va": $scope.ob.Tramquantrac.Tramquantrac_ID },
                        { "par": "Tenthongso", "va": null }
                    ]
                },
                contentType: 'application/json; charset=utf-8'
            }).then(function (res) {
                if (res.data.error === 1) {
                    Swal.fire({
                        icon: 'error',
                        type: 'error',
                        title: 'Thông báo',
                        text: 'Có lỗi khi load dữ liệu biểu đồ thông số!'
                    });
                    return false;
                }
                let dataCC = JSON.parse(res.data.data);
                let data = dataCC[0];
                $scope.thongsocharts = data;
                angular.forEach($scope.thongsocharts, function (r) {
                    r.Ngaythuchien = new Date(r.Ngaythuchien);
                });
                var setdt = [];
                angular.forEach($scope.thongsos, function (r) {
                    setdt.push({
                        "title": r.Thongsomau_Ten,
                        "fieldMappings": [{
                            "fromField": "Giatrithongso",
                            "toField": "Giatrithongso"
                        }],
                        "dataProvider": $filter('orderBy')($scope.thongsocharts.filter(x => x.Tenthongso === r.Thongsomau_Ten), 'Ngaythuchien'),
                        "categoryField": "Ngaythuchien"
                    });
            });
                setTimeout(function () {
                    var chart1 = AmCharts.makeChart("chartdiv1", {
                        "type": "stock",
                        "theme": "none",
                        "dataSets": setdt,

                        "panels": [{
                            "showCategoryAxis": false,
                            "title": "Thông số",
                            "percentHeight": 70,
                            "stockGraphs": [{
                                "id": "g1",
                                "valueField": "Giatrithongso",
                                "comparable": true,
                                "compareField": "Giatrithongso",
                                "balloonText": "[[title]]:<b>[[value]]</b>",
                                "compareGraphBalloonText": "[[title]]:<b>[[value]]</b>"
                            }],
                            "stockLegend": {
                                "periodValueTextComparing": "[[percents.value.close]]%",
                                "periodValueTextRegular": "[[value.close]]"
                            }
                        }],

                        "categoryAxis": {
                            "minPeriod": "mmhh",
                            "parseDates": true,
                            'format': 'JJ:NN'
                        },

                        "chartScrollbarSettings": {
                            "graph": "g1"
                        },

                        "chartCursorSettings": {
                            "valueBalloonsEnabled": true,
                            "fullWidth": true,
                            "cursorAlpha": 0.1,
                            "valueLineBalloonEnabled": true,
                            "valueLineEnabled": true,
                            "valueLineAlpha": 0.5
                        },

                        "periodSelector": {
                            "position": "left",
                            "periods": [{
                                "period": "MM",
                                "selected": true,
                                "count": 1,
                                "label": "1 month"
                            }, {
                                "period": "YYYY",
                                "count": 1,
                                "label": "1 year"
                            }, {
                                "period": "YTD",
                                "label": "YTD"
                            }, {
                                "period": "MAX",
                                "label": "MAX"
                            }]
                        },

                        "dataSetSelector": {
                            "position": "left"
                        },

                        "export": {
                            "enabled": true
                        }
                    });
                    //document.getElementById('task').style.height = '384px';
                }, 500);
                closeswal();
            });
        }
        //-----------------Common----------------
        //remove search
        $scope.removetag = function (us, us_id, idx) {
            us.splice(idx, 1);
        };
        $scope.inputFile = function (ev) {
            $(ev.target).closest('.box-logoimg').find('input[type=file]').trigger('click');
        };
        $scope.UploadFiles = function (f) {
            if ($scope.ListCVTemp.length + $scope.ListCV.length + f.length > 10) {
                Swal.fire({
                    icon: 'error',
                    type: 'error',
                    title: '',
                    text: 'Bạn chỉ được upload tối đa 5 CV !'
                });
                return false;
            }
            var ms = false;
            angular.forEach(f, function (fi) {
                if (fi.size > 1024 * 1024 * 1024) {
                    ms = true;
                } else {
                    //fi.Dinhdang = fi.name.substring(fi.name.lastIndexOf(".") + 1);
                    $scope.ListCVTemp.push(fi);
                }
            });
            if (ms) {
                Swal.fire({
                    icon: 'warning',
                    type: 'warning',
                    title: '',
                    text: 'Bạn chỉ được upload file có dung lượng tối đa 1GB!'
                });
            }
        };
        $scope.openAttachfile = function (ev) {
            $(ev.target).closest("div.form-group").find("input[type='file']").trigger("click");
        };
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
            $scope.ob = {};
            let stateName = $state.current.name;
            switch (stateName) {
                case 'ad_loaiquantrac':
                    $scope.$watch('option.currentPage', $scope.List_Loaiquantrac);
                    break;
                case 'ad_qcvn':
                    $scope.$watch('option.currentPage', $scope.List_QCVN);
                    break;
                case 'ad_tramquantrac':
                    $scope.List_QCVN();
                    $scope.List_Loaiquantrac();
                    $scope.List_Par_CoquanQuanly();
                    $scope.List_Par_Diadanh();
                    $scope.$watch('option.currentPage', $scope.List_Tramquantrac);
                    break;
                case 'ad_thongsomau':
                    $scope.List_Loaiquantrac();
                    break;
                case 'ad_thongso':
                    $scope.List_Par_Diadanh();
                    $scope.List_Loaiquantrac();
                    var dt = new Date();
                    $scope.option.fromdate = new Date(dt.getFullYear(), dt.getMonth(), 1);
                    $scope.option.todate = new Date();
                    break;
                case 'ad_laymau':
                    $scope.List_Loaiquantrac();
                    break;
                case 'ad_kiemduyet':
                    $scope.List_Loaiquantrac();
                    break;
                case 'ad_bieudo':
                    $scope.List_Loaiquantrac();
                    break;
            }
        };
        $scope.initOne();
    }]);