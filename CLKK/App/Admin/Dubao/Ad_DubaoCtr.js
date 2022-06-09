angular.module('Ad_DubaoCtr', ['ngAnimate', 'ui.bootstrap'])
    .controller("Ad_DubaoCtr", ['$scope', '$rootScope', '$http', '$filter', 'Upload', '$interval', '$state', '$stateParams', '$sce', '$timeout', '$window', function ($scope, $rootScope, $http, $filter, Upload, $interval, $state, $stateParams, $sce, $timeout, $window) {
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
                case 'ad_dubao':
                    //$scope.List_Loaiquantrac();
                    break;
            }
        };
        //-----------------Dự báo----------------
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
        $scope.CreateCSVFile = function () {
            if ($scope.loadding) {
                return false;
            }
            $scope.loadding = true;
            swal.showLoading();
            $http({
                method: 'POST',
                url: "Danhmuc/Update_ExportCSV",
                data: {
                    a: ''
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
                        text: 'Có lỗi!'
                    });
                    return false;
                }
                showtoastr('Đã cập nhật thành công !');
            }, function (response) { // optional
                $scope.loadding = false;
            });
        }
        $scope.changeTypeDubao = function (loaiquantrac) {
            $scope.ob.Loaiquantrac = loaiquantrac;
            $scope.Dubao = {};
        };
        $scope.switch_TypeAQI = function (AQI) {
            $scope.AQIDetail = $scope.aqidetails.find(x => x.min <= AQI && AQI <= x.max);
        }
        $scope.DubaoKetqua = function () {
            if ($scope.loadding) {
                return false;
            }
            $scope.loadding = true;
            swal.showLoading();
            $http({
                method: 'POST',
                url: "Danhmuc/Dubao",
                data: {
                    model: $scope.Dubao
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
                        text: 'Bạn phải nhập đầy đủ thông tin!'
                    });
                    return false;
                }
                $scope.AQI = Math.round(res.data.AQI);
                $scope.switch_TypeAQI($scope.AQI);
                $("#ModalKetquadubao").modal("show");
            }, function (response) { // optional
                $scope.loadding = false;
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
                        { "par": "a", "va": null}
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
                case 'ad_dubao':
                    $scope.List_Loaiquantrac();
                    $scope.List_AQIDetail();
                    //$scope.$watch('option.currentPage', $scope.List_Loaiquantrac);
                    break;
            }
        };
        $scope.initOne();
    }]);