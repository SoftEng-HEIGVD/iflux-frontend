'use strict';


/**
 * Created by vincent on 4/1/15.
 */

var iFluxFrontCtrl = angular.module('RulesCtrl', []);

iFluxFrontCtrl.controller('RuleCtrl', ['$scope', 'Rules', 'SharedProperties', function ($scope, Rules, SharedProperties) {
    $scope.rules = Rules.query();
    SharedProperties.setProperty($scope.rules);
    $scope.delete = function (ruleId, idx) {
        $scope.rules.splice(idx, 1);
        Rules.delete({"rulesId": ruleId});
    }
}]);

iFluxFrontCtrl.controller('RuleEditorCtrl', ['$scope', '$filter', '$location', '$route', 'Rules', 'ActionTargetInstance', 'ActionType', 'EventSourceTemplate', 'EventSourceInstance', 'EventType', 'SharedProperties', 'Me',
    function ($scope, $filter, $location, $route, Rules, ActionTargetInstance, ActionTypes, EventSourceTemplate, EventSourceInstance, EventType, SharedProperties, Me) {
        var ruleId = $route.current.params.id;
        var isUpdate = false;
        $scope.errorMessage = null;
        $scope.organizations = Me.query();
        $scope.eventSources = EventSourceInstance.query({allOrganizations: true});
        $scope.eventTypes = EventType.query({allOrganizations: true});
        $scope.actionTypes = ActionTypes.query({allOrganizations: true});
        $scope.actionTargets = ActionTargetInstance.query({allOrganizations: true});
        $scope.eventSourceTemplates = EventSourceTemplate.query({allOrganizations: true});

        $scope.rule = {};
        $scope.payload = {conditions: [{}], transformations: [{}]};
        var selectedRule = {};

        //if it's a modification
        if (ruleId !== undefined && ruleId !== "") {
            $scope.payload = Rules.get({"rulesId": ruleId}, function success(data, status) {
                for (var i = 0; i < data.transformations.length; i++) {
                    $scope.payload.transformations[i].actionTargetId = data.transformations[i].actionTarget.id;
                    $scope.payload.transformations[i].actionTypeId = data.transformations[i].actionType.id;
                    $scope.payload.transformations[i].eventTypeId = data.transformations[i].eventType.id;

                }
                ;
                for (var i = 0; i < data.conditions.length; i++) {
                    $scope.payload.conditions[i].eventSourceId = data.conditions[i].eventSource.id;
                    $scope.payload.conditions[i].eventTypeId = data.conditions[i].eventType.id;
                }
            });
            $scope.buttonName = "Update the rule";
            isUpdate = true;
        }

        //Or a new rules
        else {
            $scope.buttonName = "Create the rule";
        }


        $scope.addConditions = function () {
            $scope.payload.conditions.push({"description": ""});
        };
        $scope.addTransformations = function () {
            $scope.payload.transformations.push({});
        };
        $scope.removeConditions = function (index) {
            $scope.payload.conditions.splice(index, 1);
        };
        $scope.removeTransformations = function (index) {

            $scope.payload.transformations.splice(index, 1);
        };
        $scope.create = function () {
            if (isUpdate) {
                $scope.payload.rulesId = ruleId;
                Rules.update($scope.payload, function success(data, status) {
                        $location.path('/rules');
                        $scope.errorMessages = null;
                        isUpdate = false;
                    },
                    function error(err) {
                        $scope.errorMessages = err.data.name;
                    });
            }
            else {
                Rules.save($scope.payload,
                    function success(data, status) {
                        $location.path('/rules');
                        $scope.errorMessages = null;
                    }, function error(err, status) {
                        $scope.errorMessages = err.data.name;
                    });
            }

        };
        $scope.cancel = function () {
            $location.path('/rules');
            isUpdate = false;
        };
    }]);

