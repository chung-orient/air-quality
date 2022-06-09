"use strict";
angular.module("typeaheadDropdown.tpl", [])
    .run(["$templateCache",
        function (a) {
            a.put("templates/typeaheadDropdown.tpl.html",
                "<div>" +
                "    <div ng-if=options class=uib-dropdown dropdown>" +
                "        <div class='input-group'>" +
                "            <input autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" class=form-control placeholder=\"\" ng-model=mdl[config.optionLabel] uib-typeahead=\"op[config.optionLabel] for op in options | filter:$viewValue\"  typeahead-on-select=\"onSelect($item, $model, $label)\" ng-required=\"required\" ng-disabled=\"disabled\"> " +
                "            <span class=input-group-btn uib-dropdown>" +
                "                <button class=\"btn btn-default dropdown-toggle\" uib-dropdown-toggle ng-disabled=\"disabled\">" +
                "                    <span class=caret></span>" +
                "                </button>" +
                        "        <ul uib-dropdown-menu style=max-height:200px;overflow-y:auto>" +
                        "            <li ng-repeat=\"op in options\">" +
                        "                <a href ng-click=onSelect(op)>{{op[config.optionLabel]}}</a>" +
                        "            </li>" +
                        "        </ul>" +
                "            </span>" +
                "        </div>" +
                "    </div>" +
                "</div>"
            );
        }
    ]),
    angular.module("apg.typeaheadDropdown", ["typeaheadDropdown.tpl"])
        .directive("typeaheadDropdown", function () {
            return {
                templateUrl: "templates/typeaheadDropdown.tpl.html",
                scope: { mdl: "=ngModel", options: "=", config: "=?", events: "=", required: "=?ngRequired", disabled: "=?ngDisabled" },
                require: "ngModel",
                replace: true,
                link: function ($scope, $element, $attrs) {
                    $scope.externalEvents = {
                        onItemSelect: angular.noop
                    };
                    angular.extend($scope.externalEvents, $scope.events || []);
                },

                controller: ["$scope",
                    function (a) {
                        a.onSelect = function (i) {
                            a.mdl = angular.copy(i);
                            if (a.events !== undefined) {
                                a.events.onItemSelect(i);
                            }
                        }
                    }
                ]
            }
        });