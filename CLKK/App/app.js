rootUrl = "localhost:7896";
baseUrl = "http://" + rootUrl + "/";
fileUrl = baseUrl;
domainUrl = "http://localhost:7896/";
Date.prototype.getWeek = function (dowOffset) {
    /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    dowOffset = typeof (dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(), 0, 1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() -
        (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if (day < 4) {
        weeknum = Math.floor((daynum + day - 1) / 7) + 1;
        if (weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1, 0, 1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
              the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum + day - 1) / 7);
    }
    return weeknum;
};
var os = angular.module("os", ['dndLists', 'ckeditor', 'oi.select', 'angular-nicescroll', 'ui.utils.masks', 'ui.router', 'oc.lazyLoad', 'angularLazyImg', 'uiSwitch', 'ngtimeago', 'angularTreeview', 'ngFileUpload', 'treeGrid', 'ckeditor', 'ang-drag-drop', 'angular.filter', 'htmlToPdfSave', 'jsTag', 'angucomplete', 'ngSanitize', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'csCurrencyInput', 'ui.dateTimeInput', 'ngAnimate', 'smart-table', 'vs-repeat', 'apg.typeaheadDropdown']);
os.config(['$ocLazyLoadProvider', '$stateProvider', '$compileProvider', '$httpProvider', '$urlRouterProvider', '$locationProvider', '$sceDelegateProvider', function ($ocLazyLoadProvider, $stateProvider, $compileProvider, $httpProvider, $urlRouterProvider, $locationProvider, $sceDelegateProvider) {
    $compileProvider.debugInfoEnabled(false);
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        domainUrl + '**'
    ]);
    //$locationProvider.html5Mode({ enabled: true, requireBase: true });
    $locationProvider.hashPrefix('');
    $httpProvider.useApplyAsync(1000); //true
    $ocLazyLoadProvider.config({
        'debug': false, // For debugging 'true/false'
        'events': false, // For Event 'true/false'
        'modules': [
            bindModulesFolder("Tintuc", "tintuc", "TintucCtr"),
            bindModulesFolder("Thuvien", "thuvien/:id", "ThuvienCtr"),
            bindModulesFolder("Lienhe", "lienhe", "LienheCtr"),
            bindModulesFolder("Lienket", "lienket", "LienketCtr"),
            bindModulesFolder("Admin/Tintuc", "ad_tintuc", "Ad_TintucCtr"),
            bindModulesFolder("Admin/Topic", "ad_topic", "Ad_TopicCtr"),
            bindModulesFolder("Admin/Diadanh", "ad_diadanh", "Ad_DiadanhCtr"),
            bindModulesFolder("Admin/Quantrac", "ad_loaiquantrac", "Ad_QuantracCtr"),
            bindModulesFolder("Admin/Diadanh", "ad_coquanquanly", "Ad_DiadanhCtr"),
            bindModulesFolder("Admin/Quantrac", "ad_qcvn", "Ad_QuantracCtr"),
            bindModulesFolder("Admin/Quantrac", "ad_tramquantrac", "Ad_QuantracCtr"),
            bindModulesFolder("Admin/Quantrac", "ad_thongsomau", "Ad_QuantracCtr"),
            bindModulesFolder("Admin/Quantrac", "ad_thongso", "Ad_QuantracCtr"),
            bindModulesFolder("Admin/Quantrac", "ad_laymau", "Ad_QuantracCtr"),
            bindModulesFolder("Admin/Quantrac", "ad_kiemduyet", "Ad_QuantracCtr"),
            bindModulesFolder("Admin/Dubao", "ad_dubao", "Ad_DubaoCtr"),
            bindModulesFolder("Admin/Quantrac", "ad_bieudo", "Ad_QuantracCtr"),
            bindModulesFolder("Home", "home", "HomeCtr")
        ]
    });
    $stateProvider
        .state('tintuc', bindStatePar("tintuc", "Tintuc/tintuc", "TintucCtr"))
        .state('thuvien', bindStatePar("thuvien/:id", "Thuvien/thuvien", "ThuvienCtr"))
        .state('lienhe', bindStatePar("lienhe", "Lienhe/lienhe", "LienheCtr"))
        .state('lienket', bindStatePar("lienket", "Lienket/lienket", "LienketCtr"))
        .state('ad_tintuc', bindStatePar("ad_tintuc", "Admin/Tintuc/ad_tintuc", "Ad_TintucCtr"))
        .state('ad_topic', bindStatePar("ad_topic", "Admin/Topic/ad_topic", "Ad_TopicCtr"))
        .state('ad_diadanh', bindStatePar("ad_diadanh", "Admin/Diadanh/ad_diadanh", "Ad_DiadanhCtr"))
        .state('ad_loaiquantrac', bindStatePar("ad_loaiquantrac", "Admin/Quantrac/ad_loaiquantrac", "Ad_QuantracCtr"))
        .state('ad_coquanquanly', bindStatePar("ad_coquanquanly", "Admin/Diadanh/ad_coquanquanly", "Ad_DiadanhCtr"))
        .state('ad_qcvn', bindStatePar("ad_qcvn", "Admin/Quantrac/ad_qcvn", "Ad_QuantracCtr"))
        .state('ad_tramquantrac', bindStatePar("ad_tramquantrac", "Admin/Quantrac/ad_tramquantrac", "Ad_QuantracCtr"))
        .state('ad_thongsomau', bindStatePar("ad_thongsomau", "Admin/Quantrac/ad_thongsomau", "Ad_QuantracCtr"))
        .state('ad_thongso', bindStatePar("ad_thongso", "Admin/Quantrac/ad_thongso", "Ad_QuantracCtr"))
        .state('ad_laymau', bindStatePar("ad_laymau", "Admin/Quantrac/ad_laymau", "Ad_QuantracCtr"))
        .state('ad_kiemduyet', bindStatePar("ad_kiemduyet", "Admin/Quantrac/ad_kiemduyet", "Ad_QuantracCtr"))
        .state('ad_dubao', bindStatePar("ad_dubao", "Admin/Dubao/ad_dubao", "Ad_DubaoCtr"))
        .state('ad_bieudo', bindStatePar("ad_bieudo", "Admin/Quantrac/ad_bieudo", "Ad_QuantracCtr"))
        .state('home', bindStatePar("home", "Home/home", "HomeCtr"))
    $urlRouterProvider.otherwise(function ($injector, $location) {
        var state = $injector.get('$state');
        if (window.location.href.indexOf("login") === -1) {
            state.go('home');
        }
        else {
            state.go('ad_tintuc');
        }
        return $location.path();
    });
    //Lưu log nếu có lỗi gọi Ajax
    $httpProvider.interceptors.push('golbalErrorHandler');
}]);
os.factory('golbalErrorHandler', ['$rootScope', function ($rootScope) {
    return {
        responseError: function (response) {
            closeswal();
            //showtoastr('Đã có lỗi xảy ra, vui lòng thử lại!.',3);
            // Golbal Error Handling
      
        }
    };
}]);
os.run(function ($rootScope, $templateCache) {
    $rootScope.domainUrl = domainUrl;
    $rootScope.fileUrl = fileUrl;
    var cookie = readCookie("U");
    //if (localStorage.getItem("lo") != cookie && cookie && cookie != "" && cookie != "null") {
    //    localStorage.setItem('lo', cookie);
    //    localStorage.setItem('au', cookie);
    //}
    //else if (!cookie || cookie == "" || cookie == "null") {
    //    deleteAllCookies();
    //    setCookieUserDomain("");
    //    localStorage.removeItem("lo");
    //    localStorage.removeItem("u");
    //}
    if (!localStorage.getItem("lo") && cookie && cookie != "" && cookie != "null") {
        localStorage.setItem('lo', cookie);
        localStorage.setItem('au', cookie);
    }
    if (localStorage.getItem('au')) {
        $rootScope.objgetLogin = JSON.parse(decr(localStorage.getItem('au')));
    }
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (typeof current !== 'undefined') {
            $templateCache.remove(current.templateUrl);
            $templateCache.remove(turl);
        }
    });
    $rootScope.vcache = vhtmlcache;
    var link = location.href;
    var linkcheck = '/ResetPassowrd/IDKey/';
    if (link.indexOf(linkcheck) > 0) {
        $rootScope.isLogin = true;
    }
    $rootScope.pz = 20;
    if (localStorage.getItem("lo") !== null) {
        $rootScope.login = JSON.parse(decr(localStorage.getItem("lo")));
        $rootScope.isLogin = true;
        if ($rootScope.login && $rootScope.login.u) {
            $rootScope.Onlines = [];
            $rootScope.congtyID = $rootScope.login.u.congtyID;

            $rootScope.logOut = function () {
                deleteAllCookies();
                setCookieUserDomain("");
                localStorage.removeItem("lo");
                localStorage.removeItem("u");
                location.href = baseUrl;
            };
            $rootScope.checkToken = function (res) {
                if (res.data.token === 0) {
                    if (!checkTK) {
                        dlg = dialogs.confirm("Thông báo", 'Token đã hết hạn, vui lòng đăng nhập lại ?', { windowClass: "apidialog", size: "sm" });
                        dlg.result.then(function () {
                            $rootScope.logOut(); checkTK = false;
                        }, function () {
                            $rootScope.logOut(); checkTK = false;
                        });
                    }
                    checkTK = true;
                    hideloading();
                    return false;
                }
                return true;
            };
        }
    }
});
os.controller("MainCtr", ['$scope', '$rootScope', '$http', '$filter', 'Upload', '$interval', '$state', '$stateParams', '$sce', '$timeout', '$window', function ($scope, $rootScope, $http, $filter, Upload, $interval, $state, $stateParams, $sce, $timeout, $window) {
    $scope.ListMenu_Thuvien = function () {
        swal.showLoading();
        $http({
            method: "POST",
            url: "Func/callProc",
            data: {
                proc: "CMS_Topic_ListTopicThuvien",
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
            $rootScope.topics_thuvien = data;
        });
    }
    $scope.goMenu = function (key, v) {
        switch (key) {
            case "login":
                $rootScope.link = "login";
                $state.go('login');
                break;
            case "tintuc":
                $rootScope.link = "tintuc";
                $state.go('tintuc');
                break;
            case "thuvien":
                $rootScope.link = "thuvien";
                $state.go('thuvien', { id: v });
                break;
            case "lienhe":
                $rootScope.link = "lienhe";
                $state.go('lienhe');
                break;
            case "lienket":
                $rootScope.link = "lienket";
                $state.go('lienket');
                break;
        }
    };

    $scope.ListMenu_Thuvien();
}]);
os.controller("LoginCtr", ['$scope', '$rootScope', '$http', '$filter', 'Upload', '$interval', '$state', '$stateParams', '$sce', '$timeout', '$window', function ($scope, $rootScope, $http, $filter, Upload, $interval, $state, $stateParams, $sce, $timeout, $window) {
    $scope.login = { Users_Name: '', Password: '', remer: true };
    let u = null;
    try {
        u = localStorage.getItem('u') != null ? JSON.parse(decr(localStorage.getItem('u'))) : null;
    } catch (e) {
        u = null;
    }
    if (u !== null) {
        $scope.login = { Users_ID: u.Users_ID, Password: u.Password, remer: u.remer };
    }
    $scope.err = { errAccount: "", errPass: "" };
    $scope.loadding = false;
    $scope.Login = function () {
        if ($scope.loadding) return false;
        if ($scope.login.Users_Name === null || $scope.login.Users_Name === undefined || $scope.login.Users_Name.trim() === "") {
            $scope.err.errAccount = "* Tên đăng nhập không được để trống!";
            $("input[name='Users_Name']").focus();
            Swal.fire({
                type: 'error',
                title: '',
                text: 'Tên đăng nhập không được để trống!'
            });
            return false;
        } else {
            $scope.err.errAccount = "";
        }
        if ($scope.login.Password === null || $scope.login.Password === undefined || $scope.login.Password.trim() === "") {
            $scope.err.errPass = "* Mật khẩu không được để trống!";
            Swal.fire({
                type: 'error',
                title: '',
                text: 'Mật khẩu không được để trống!'
            });
            $("input[name='Password']").focus();
            return false;
        } else {
            $scope.err.errPass = "";
        }
        swal.showLoading();
        $scope.loadding = true;
        $.ajax({
            type: "POST",
            url: "/Func/CheckLoginEn",
            data: JSON.stringify({ str: encr(JSON.stringify($scope.login)).toString() }),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                $scope.err.errAccount = "";
                $scope.err.errPass = "";
                $scope.err.errDiadanh = "";
                if (data === null || data.trim().length === 0) {
                    $scope.err.ms = "* Tên đăng nhập hoặc mật khẩu không đúng!";
                    $scope.loadding = false;
                    Swal.fire({
                        type: 'error',
                        title: '',
                        text: 'Tên đăng nhập hoặc mật khẩu đơn vị không đúng!'
                    });
                }
                else {
                    $rootScope.isLogin = true;
                    $scope.loadding = false;
                    if ($scope.login.remer) {
                        localStorage.setItem('u', encr(JSON.stringify($scope.login)));
                    }
                    setCookieUserDomain(data);
                    localStorage.setItem('lo', data);
                    localStorage.setItem('au', data);
                    location.href = baseUrl + "login";
                    $scope.loadding = false;
                }
            },
            error: function (result) {
                Swal.fire({
                    type: 'error',
                    title: '',
                    text: 'Tên đăng nhập hoặc mật khẩu không đúng!'
                });
                $scope.loadding = false;
                $scope.err.ms = "* Tên đăng nhập hoặc mật khẩu không đúng!";
            },
            always: function () {
                $scope.loadding = false;
            }
        });
    };
    $scope.Logout = function () {
        deleteAllCookies();
        setCookieUserDomain("");
        localStorage.removeItem("lo");
        localStorage.removeItem("u");
        location.href = domainUrl + 'login';
    };
    $scope.goMenu = function (key, v) {
        switch (key) {
            case "ad_topic":
                $rootScope.link = "ad_topic";
                $state.go('ad_topic');
                break;
            case "ad_tintuc":
                $rootScope.link = "ad_tintuc";
                $state.go('ad_tintuc');
                break;
            case "ad_diadanh":
                $rootScope.link = "ad_diadanh";
                $state.go('ad_diadanh');
                break;
            case "ad_loaiquantrac":
                $rootScope.link = "ad_loaiquantrac";
                $state.go('ad_loaiquantrac');
                break;
            case "ad_coquanquanly":
                $rootScope.link = "ad_coquanquanly";
                $state.go('ad_coquanquanly');
                break;
            case "ad_qcvn":
                $rootScope.link = "ad_qcvn";
                $state.go('ad_qcvn');
                break;
            case "ad_tramquantrac":
                $rootScope.link = "ad_tramquantrac";
                $state.go('ad_tramquantrac');
                break;
            case "ad_thongsomau":
                $rootScope.link = "ad_thongsomau";
                $state.go('ad_thongsomau');
                break;
            case "ad_thongso":
                $rootScope.link = "ad_thongso";
                $state.go('ad_thongso');
                break;
            case "ad_laymau":
                $rootScope.link = "ad_laymau";
                $state.go('ad_laymau');
                break;
            case "ad_kiemduyet":
                $rootScope.link = "ad_kiemduyet";
                $state.go('ad_kiemduyet');
                break;
            case "ad_dubao":
                $rootScope.link = "ad_dubao";
                $state.go('ad_dubao');
                break;
            case "ad_bieudo":
                $rootScope.link = "ad_bieudo";
                $state.go('ad_bieudo');
                break;
        }
    };
}]);
os.directive('multiswitchWhen', function () {
    return {
        transclude: 'element',
        priority: 800,
        require: '^ngSwitch',
        link: function (scope, element, attrs, ctrl, $transclude) {
            var selectTransclude = { transclude: $transclude, element: element };
            angular.forEach(attrs.multiswitchWhen.split('|'), function (switchWhen) {
                ctrl.cases['!' + switchWhen] = (ctrl.cases['!' + switchWhen] || []);
                ctrl.cases['!' + switchWhen].push(selectTransclude);
            });
        }
    }
});
os.directive('onError', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.on('error', function () {
                element.attr('src', attr.onError);
                $(element).hide();
                $(element.next()).show();
            });
        }
    };
});
os.directive('fancybox', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            // find the inner elements and apply fancybox to all of them at once 
            var apply_fancybox_to = element.find('a.fbelements');
            $(apply_fancybox_to).fancybox({
                fitToView: true,
                autoSize: true,
            });
        }
    };
});
//os.directive('jsSelect2', function ($timeout) {
//    return {
//        link: function (scope, element, attrs) {
//            jQuery(element).select2(
//            );
//            scope.$watch(attrs.ngModel, function () {
//                $timeout(function () {
//                    element.trigger('change.select2');
//                }, 100);
//            });

