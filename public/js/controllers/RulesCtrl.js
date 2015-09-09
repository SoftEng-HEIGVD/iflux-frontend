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

iFluxFrontCtrl.controller('RuleEditorCtrl', ['$rootScope', '$scope', '$filter', '$location', '$route', 'Rules', 'ActionTarget', 'ActionType', 'EventSourceTemplate', 'EventSource', 'EventType', 'SharedProperties', 'Me',
    function ($rootScope, $scope, $filter, $location, $route, Rules, ActionTarget, ActionTypes, EventSourceTemplate, EventSource, EventType, SharedProperties, Me) {
        $scope.htmlTooltipTransformation = "<p><b>function</b>(event, actionTarget, actionType, eventSource, eventType, options) {<br>" +
        "  return // Evaluation code (your expression comes there) <br>" +
        "}</p><ul><li><b>event</b>: The event received by iFLUX</li>" +
        "<li><b>actionTarget</b>: Always available.</li>" +
        "<li><b>actionType</b>: Always available.</li>" +
        "<li><b>eventSource</b>: If the event contains the event source, then it is retrieved and pass to the function</li>" +
        "<li><b>eventType</b>: Same for the event type than the event source.</li></ul>";

        $scope.htmlTooltipCondition = "<p><b>function</b>(event, eventSource, eventType, options) {<br>" +
        "  return // Evaluation code (your expression comes there) <br>" +
        "}</p><ul><li><b>event</b>: The event received by iFLUX</li>" +
        "<li><b>eventSource</b>: If the event contains the event source, then it is retrieved and pass to the function</li>" +
        "<li><b>eventType</b>: Same for the event type than the event source.</li></ul>";



        var ruleId = $route.current.params.id;
        var isUpdate = false;

        $scope.errorMessage = null;
        $scope.organizations = Me.query();
        $scope.eventSources = EventSource.query({organizationId: $rootScope.globalCurrentOrganization});
        $scope.eventTypes = EventType.query({public:true});
        $scope.actionTypes = ActionTypes.query({public:true});
        $scope.actionTargets = ActionTarget.query({organizationId: $rootScope.globalCurrentOrganization});
        $scope.eventSourceTemplates = EventSourceTemplate.query({public:true});

        $scope.rule = {};
        $scope.payload = {conditions: [{}], transformations: [{}], "public": false};
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
                $scope.payload.organizationId = $rootScope.globalCurrentOrganization;
                Rules.update($scope.payload, function success(data, status) {
                        $location.path(contextRoot + '/rules');
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
                        $location.path(contextRoot + '/rules');
                        $scope.errorMessages = null;
                    }, function error(err, status) {
                        $scope.errorMessages = err.data.name;
                    });
            }

        };
        $scope.cancel = function () {
            $location.path(contextRoot + '/rules');
            isUpdate = false;
        };
    }]);

