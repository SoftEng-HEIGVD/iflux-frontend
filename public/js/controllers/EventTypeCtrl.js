/**
 * Created by vincent on 7/7/15.
 */
var iFluxFrontCtrl = angular.module('EventTypeCtrl', []);

iFluxFrontCtrl.controller('EventTypeMgmtCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'EventType','Me',
    function ($rootScope, $scope, $location, $localStorage, EventType, Me) {
        $scope.eventTypes = EventType.query({organizationId: $rootScope.globalCurrentOrganization});
        $scope.organizations = Me.query();
        $scope.deleteET = function (eventTypeId, idx) {
            EventType.delete({eventTypeId: eventTypeId}, function success(res) {
                $scope.eventTypes.splice(idx, 1);
            }, function error(res) {
                if (res.status == 403) {
                    $scope.errorMessage = "You cannot delete it. Not found or is referenced in another model";
                }
            });
        }
    }


]);

iFluxFrontCtrl.controller('EventTypeEditorCtrl', ['$rootScope', '$scope', '$location', '$route', '$localStorage', 'EventType',
    function ($rootScope, $scope, $location, $route, $localStorage, EventType) {


        var isUpdate = false;
        var typeId = $route.current.params.id;
        //init the data structure

        //if it's a modification
        if (typeId !== undefined && typeId !== "") {
            $scope.buttonName = "Update it!";
            $scope.eType = EventType.get({eventTypeId: typeId}, function success(data, status) {
                $scope.jsonSchema = JSON.stringify(data.schema, null, '\t');

            });

            isUpdate = true;
        }
        //Or a new template
        else {
            $scope.buttonName = "Create it!";
            $scope.eType = {"public": false};

        }

        $scope.cancel = function () {
            $location.path(contextRoot + '/eventType');
        };
        ;

        $scope.submitForm = function () {
            if (isUpdate) {
                $scope.eType.eventTypeId = typeId;
                EventType.update($scope.eType,
                    function success(data, status) {
                        $location.path(contextRoot + '/eventType');
                        $scope.errorMessages = null;
                        isUpdate = false;
                    },
                    function error(err) {
                        $scope.errorMessages = err.data.name;
                    });
            }
            else {
                $scope.eType.organizationId = $rootScope.globalCurrentOrganization;
                EventType.save($scope.eType,
                    function success(data, status) {
                        $location.path(contextRoot + '/eventType');
                        $scope.errorMessages = null;
                    },
                    function error(err) {
                        $scope.errorMessages = [];
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
            "eType.schema",
            function (newValue) {
                if (newValue !== undefined) {
                    $scope.schema = newValue;
                }
            }
        );

        $scope.schemaChanged = function (e) {
            $scope.eType.schema = JSON.parse($scope.jsonSchema);
        };

    }

]);
