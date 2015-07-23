/**
 * Created by vincent on 7/2/15.
 */
var iFluxFrontCtrl = angular.module('ActionTypeCtrl', []);

iFluxFrontCtrl.controller('ActionTypeMgmtCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'ActionType',
    function ($rootScope, $scope, $location, $localStorage, ActionType) {
        $scope.actionTypes = ActionType.query({organizationId: $rootScope.globalCurrentOrganization});
    }

]);

iFluxFrontCtrl.controller('ActionTypeEditorCtrl', ['$rootScope', '$scope', '$location', '$route', '$localStorage', 'ActionType', 'Me',
    function ($rootScope, $scope, $location, $route, $localStorage, ActionType, Me) {
        $scope.organizations = Me.query();

        var isUpdate = false;
        var typeId = $route.current.params.id;
        //init the data structure

        //if it's a modification
        if (typeId !== undefined && typeId !== "") {
            $scope.buttonName = "Update it!";
            $scope.aType = ActionType.get({actionTypeId: typeId}, function success(data, status) {
                $scope.jsonSchema = JSON.stringify(data.schema, null, '\t');

            });

            isUpdate = true;
        }
        //Or a new template
        else {
            $scope.buttonName = "Create it!";
            $scope.aType={"public":false};

        }

        $scope.cancel = function () {
            $location.path('/actionType');
        };

        $scope.submitForm = function () {
            if (isUpdate) {
                $scope.aType.id = typeId;
                ActionType.update($scope.aType,
                    function success(data, status) {
                        $location.path('/actionType');
                        $scope.errorMessages = null;
                        isUpdate = false;
                    },
                    function error(err) {
                        $scope.errorMessages = err.data.name;
                    });
            }
            else {
                $scope.aType.organizationId = $rootScope.globalCurrentOrganization;
                ActionType.save($scope.aType,
                    function success(data, status) {
                        $location.path('/actionType');
                        $scope.errorMessages = null;
                    },
                    function error(err) {
                        $scope.errorMessages =[];
                        if (err.data !== null && err.data.name !== undefined) {
                            $scope.errorMessages.push(err.data.name[0]);
                        }
                        if (err.data !== null && err.data.type !== undefined) {
                            $scope.errorMessages.push(err.data.type[0]);
                        }
                    });
            }
        };
        $scope.$watch(
            "aType.schema",
            function (newValue) {
                if (newValue !== undefined) {
                    $scope.schema = newValue;
                }
            }
        );

        $scope.schemaChanged = function (e) {
            $scope.aType.schema = JSON.parse($scope.jsonSchema);
        };

    }

]);