//        }
//    };
//});
os.filter('sumOfValue', function () {
    return function (data, key) {
        if (angular.isUndefined(data) || angular.isUndefined(key))
            return 0;
        var sum = 0;
        angular.forEach(data, function (value) {
            sum = sum + parseInt(value[key]);
        });
        return sum;
    };
});
os.directive('clockPicker', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.clockpicker();
        }
    };
});
os.directive('contenteditable', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, elm, attr, ngModel) {

            function updateViewValue() {
                ngModel.$setViewValue(this.innerHTML);
            }
            //Binding it to keyup, lly bind it to any other events of interest 
            //like change etc..
            elm.on('keyup', updateViewValue);

            scope.$on('$destroy', function () {
                elm.off('keyup', updateViewValue);
            });

            ngModel.$render = function () {
                elm.html(ngModel.$viewValue);
            };

        }
    };
});
os.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
os.directive('backButton', function () {
    return {
        restrict: 'A',

        link: function (scope, element, attrs) {
            element.bind('click', goBack);

            function goBack() {
                history.back();
                scope.$apply();
            }
        }
    }
});
os.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                scope.$evalAsync(attr.onFinishRender);
            }
        }
    };
});
os.directive("digitalClock", function ($timeout, dateFilter) {
    return function (scope, element, attrs) {

        element.addClass('text-center clock');

        scope.updateClock = function () {
            $timeout(function () {
                element.text(dateFilter(new Date(), 'hh:mm:ss'));
                scope.updateClock();
            }, 1000);
        };

        scope.updateClock();

    };
});
os.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
os.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    }
    return {
        link: fn_link
    };
}])
    .directive('modalMovable', ['$document',
        function ($document) {
            return {
                restrict: 'AC',
                link: function (scope, iElement, iAttrs) {
                    var startX = 0,
                        startY = 0,
                        x = 0,
                        y = 0;

                    var dialogWrapper = iElement.parent();

                    dialogWrapper.css({
                        position: 'relative'
                    });

                    iElement.on('mousedown', function (event) {
                        // Prevent default dragging of selected content
                        // event.preventDefault();
                        startX = event.pageX - x;
                        startY = event.pageY - y;
                        $document.on('mousemove', mousemove);
                        $document.on('mouseup', mouseup);
                    });

                    function mousemove(event) {
                        y = event.pageY - startY;
                        x = event.pageX - startX;
                        dialogWrapper.css({
                            top: y + 'px',
                            left: x + 'px'
                        });
                    }

                    function mouseup() {
                        $document.unbind('mousemove', mousemove);
                        $document.unbind('mouseup', mouseup);
                    }
                }
            };
        }
    ]);
