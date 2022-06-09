(function() {

	'use strict';

	angular.module('ckeditor', []).directive('ckEditor', [function () {
		return {
			restrict: 'AE',
			scope: {
				plaintext: '=',
				options: '='
			},
			template: '<textarea />',
			replace: true,
			require: '?ngModel',
			link: function ($scope, elm, attr, ngModel) {
				var ck = CKEDITOR.replace(elm[0], $scope.options);

				function updateScope() {
					$scope.$apply(function () {
						ngModel.$setViewValue(ck.getData());
						$scope.plaintext = ck.document.getBody().getText();
					});
				}

				ck.on('change', updateScope);
				ck.on('key', updateScope);
				ck.on('dataReady', updateScope);

				ngModel.$render = function () {
					ck.setData(ngModel.$viewValue);
				};
			}
		};
	}]);
})();