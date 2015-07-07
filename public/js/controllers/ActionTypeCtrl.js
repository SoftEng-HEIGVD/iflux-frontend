/**
 * Created by vincent on 7/2/15.
 */
var iFluxFrontCtrl = angular.module('ActionTypeCtrl', []);

iFluxFrontCtrl.controller('ActionTypeMgmtCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'ActionType',
    function ($rootScope, $scope, $location, $localStorage, ActionType) {
        $scope.actionTypes = ActionType.query({allOrganizations: true});
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
            $scope.aType={};

        }

        $scope.cancel = function () {
            $location.path('/actionType');
        };

        $scope.submitForm = function () {
            $("input,textarea").not("[type=submit]").jqBootstrapValidation();
            if (isUpdate) {
                $scope.aType.id = typeId;
                ActionType.update($scope.aType);
            }
            else {
                ActionType.save($scope.aType);
            }

            $location.path('/actionType');
            isUpdate = false;
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