os.directive('currencyInput', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            return ctrl.$parsers.push(function (inputValue) {
                var inputVal = element.val();
                //clearing left side zeros
                while (inputVal.charAt(0) == '0') {
                    inputVal = inputVal.substr(1);
                }
                inputVal = inputVal.replace(/[^\d.\',']/g, '');
                var point = inputVal.indexOf(".");
                if (point >= 0) {
                    inputVal = inputVal.slice(0, point + 3);
                }
                var decimalSplit = inputVal.split(".");
                var intPart = decimalSplit[0];
                var decPart = decimalSplit[1];
                intPart = intPart.replace(/[^\d]/g, '');
                if (intPart.length > 3) {
                    var intDiv = Math.floor(intPart.length / 3);
                    while (intDiv > 0) {
                        var lastComma = intPart.indexOf(",");
                        if (lastComma < 0) {
                            lastComma = intPart.length;
                        }

                        if (lastComma - 3 > 0) {
                            intPart = intPart.slice(0, lastComma - 3) + "," + intPart.slice(lastComma - 3);
                        }
                        intDiv--;
                    }
                }

                if (decPart === undefined) {
                    decPart = "";
                } else {
                    decPart = "." + decPart;
                }
                var res = intPart + decPart;

                if (res != inputValue) {
                    ctrl.$setViewValue(res);
                    ctrl.$render();
                }
            });

        }
    };
});
os.directive('smartFloat', function () {
    return {
        controller($scope) {

        },
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ngModel) {
            function inputValue() {
                var inputVal = element.val();
                var res;


                //clearing left side zeros
                while (inputVal.charAt(0) == '0') {
                    inputVal = inputVal.substr(1);
                }

                inputVal = inputVal.replace(/[^\d.\',']/g, '');

                var point = inputVal.indexOf(",");
                if (point >= 0) {
                    inputVal = inputVal.slice(0, point + 3);
                }

                var decimalSplit = inputVal.split(",");
                var intPart = decimalSplit[0];
                var decPart = decimalSplit[1];

                intPart = intPart.replace(/[^\d]/g, '');
                if (intPart.length > 3) {
                    var intDiv = Math.floor(intPart.length / 3);
                    while (intDiv > 0) {
                        var lastComma = intPart.indexOf(".");
                        if (lastComma < 0) {
                            lastComma = intPart.length;
                        }

                        if (lastComma - 3 > 0) {
                            intPart = intPart.slice(0, lastComma - 3) + "." + intPart.slice(lastComma - 3);
                        }
                        intDiv--;
                    }
                }

                if (decPart === undefined) {
                    decPart = "";
                }
                else {
                    decPart = "," + decPart;
                }
                if (intPart == "" && decPart != "") {
                    intPart = 0;
                }
                if (intPart == "" && decPart == "") {
                    res = null;
                } else {
                    res = intPart + decPart;
                }

                if (res != inputValue) {
                    ngModel.$setViewValue(res);
                    ngModel.$render();

                }
                return res

            }
            //from model to view  
            ngModel.$parsers.push(inputValue);


            ngModel.$formatters.push(function (val) {
                return val
            });



        }
    };

})
os.directive('integer', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, elem, attr, ngModel) {
            if (!ngModel)
                return;

            function isValid(val) {
                if (val === "")
                    return true;

                var asInt = parseInt(val, 10);
                if (isNaN(asInt) || (asInt.toString() !== val && "0" + asInt.toString() !== val)) {
                    return false;
                }
                var min = parseInt(attr.min);
                if (isNaN(min) && asInt < min) {
                    return false;
                }

                var max = parseInt(attr.max);
                if (isNaN(max) && max < asInt) {
                    return false;
                }

                return true;
            }

            var prev = scope.$eval(attr.ngModel);
            ngModel.$parsers.push(function (val) {
                // short-circuit infinite loop
                if (val === prev)
                    return val;
                if (!isValid(val)) {
                    ngModel.$setViewValue(prev);
                    ngModel.$render();
                    return prev;
                }

                prev = val;
                return val;
            });
        }
    };
});
os.directive('autoresize', function ($timeout) {
    return {
        restrict: 'A',
        link: function autoResizeLink(scope, element, attributes, controller) {

            element.css({ 'height': 'auto', 'overflow-y': 'hidden' });
            $timeout(function () {
                element.css('height', element[0].scrollHeight + 'px');
            }, 10);

            element.on('input', function () {
                element.css({ 'height': 'auto', 'overflow-y': 'hidden' });
                element.css('height', element[0].scrollHeight + 'px');

            });
        }
    };
});

os.filter('customArray', function ($filter) {
    return function (list, arrayFilter, element) {
        if (arrayFilter) {
            return $filter("filter")(list, function (listItem) {
                return arrayFilter.indexOf(listItem[element]) != -1;
            });
        }
    };
});
os.filter('bytes', function () {
    return function (bytes, precision) {
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        if (typeof precision === 'undefined') precision = 1;
        var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'],
            number = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
    };
});
os.directive('validNumber', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    val = '';
                }

                var clean = val.replace(/[^-0-9\.]/g, '');
                var negativeCheck = clean.split('-');
                var decimalCheck = clean.split('.');
                if (!angular.isUndefined(negativeCheck[1])) {
                    negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                    clean = negativeCheck[0] + '-' + negativeCheck[1];
                    if (negativeCheck[0].length > 0) {
                        clean = negativeCheck[0];
                    }

                }

                if (!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0, 2);
                    clean = decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});
