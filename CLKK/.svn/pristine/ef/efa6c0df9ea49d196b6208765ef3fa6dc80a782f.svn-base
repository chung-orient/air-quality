angular.module('HomeCtr', ['ngAnimate', 'ui.bootstrap'])
    .controller("HomeCtr", ['$scope', '$rootScope', '$http', '$filter', 'Upload', '$interval', '$state', '$stateParams', '$sce', '$timeout', '$window', function ($scope, $rootScope, $http, $filter, Upload, $interval, $state, $stateParams, $sce, $timeout, $window) {
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
            }
        };
    }])