os.filter('filterMultiple', ['$filter', function ($filter) {
    return function (items, keyObj) {
        var filterObj = {
            data: items,
            filteredData: [],
            applyFilter: function (obj, key) {
                var fData = [];
                if (this.filteredData.length == 0)
                    this.filteredData = this.data;
                if (obj) {
                    var fObj = {};
                    if (!angular.isArray(obj)) {
                        fObj[key] = obj;
                        fData = fData.concat($filter('filter')(this.filteredData, fObj));
                    } else if (angular.isArray(obj)) {
                        if (obj.length > 0) {
                            for (var i = 0; i < obj.length; i++) {
                                if (angular.isDefined(obj[i])) {
                                    fObj[key] = obj[i];
                                    fData = fData.concat($filter('filter')(this.filteredData, fObj));
                                }
                            }

                        }
                    }
                    if (fData.length > 0) {
                        this.filteredData = fData;
                    }
                }
            }
        };
        if (keyObj) {
            angular.forEach(keyObj, function (obj, key) {
                filterObj.applyFilter(obj, key);
            });
        }
        return filterObj.filteredData;
    };
}]);
os.filter('highlight', function ($sce) {
    return function (text, phrase) {
        if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
            '<span class="highlighted">$1</span>');

        return $sce.trustAsHtml(text);
    };
});
os.filter('crop', function () {
    return function (input, limit, respectWordBoundaries, suffix) {
        if (input === null || input === undefined || limit === null || limit === undefined || limit === '') {
            return input;
        }
        if (angular.isUndefined(respectWordBoundaries)) {
            respectWordBoundaries = true;
        }
        if (angular.isUndefined(suffix)) {
            suffix = '...';
        }

        if (input.length <= limit) {
            return input;
        }

        limit = limit - suffix.length;

        var trimmedString = input.substr(0, limit);
        if (respectWordBoundaries) {
            return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + suffix;
        }
        return trimmedString + suffix;
    }
});
os.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
                //Also remove . and , so its gives a cleaner result.
                if (value.charAt(lastspace - 1) === '.' || value.charAt(lastspace - 1) === ',') {
                    lastspace = lastspace - 1;
                }
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});
// Filter convert url using view file pdf
os.filter('trustAsResourceUrl',
    [
        '$sce', function ($sce) {
            return function (val) {
                return $sce.trustAsResourceUrl(val);
            };
        }
    ]);
os.component('phong', {
    bindings: {
        vp: '<',
        hTitle: '@',
        choiceUser: '&'
    },
    templateUrl: baseUrl + '/App/Temp/Phong.html?v=' + vhtmlcache,
    controller: function ($scope, $rootScope, dialogs, $http, $stateParams, $state, $filter, Upload) {
        var $ctr = this;
        this.$onInit = function () {
            var pbs = $ctr.vp;
            if (pbs) {
                $ctr.phongbans = pbs;
                $ctr.phongbansUS = pbs;
            }
        };
        var Temp = [];
        function addToArray(array, id, lv) {
            var filter = $filter('filter')(array, { Parent_ID: id }, true);
            filter = $filter('orderBy')(filter, 'thutu');
            if (filter.length > 0) {
                var sp = "";
                for (var i = 0; i < lv; i++) {
                    sp += "----";
                }

                lv++;
                angular.forEach(filter, function (item) {
                    item.lv = lv;
                    item.close = true;
                    item.ids += "," + item.Congty_ID;
                    item.tenmoi = sp + item.tenCongty;
                    Temp.push(item);
                    addToArray(array, item.Congty_ID, lv);
                });
            }
        }
        this.uAll = false;
        this.checkUFilter = function (item) {
            return item.isCheck;
        };
        this.toogleModel = function (m) {
            if (m.close !== true) {
                m.close = true;
            } else {
                m.close = false;
            }
        };
        this.checkAllUST = function () {
            var check = this.uAll;
            this.phongbansUS.forEach(function (p) {
                p.isCheck = check;
            });
        };
        this.ChoiceUser = function () {
            var us = this.vp.filter(u => u.isCheck);
            this.choiceUser({ us: us });
        };
        this.checkU = function (u) {
            var us = this.vp.filter(m => m.Phongban_ID !== u.Phongban_ID);
            us.forEach(function (n) {
                n.isCheck = false;
            });
        };
        this.getCheckPbChild = function (m) {
            var getListPbChild = $ctr.phongbans.filter(x => x.IDCha != null && x.IDCha.indexOf(m.Phongban_ID) > -1);
            if (m.isCheck == true)
                getListPbChild.forEach(function (t) {
                    t.isCheck = true;
                });
            else
                getListPbChild.forEach(function (t) {
                    t.isCheck = false;
                });
        }
        //

        this.changeCheckCty = function (idxID, check) {
            var checkIsCongtyTong = $rootScope.childcongtys.find(m => m.Congty_ID == idxID);
            if (checkIsCongtyTong.Parent_ID == null) {
                var getListPbCtyCha = $ctr.phongbans.filter(n => n.Congty_ID == idxID);
                //
                if (check == true) {
                    getListPbCtyCha.forEach(function (t) {
                        t.isCheck = true;
                    });
                }
                else {
                    getListPbCtyCha.forEach(function (t) {
                        t.isCheck = false;
                    });
                }
            }
            addToArray($rootScope.childcongtys, idxID, 0);
            var listAllCongtyByIDCha = Temp;
            Temp = [];
            if (check == true) {
                var objCongtyHienTai = $rootScope.childcongtys.find(n => n.Congty_ID == idxID);
                angular.forEach(objCongtyHienTai.phongbans, function (u) {
                    u.isCheck = true;
                });
                //
                listAllCongtyByIDCha.forEach(function (t) {
                    t.isCheck = true;
                    angular.forEach(t.phongbans, function (u) {
                        u.isCheck = true;
                    });
                });
            }
            else {
                var objCongtyHienTai = $rootScope.childcongtys.find(n => n.Congty_ID == idxID);
                angular.forEach(objCongtyHienTai.phongbans, function (u) {
                    u.isCheck = false;
                });
                //
                listAllCongtyByIDCha.forEach(function (t) {
                    t.isCheck = false;
                    angular.forEach(t.phongbans, function (u) {
                        u.isCheck = false;
                    });
                });
            }
        }
        //
        //
    }
});
os.component('treephong', {
    bindings: {
        cb: '=',
        vp: '<',
        hTitle: '@',
        choiceUser: '&'
    },
    templateUrl: baseUrl + '/App/Temp/TreePhong.html?v=' + vhtmlcache,
    controller: function ($rootScope) {
        var $ctr = this;
        this.$onInit = function () {
            var pbs = $ctr.vp;
            if (pbs) {
                $ctr.phongbans = pbs;
                $ctr.phongbansUS = pbs;
            }
        };
        this.uAll = false;
        this.checkUFilter = function (item) {
            return item.isCheck;
        };
        this.clickModel = function (m, f) {
            if (!f) {
                this.phongbansUS.filter(p => p.isCheck).forEach(function (p) {
                    p.isCheck = false;
                });
                m.isCheck = !m.isCheck;
            }
            $ctr.ChoiceUser();
        };
        this.toogleModel = function (m, f) {
            if (m.close !== true) {
                m.close = true;
            } else {
                m.close = false;
            }
        };
        this.checkAllUST = function () {
            var check = this.uAll;
            this.phongbansUS.forEach(function (p) {
                p.isCheck = check;
            });
        };
        this.ChoiceUser = function () {
            var us = this.vp.filter(u => u.isCheck);
            this.choiceUser({ us: us });
        };
        this.checkU = function (u) {
            var us = this.vp.filter(m => m.Phongban_ID !== u.Phongban_ID);
            us.forEach(function (n) {
                n.isCheck = false;
            });
        };

    }
});
os.component('treephongstore', {
    bindings: {
        cb: '=',
        vp: '<',
        ct: '<',
        cts: '<',
        hTitle: '@',
        choiceUser: '&'
    },
    templateUrl: baseUrl + '/App/Temp/TreePhongStore.html?v=' + vhtmlcache,
    controller: function ($rootScope) {
        var $ctr = this;
        this.$onInit = function () {
            var pbs = $ctr.vp;
            $ctr.congty = $ctr.ct;
            $ctr.childcongty = $ctr.cts;
            if (pbs) {
                $ctr.phongbans = pbs;
                $ctr.phongbansUS = pbs;
            }
        };
        this.uAll = false;
        this.checkUFilter = function (item) {
            return item.isCheck;
        };
        this.clickModel = function (m, f) {
            if (!f) {
                this.phongbansUS.filter(p => p.isCheck).forEach(function (p) {
                    p.isCheck = false;
                });
                m.isCheck = !m.isCheck;
            }
            $ctr.ChoiceUser();
        };
        this.toogleModel = function (m, f) {
            if (m.close !== true) {
                m.close = true;
            } else {
                m.close = false;
            }
        };
        this.checkAllUST = function () {
            var check = this.uAll;
            this.phongbansUS.forEach(function (p) {
                p.isCheck = check;
            });
        };
        this.ChoiceUser = function () {
            var us = this.vp.filter(u => u.isCheck);
            this.choiceUser({ us: us });
        };
        this.checkU = function (u) {
            var us = this.vp.filter(m => m.Phongban_ID !== u.Phongban_ID);
            us.forEach(function (n) {
                n.isCheck = false;
            });
        };

    }
});
os.component('treephongnocheck', {
    bindings: {
        vp: '<',
        hTitle: '@',
        choiceCongty: '&',
        choicePhong: '&'
    },
    templateUrl: baseUrl + '/App/Temp/TreePhongNoCheck.html?v=' + vhtmlcache,
    controller: function ($filter) {
        var $ctr = this;
        this.$onInit = function () {
            var pbs = $ctr.vp;
            if (pbs) {
                $ctr.phongbans = pbs;
                $ctr.phongbansUS = pbs;
            }
            pbs = this.vp;
        };
        this.uAll = false;
        this.checkUFilter = function (item) {
            return item.isCheck;
        };
        this.so = "thutucha";
        var Temp2 = [];
        this.SortPB = function (f) {
            Temp2 = [];
            if (f) {
                this.so = "thutucha";
            } else {
                this.so = "tenmoi";
            }
            addToArray2(this.phongbans, null, 0, this.so);
            this.phongbans = Temp2;
        };
        function addToArray2(array, id, lv, so) {
            var filter = $filter('filter')(array, { Parent_ID: id }, true);
            filter = $filter('orderBy')(filter, so);
            if (filter.length > 0) {
                var sp = "";
                for (var i = 0; i < lv; i++) {
                    sp += "";
                }
                lv++;
                angular.forEach(filter, function (item) {
                    item.lv = lv;
                    if (!item.ids) {
                        item.ids += "," + item.Phongban_ID;
                        item.tenmoi = sp + item.tenPhongban;
                    }
                    Temp2.push(item);
                    addToArray2(array, item.Phongban_ID, lv, so);
                });
            }
        }
        this.toogleModel = function (m, f) {
            if (f) {
                if (m.close !== true) {
                    m.close = true;
                } else {
                    m.close = false;
                }
            } else {
                this.phongbansUS.filter(p => p.isCheck).forEach(function (p) {
                    p.isCheck = false;
                });
                if (m.close !== true) {
                    m.close = true;
                } else {
                    m.close = false;
                }
                m.isCheck = !m.isCheck;
            }
            $ctr.ChoicePhong();
        };
        this.checkAllUST = function () {
            var check = this.uAll;
            this.phongbansUS.forEach(function (p) {
                p.isCheck = check;
            });
        };
        this.ChoicePhong = function () {
            var us = this.vp.filter(u => u.isCheck);
            this.choicePhong({ us: us });
        };
        this.ChoiceCongty = function (p) {
            if (p.close !== true) {
                p.close = true;
            } else {
                p.close = false;
            }
            this.choiceCongty({ us: p });
        };
        this.checkU = function (u) {
            var us = this.vp.filter(m => m.Phongban_ID !== u.Phongban_ID);
            us.forEach(function (n) {
                n.isCheck = false;
            });
        };
        //var Temp2 = [];
        //$ctr.so = "thutu";
        //$ctr.SortPB = function (f) {
        //    debugger;
        //    if (f) {
        //        $scope.so = "thutu";
        //    } else {
        //        $scope.so = "tenmoi";
        //    }
        //    addToArray2($ctr.phongbans, null, 0);
        //    $ctr.phongbans = Temp2;
        //    Temp2 = [];
        //    var vbs = $rootScope.phongbans;
        //    if (vbs) {
        //        vbs.forEach(function (r) {
        //            r.Count = $scope.phongbans.find(x => x.Phongban_ID === r.Phongban_ID).countNsPb;
        //        });
        //        $scope.vbphongbans = vbs;
        //    }
        //};
        //function addToArray2(array, id, lv) {
        //    debugger;
        //    var filter = $filter('filter')(array, { Parent_ID: id }, true);
        //    filter = $filter('orderBy')(filter, $ctr.so);
        //    if (filter.length > 0) {
        //        var sp = "";
        //        for (var i = 0; i < lv; i++) {
        //            sp += "";
        //        }
        //        lv++;
        //        angular.forEach(filter, function (item) {
        //            item.lv = lv;
        //            item.close = true;
        //            if (!item.ids) {
        //                item.ids += "," + item.Phongban_ID;
        //                item.tenmoi = sp + item.tenPhongban;
        //            }
        //            Temp2.push(item);
        //            addToArray2(array, item.Phongban_ID, lv);
        //        });
        //    }
        //}
    }
});
os.component('treephongusers', {
    bindings: {
        vp: '<',
        hTitle: '@',
        choiceCongty: '&',
        choicePhong: '&'
    },
    templateUrl: baseUrl + '/App/Temp/TreePhongUser.html?v=' + vhtmlcache,
    controller: function ($scope, $rootScope, dialogs, $http, $stateParams, $state, $filter, Upload) {
        var $ctr = this;
        this.$onInit = function () {
            var pbs = $ctr.vp;
            $rootScope.ListDataPbUser = pbs;
            if (pbs) {
                pbs.forEach(function (p) {
                    p.users = $rootScope.users.filter(u => u.phongbans !== null && u.phongbans.indexOf(p.Phongban_ID) !== -1);
                });
                this.phongbans = pbs;
                this.phongbansUS = pbs;
            }
        };
        this.uAll = false;
        this.checkUFilter = function (item) {
            return item.isCheck;
        };
        var Temp = [];
        function addToArray(array, id, lv) {
            var filter = $filter('filter')(array, { Parent_ID: id }, true);
            filter = $filter('orderBy')(filter, 'thutu');
            if (filter.length > 0) {
                var sp = "";
                for (var i = 0; i < lv; i++) {
                    sp += "----";
                }
                lv++;
                angular.forEach(filter, function (item) {
                    item.lv = lv;
                    item.close = true;
                    item.ids += "," + item.Phongban_ID;
                    item.tenmoi = sp + item.tenPhongban;
                    Temp.push(item);
                    addToArray(array, item.Phongban_ID, lv);
                });
            }
        }
        this.toogleModel = function (m, f) {
            if (f) {
                if (m.close !== true) {
                    m.close = true;
                } else {
                    m.close = false;
                }
            } else {
                this.phongbansUS.filter(p => p.isCheck).forEach(function (p) {
                    p.isCheck = false;
                });
                if (m.close !== true) {
                    m.close = true;
                } else {
                    m.close = false;
                }
                m.isCheck = !m.isCheck;
            }
            $ctr.ChoicePhong();
        };
        this.checkAllUST = function () {
            var check = this.uAll;
            this.phongbansUS.forEach(function (p) {
                p.isCheck = check;
            });
        };
        this.ChoicePhong = function () {
            var us = this.vp.filter(u => u.isCheck);
            this.choicePhong({ us: us });
        };
        this.ChoiceCongty = function (p) {
            if (p.close !== true) {
                p.close = true;
            } else {
                p.close = false;
            }
            this.choiceCongty({ us: p });
        };
        this.checkU = function (u) {
            var us = this.vp.filter(m => m.Phongban_ID !== u.Phongban_ID);
            us.forEach(function (n) {
                n.isCheck = false;
            });
        };
        //getListCheck phanquyen
        $scope.arrListUserChoice = [];
        this.getcheckRolePb = function (m) {
            var ListPbUser = $ctr.vp;
            addToArray($ctr.vp, m.Phongban_ID, 0);
            $scope.ListPhongBanChild = Temp;
            Temp = [];
            if (m.isCheckItem == true) {
                //l?y ra list user theo pbID
                $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == m.Phongban_ID);
                $scope.getListUser.users.forEach(function (t) {
                    t.isCheckItem = true;
                    $scope.arrListUserChoice.push(t);
                });
                //get list phongbanCon
                if ($scope.ListPhongBanChild.length > 0) {
                    $scope.ListPhongBanChild.forEach(function (t) {
                        t.isCheckItem = true;
                        //l?y ra list user theo pbID con
                        $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == t.Phongban_ID);
                        $scope.getListUser.users.forEach(function (u) {
                            u.isCheckItem = true;
                            $scope.arrListUserChoice.push(u);
                        });
                    });
                }
            }
            else {
                //l?y ra list user theo pbID
                $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == m.Phongban_ID);
                $scope.getListUser.users.forEach(function (t) {
                    t.isCheckItem = false;
                    $scope.arrListUserChoice.pop(t);
                });
                //get list phongbanCon
                if ($scope.ListPhongBanChild.length > 0) {
                    $scope.ListPhongBanChild.forEach(function (t) {
                        t.isCheckItem = false;
                        //l?y ra list user theo pbID con
                        $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == t.Phongban_ID);
                        $scope.getListUser.users.forEach(function (u) {
                            u.isCheckItem = false;
                            $scope.arrListUserChoice.pop(u);
                        });
                    });
                }
                //
            }
        }
        //check user
        this.getcheckRoleUs = function (m, index) {
            if (m.isCheckItem == true) {
                //chek trùng
                checkTrung = $scope.arrListUserChoice.filter(n => n.NhanSu_ID == m.NhanSu_ID);
                if (checkTrung.length == 0) {
                    //checkTrung.isCheckItem = true;
                    $scope.arrListUserChoice.push(m);
                }
            }
            else {
                checkTrung = $scope.arrListUserChoice.filter(n => n.NhanSu_ID == m.NhanSu_ID);
                if (checkTrung.length > 0) {
                    //$scope.arrListUserChoice.pop(m);
                    $scope.arrListUserChoice.splice(index, 1);
                }
            }
        }

        this.checkChucNangRole = function (m, check) {
            var ListPbUser = $ctr.vp;
            addToArray($ctr.vp, m.Phongban_ID, 0);
            $scope.ListPhongBanChild = Temp;
            Temp = [];

            //check
            if (check == 'IsRead') {
                if (m.IsRead == true) {
                    //l?y ra list user theo pbID
                    $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == m.Phongban_ID);
                    $scope.getListUser.users.forEach(function (t) {
                        t.IsRead = true;
                    });
                    //get list phongbanCon
                    if ($scope.ListPhongBanChild.length > 0) {
                        $scope.ListPhongBanChild.forEach(function (t) {
                            t.IsRead = true;
                            //l?y ra list user theo pbID con
                            $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == t.Phongban_ID);
                            $scope.getListUser.users.forEach(function (u) {
                                u.IsRead = true;
                            });
                        });
                    }
                }
                //
                else {
                    //l?y ra list user theo pbID
                    $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == m.Phongban_ID);
                    $scope.getListUser.users.forEach(function (t) {
                        t.IsRead = false;
                    });
                    //get list phongbanCon
                    if ($scope.ListPhongBanChild.length > 0) {
                        $scope.ListPhongBanChild.forEach(function (t) {
                            t.IsRead = false;
                            //l?y ra list user theo pbID con
                            $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == t.Phongban_ID);
                            $scope.getListUser.users.forEach(function (u) {
                                u.IsRead = false;
                            });
                        });
                    }
                }
            }
            else if (check == 'IsWrite') {
                if (m.IsWrite == true) {
                    //l?y ra list user theo pbID
                    $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == m.Phongban_ID);
                    $scope.getListUser.users.forEach(function (t) {
                        t.IsWrite = true;
                    });
                    //get list phongbanCon
                    if ($scope.ListPhongBanChild.length > 0) {
                        $scope.ListPhongBanChild.forEach(function (t) {
                            t.IsWrite = true;
                            //l?y ra list user theo pbID con
                            $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == t.Phongban_ID);
                            $scope.getListUser.users.forEach(function (u) {
                                u.IsWrite = true;
                            });
                        });
                    }
                }
                //
                else {
                    //l?y ra list user theo pbID
                    $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == m.Phongban_ID);
                    $scope.getListUser.users.forEach(function (t) {
                        t.IsWrite = false;
                    });
                    //get list phongbanCon
                    if ($scope.ListPhongBanChild.length > 0) {
                        $scope.ListPhongBanChild.forEach(function (t) {
                            t.IsWrite = false;
                            //l?y ra list user theo pbID con
                            $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == t.Phongban_ID);
                            $scope.getListUser.users.forEach(function (u) {
                                u.IsWrite = false;
                            });
                        });
                    }
                }
            }
            else {
                if (m.IsFull == true) {
                    //l?y ra list user theo pbID
                    $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == m.Phongban_ID);
                    $scope.getListUser.users.forEach(function (t) {
                        t.IsFull = true;
                    });
                    //get list phongbanCon
                    if ($scope.ListPhongBanChild.length > 0) {
                        $scope.ListPhongBanChild.forEach(function (t) {
                            t.IsFull = true;
                            //l?y ra list user theo pbID con
                            $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == t.Phongban_ID);
                            $scope.getListUser.users.forEach(function (u) {
                                u.IsFull = true;
                            });
                        });
                    }
                }
                //
                else {
                    //l?y ra list user theo pbID
                    $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == m.Phongban_ID);
                    $scope.getListUser.users.forEach(function (t) {
                        t.IsFull = false;
                    });
                    //get list phongbanCon
                    if ($scope.ListPhongBanChild.length > 0) {
                        $scope.ListPhongBanChild.forEach(function (t) {
                            t.IsFull = false;
                            //l?y ra list user theo pbID con
                            $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == t.Phongban_ID);
                            $scope.getListUser.users.forEach(function (u) {
                                u.IsFull = false;
                            });
                        });
                    }
                }
            }
        }

        this.ConfigRoleUser = function (frm) {
            addToArray($rootScope.phongbans, null, 0);
            var listPbcheck = Temp;
            Temp = [];
            $scope.arr = [];
            listPbcheck.forEach(function (t) {
                angular.forEach(t.users, function (value, key) {
                    var check = null;
                    if ($scope.arr.length > 0) {
                        check = $scope.arr.find(n => n.NhanSu_ID == t.users[key].NhanSu_ID);
                    }
                    if ((t.users[key].IsRead || t.users[key].IsWrite || t.users[key].IsFull) && check == null) {
                        $scope.arr.push(t.users[key]);
                    }
                });
            })
            var Urlaction;
            Urlaction = "/KTL_MyFolder/ConfigRoleUser";

            var formData = new FormData();
            formData.append("t", $rootScope.login.tk);
            formData.append("CongtyID", $rootScope.congtyID);
            formData.append("NhanSu_ID", $rootScope.NhanSu_ID);
            formData.append("FolderID", $rootScope.getparentIDFolder);
            //   formData.append("arrListUserChoice", JSON.stringify($scope.arrListUserChoice));
            formData.append("arrListUserChoice", JSON.stringify($scope.arr));

            $http.post(baseUrl + Urlaction, formData, {
                withCredentials: false,
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            }).then(function (res) {
                if (res.data.error == 1) {
                    hideloading();
                    dialogs.error('Thông báo', res.data.ms, { windowClass: "apidialog", size: "sm" });
                    return false;
                }
                else {
                    $scope.checkLen = 0;
                    $("#ModalPhanQuyen").modal("hide");
                    showtoastr('Đã cập nhật dữ liệu thành công!.');
                }
            });
        };
    }
});
os.directive('angularRating', function () {
    return {
        replace: true,
        require: 'ngModel',
        scope: {
            ngModel: '=',
            onChangeFunction: '&onChange'
        },
        template: '' +
            '<ul ng-class="[listClass, decimal]">' +
            '<li ng-repeat="icon in icons track by $index" ' +
            'ng-style="getListItemStyle($index)" ' +
            'ng-click="setValue($index)" ' +
            'ng-mouseenter="paintIcons($index)" ' +
            'ng-mouseleave="resetIcons()" ' +
            '>' +
            '<i ng-class="getClass($index)" ng-style="getIconStyle($index)"></i>' +
            '</li>' +
            '</ul>',

        link: function (scope, element, attrs, controller) {
            // Settings
            scope.icons = new Array(+attrs.max || 5);
            scope.value = controller.$viewValue || (+attrs.defaultValue || 0);
            scope.size = +attrs.iconSize || 20;
            scope.spacing = +attrs.iconSpacing || 5;
            scope.listClass = 'angular-rating-icons';
            scope.readOnly = !(attrs.readonly === undefined);
            scope.decimal = !(attrs.decimal === undefined) ? 'angular-rating-icons-decimal' : undefined;

            // Colors
            var colorBase = attrs.colorBase || 'inherit';
            var colorSelected = attrs.colorSelected || 'orange';
            var colorHover = attrs.colorHover || 'orange';

            // Different states
            var iconBase = attrs.iconBase || 'fa';
            var iconEmpty = attrs.iconEmpty || 'fa-star-o';
            var iconFull = attrs.iconFull || 'fa-star';
            var iconHover = attrs.iconHover || 'fa-star';

            // Model
            controller.$render = function () {
                scope.value = controller.$viewValue === 0 ? 0 : controller.$viewValue || scope.value;

                // update model safeguard/fallback should it not be initialized before
                controller.$setViewValue(scope.value);
            };

            /**
             * Returns the appropriate class for the icon.
             * Changes if it's meant to be full or empty.
             * All indexes above the given value will be empty, all bellow or equal will be full.
             *
             * @param {int} index - the icon's index
             * @return {string} - the icon class to use
             */
            scope.getClass = function (index) {
                return iconBase + ' ' + (index >= scope.value ? iconEmpty : iconFull);
            };

            /**
             * Returns the appropriate style for the icon's color.
             * Changes if it's meant to be full or empty.
             * If it's decimal type, modifies the style to reduce the icon size by 2px, and move the odd index icons
             * half of their size minus 2, to the left.
             *
             * @param {int} index - the icon's index
             * @return {Object} - the icon style to use
             */
            scope.getIconStyle = function (index) {
                var css = {
                    color: index >= scope.value ? colorBase : colorSelected
                };

                if (!scope.decimal) {
                    return css;
                }

                css.height = scope.size - 2 + 'px';
                css.width = scope.size - 2 + 'px';
                css.left = index % 2 ? '-' + (scope.size - 2) / 2 + 'px' : '';

                return css;
            };

            /**
             * Returns the appropriate style fo the list item's font-size and padding-right.
             * If it's decimal type, modifies the style to reduce the height and width by 2 px, and the only the width
             * by half of that result. Also for every even index it removes the right padding.
             *
             * @param {int} index - the list item's index
             * @return {object} - the list item's style to use
             */
            scope.getListItemStyle = function (index) {
                var css = {
                    'font-size': scope.size + 'px',
                    'padding-right': index !== scope.icons.length - 1 ? scope.spacing + 'px' : '0'
                };

                if (!scope.decimal) {
                    return css;
                }

                css.height = scope.size - 2 + 'px';
                css.width = (scope.size - 2) / 2 + 'px';

                if (!(index % 2)) {
                    css['padding-right'] = '0';
                }

                return css;
            };

            /**
             * Doesn't run if set to readonly.
             * Sets the directive's scope value to the clicked icon plus 1.
             * List item's indexes go from 0 to 9, whilst real values should go from 1 to 10.
             * Sets the model's value to the directive's scope value.
			 * Runs the onChangeFunction function.
             *
             * @param {int} index - the clicked icon's index
             */
            scope.setValue = function (index) {
                if (scope.readOnly) {
                    return;
                }

                controller.$setViewValue(scope.value = index + 1);
                scope.onChangeFunction();
            };

            /**
             * Runs the paintIcon function to paint the icons only up to the current scope value - 1,
             * since the indexes range from 0 to 9 but the real values range from 1 to 10.
             */
            scope.resetIcons = function () {
                scope.paintIcons(scope.value - 1, true);
            };

            /**
             * Doesn't run if set to readonly.
             * Changes the icon's classes accordingly to their index.
             * Cycles all the icons, and if the current index is smaller than the cycle number, it gives the icon the
             * empty class, otherwise gives it the hover class and sets the color to the hover color.
             * If reset is true, the above first case scenario also sets the color to the base color, and the second
             * adds the class full and paints with the selected color instead.
             *
             * @param {int} index - the clicked icon's index
             * @param {boolean} reset - if icon's paint should be reset
             */
            scope.paintIcons = function (index, reset) {
                if (scope.readOnly) {
                    return;
                }

                var items = element.find('li').find('i');
                for (var i = 0; i < items.length; i++) {
                    var icon = angular.element(items[i]);

                    if (index >= i) {
                        icon.removeClass(iconEmpty)
                            .addClass(reset ? iconFull : iconHover)
                            .css('color', reset ? colorSelected : colorHover);
                    } else {
                        icon.removeClass(iconFull)
                            .addClass(iconEmpty)
                            .css('color', reset ? colorBase : icon.css('color'));
                    }

                    if (reset && iconHover !== iconFull) {
                        icon.removeClass(iconHover);
                    }
                }
            };
        }
    };
});
os.directive('star', function () {
    return {
        restrict: 'E',
        scope: {
            point: '=',
        },
        templateUrl: baseUrl + '/App/directive/Star.html?v=' + vhtmlcache,
        replace: true,
        link: function (scope) {
        }
    };
});
os.component('profile', {
    bindings: {
        user: '<',
        goUser: '&'
    },
    templateUrl: baseUrl + '/App/directive/Profile.html?v=' + vhtmlcache,
    controller: function () {
        var $ctrl = this;
        this.goUser = function () {
            this.goUser({ u: $ctr.user });
        };
    }
});
os.directive("directiveWhenScrolled", function () {
    return function (scope, elm, attr) {
        var raw = elm[0];
        elm.bind('scroll', function () {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight - 20) {
                scope.$apply(attr.directiveWhenScrolled);
            }
        });
    };
});
function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

os.directive('pagination', function () {
    return {
        restrict: 'E',
        scope: {
            numPages: '=',
            currentPage: '=',
            onSelectPage: '&'
        },
        templateUrl: 'App/directive/pagination.html',
        replace: true,
        link: function (scope) {
            var pages = [];
            scope.$watch('numPages', function (value) {
                for (var i = 1; i <= value; i++) {
                    pages.push(i);
                }
                scope.pageLength = pages.length;
                if (scope.currentPage > value) {
                    scope.selectPage(value);
                } else
                    scope.pages = paginate(pages, 5, 1);

            });
            scope.noPrevious = function () {
                return scope.currentPage === 1;
            };
            scope.noNext = function () {
                return scope.currentPage === scope.numPages;
            };
            scope.isActive = function (page) {
                return scope.currentPage === page;
            };

            scope.selectPage = function (page) {
                if (!scope.isActive(page)) {
                    scope.currentPage = page;
                    if (page > scope.pages[4]) {
                        scope.pages = paginate(pages, 5, Math.ceil(page / 5));
                    } else if (page < scope.pages[0]) {
                        scope.pages = paginate(pages, 5, Math.ceil(page / 5));
                    }
                    scope.onSelectPage({ page: page });
                }
            };

            scope.selectPrevious = function () {
                if (!scope.noPrevious()) {
                    scope.selectPage(scope.currentPage - 1);
                }
            };
            scope.selectNext = function () {
                if (!scope.noNext()) {
                    scope.selectPage(scope.currentPage + 1);
                }
            };
        }
    };
});
os.component('treephongusersrolemodule', {
    bindings: {
        vp: '<',
        hTitle: '@',
        choiceCongty: '&',
        choicePhong: '&'
    },
    templateUrl: baseUrl + '/App/SetRoleModule/treephongusersRoleModule.html?v=' + vhtmlcache,
    controller: function ($scope, $rootScope, dialogs, $http, $stateParams, $state, $filter, Upload) {
        var $ctr = this;
        this.$onInit = function () {
            // $scope.LoadListTich();
            var pbs = $ctr.vp;
            $rootScope.ListDataPbUser = pbs;
            if (pbs) {
                pbs.forEach(function (p) {
                    p.users = $rootScope.users.filter(u => u.phongbans !== null && u.phongbans.indexOf(p.Phongban_ID) !== -1);
                });
                this.phongbans = pbs;
                this.phongbansUS = pbs;
            }
        };
        this.uAll = false;
        this.checkUFilter = function (item) {
            return item.isCheck;
        };
        var Temp = [];
        function addToArray(array, id, lv) {
            var filter = $filter('filter')(array, { Parent_ID: id }, true);
            filter = $filter('orderBy')(filter, 'thutu');
            if (filter.length > 0) {
                var sp = "";
                for (var i = 0; i < lv; i++) {
                    sp += "----";
                }
                lv++;
                angular.forEach(filter, function (item) {
                    item.lv = lv;
                    item.close = true;
                    item.ids += "," + item.Phongban_ID;
                    item.tenmoi = sp + item.tenPhongban;
                    Temp.push(item);
                    addToArray(array, item.Phongban_ID, lv);
                });
            }
        }
        this.toogleModel = function (m, f) {
            if (f) {
                if (m.close !== true) {
                    m.close = true;
                } else {
                    m.close = false;
                }
            } else {
                this.phongbansUS.filter(p => p.isCheck).forEach(function (p) {
                    p.isCheck = false;
                });
                if (m.close !== true) {
                    m.close = true;
                } else {
                    m.close = false;
                }
                m.isCheck = !m.isCheck;
            }
            $ctr.ChoicePhong();
        };
        this.checkAllUST = function () {
            var check = this.uAll;
            this.phongbansUS.forEach(function (p) {
                p.isCheck = check;
            });
        };
        this.ChoicePhong = function () {
            var us = this.vp.filter(u => u.isCheck);
            this.choicePhong({ us: us });
        };
        this.ChoiceCongty = function (p) {
            if (p.close !== true) {
                p.close = true;
            } else {
                p.close = false;
            }
            this.choiceCongty({ us: p });
        };
        this.checkU = function (u) {
            var us = this.vp.filter(m => m.Phongban_ID !== u.Phongban_ID);
            us.forEach(function (n) {
                n.isCheck = false;
            });
        };

        $scope.LoadListTich = function () {
            var data = [];
            data = [
                { key: 'VB_themDen' },
                { key: 'VB_themDi' },
                { key: 'VB_xoaDen' },
                { key: 'VB_xoaDi' },
                { key: 'VB_xemBCcaNhan' },
                { key: 'VB_xemBCPhong' },
                { key: 'VB_xemBCCty' },
                { key: 'VB_xemBCAll' },
                { key: 'LCT_LapLich' },
                { key: 'LCT_DuyetLich' },
                { key: 'LCT_XemPhongHop' },
                { key: 'LCT_XemLichCaNhan' },
                { key: 'LCT_XemLichPhong' },
                { key: 'LCT_XemLichCongTy' },
                { key: 'LCT_XemLichAll' },
                { key: 'TSC_QuetBarCode' },
                { key: 'TSC_TheoDoiCaNhan' },
                { key: 'TSC_TheoDoiPhong' },
                { key: 'TSC_TheoDoiCongTy' },
                { key: 'TSC_TheoDoiAll' },
                { key: 'DX_XemXe' },
                { key: 'DX_TheoDoiCaNhan' },
                { key: 'DX_TheoDoiPhong' },
                { key: 'DX_TheoDoiCongTy' },
                { key: 'DX_TheoDoiAll' },
                { key: 'VPP_TheoDoiCaNhan' },
                { key: 'VPP_TheoDoiPhong' },
                { key: 'VPP_TheoDoiCongTy' },
                { key: 'VPP_TheoDoiAll' },
                { key: 'DP_TheoDoiCaNhan' },
                { key: 'DP_TheoDoiPhong' },
                { key: 'DP_TheoDoiCongTy' },
                { key: 'DP_TheoDoiAll' }
            ];

            $scope.ListTichFunction = data;
        };
        //getListCheck phanquyen
        $scope.arrListUserChoice = [];
        this.getcheckRolePb = function (m) {
            var ListPbUser = $ctr.vp;
            addToArray($ctr.vp, m.Phongban_ID, 0);
            $scope.ListPhongBanChild = Temp;
            Temp = [];
            if (m.isCheckItem == true) {
                //lấy ra list user theo pbID
                $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == m.Phongban_ID);
                $scope.getListUser.users.forEach(function (t) {
                    t.isCheckItem = true;
                    $scope.arrListUserChoice.push(t);
                });
                //get list phongbanCon
                if ($scope.ListPhongBanChild.length > 0) {
                    $scope.ListPhongBanChild.forEach(function (t) {
                        t.isCheckItem = true;
                        //lấy ra list user theo pbID con
                        $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == t.Phongban_ID);
                        $scope.getListUser.users.forEach(function (u) {
                            u.isCheckItem = true;
                            $scope.arrListUserChoice.push(u);
                        });
                    });
                }
            }
            else {
                //lấy ra list user theo pbID
                $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == m.Phongban_ID);
                $scope.getListUser.users.forEach(function (t) {
                    t.isCheckItem = false;
                    $scope.arrListUserChoice.pop(t);
                });
                //get list phongbanCon
                if ($scope.ListPhongBanChild.length > 0) {
                    $scope.ListPhongBanChild.forEach(function (t) {
                        t.isCheckItem = false;
                        //lấy ra list user theo pbID con
                        $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == t.Phongban_ID);
                        $scope.getListUser.users.forEach(function (u) {
                            u.isCheckItem = false;
                            $scope.arrListUserChoice.pop(u);
                        });
                    });
                }
                //
            }
        }
        //check user
        this.getcheckRoleUs = function (m, index) {
            if (m.isCheckItem == true) {
                //chek trùng
                var checkTrung = $scope.arrListUserChoice.filter(n => n.NhanSu_ID == m.NhanSu_ID);
                if (checkTrung.length == 0) {
                    //checkTrung.isCheckItem = true;
                    $scope.arrListUserChoice.push(m);
                }
            }
            else {
                var checkTrung = $scope.arrListUserChoice.filter(n => n.NhanSu_ID == m.NhanSu_ID);
                if (checkTrung.length > 0) {
                    //$scope.arrListUserChoice.pop(m);
                    $scope.arrListUserChoice.splice(index, 1);
                }
            }
        }

        this.checkChucNangRole = function (m, check) {
            var ListPbUser = $ctr.vp;
            addToArray($ctr.vp, m.Phongban_ID, 0);
            $scope.ListPhongBanChild = Temp;
            Temp = [];

            //check
            if (check == 'IsRead') {
                if (m.IsRead == true) {
                    //lấy ra list user theo pbID
                    $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == m.Phongban_ID);
                    $scope.getListUser.users.forEach(function (t) {
                        t.IsRead = true;
                    });
                    //get list phongbanCon
                    if ($scope.ListPhongBanChild.length > 0) {
                        $scope.ListPhongBanChild.forEach(function (t) {
                            t.IsRead = true;
                            //lấy ra list user theo pbID con
                            $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == t.Phongban_ID);
                            $scope.getListUser.users.forEach(function (u) {
                                u.IsRead = true;
                            });
                        });
                    }
                }
                //
                else {
                    //lấy ra list user theo pbID
                    $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == m.Phongban_ID);
                    $scope.getListUser.users.forEach(function (t) {
                        t.IsRead = false;
                    });
                    //get list phongbanCon
                    if ($scope.ListPhongBanChild.length > 0) {
                        $scope.ListPhongBanChild.forEach(function (t) {
                            t.IsRead = false;
                            //lấy ra list user theo pbID con
                            $scope.getListUser = ListPbUser.find(n => n.Phongban_ID == t.Phongban_ID);
                            $scope.getListUser.users.forEach(function (u) {
                                u.IsRead = false;
                            });
                        });
                    }
                }
            }
        };

        this.ConfigRoleUser = function (frm) {
            addToArray($rootScope.phongbans, null, 0);
            var listPbcheck = Temp;
            Temp = [];
            $scope.arr = [];
            listPbcheck.forEach(function (t) {
                angular.forEach(t.users, function (value, key) {
                    var check = null;
                    if ($scope.arr.length > 0) {
                        check = $scope.arr.find(n => n.NhanSu_ID == t.users[key].NhanSu_ID);
                    }
                    if ((t.users[key].IsRead || t.users[key].IsWrite || t.users[key].IsFull) && check == null) {
                        $scope.arr.push(t.users[key]);
                    }
                });
            })
            var Urlaction;
            Urlaction = "/KTL_MyFolder/ConfigRoleUser";

            var formData = new FormData();
            formData.append("t", $rootScope.login.tk);
            formData.append("CongtyID", $rootScope.congtyID);
            formData.append("NhanSu_ID", $rootScope.NhanSu_ID);
            formData.append("FolderID", $rootScope.getparentIDFolder);
            //   formData.append("arrListUserChoice", JSON.stringify($scope.arrListUserChoice));
            formData.append("arrListUserChoice", JSON.stringify($scope.arr));

            $http.post(baseUrl + Urlaction, formData, {
                withCredentials: false,
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            }).then(function (res) {
                if (res.data.error == 1) {
                    hideloading();
                    dialogs.error('Thông báo', res.data.ms, { windowClass: "apidialog", size: "sm" });
                    return false;
                }
                else {
                    $scope.checkLen = 0;
                    $("#ModalPhanQuyen").modal("hide");
                    showtoastr('Đã cập nhật dữ liệu thành công!.');
                }
            });
        };
    }
});
os.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
});
os.filter('selected', [
    '$filter',
    function ($filter) {
        return function (files) {
            return $filter('filter')(files,
                {
                    selected: true
                });
        };
    }
]);
os.directive('owlCarousel', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        transclude: false,
        link: function (scope, element) {
            var defaultOptions = {
            };
            scope.initCarousel = function (element) {
                // provide any default options you want

                var customOptions = scope.$eval(jQuery(element).attr('data-options'));
                // combine the two options objects
                for (var key in customOptions) {
                    defaultOptions[key] = customOptions[key];
                }
                // init carousel
                // jQuery(element).owlCarousel(defaultOptions);
            };
            // scope.$on('owlCarouselLoaded', function() {
            $timeout(function () {
                jQuery(element).owlCarousel(defaultOptions)
                scope.initCarousel();
            }, 0, false);
            // });
        }
    };
}]);
os.directive('owlCarouselItem', [function () {
    return {
        restrict: 'A',
        transclude: false,
        link: function (scope, element) {
            // wait for the last item in the ng-repeat then call init
            if (scope.$last) {
                scope.initCarousel(element.parent());
            }
        }
    };
}]);

os.directive('dndList', function () {
    return function (scope, element, attrs) {
        var toUpdate;
        var startIndex = -1;
        scope.$watch(attrs.dndList, function (value) {
            toUpdate = value;
        }, true);
        $(element[0]).sortable({
            items: 'li',
            start: function (event, ui) {
                startIndex = ($(ui.item).index());
            },
            stop: function (event, ui) {
                var newIndex = ($(ui.item).index());
                var toMove = toUpdate[startIndex];
                toUpdate.splice(startIndex, 1);
                toUpdate.splice(newIndex, 0, toMove);
                scope.$apply(scope.model);
            },
            axis: 'y'
        })
    }
});
moment.locale('vi');