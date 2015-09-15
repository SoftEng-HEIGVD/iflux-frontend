'use strict';


/**
 * Created by vincent on 4/1/15.
 */

var iFluxFrontCtrl = angular.module('RulesCtrl', []);

iFluxFrontCtrl.controller('RuleCtrl', ['$scope', 'Rules', 'SharedProperties',
    function ($scope, Rules, SharedProperties) {
        $scope.rules = Rules.query();
        SharedProperties.setProperty($scope.rules);
        $scope.delete = function (ruleId, idx) {
            Rules.delete({"rulesId": ruleId},
                function success(res) {
                    $scope.rules.splice(idx, 1);
                }, function error(res) {
                    if (res.status == 403) {
                        $scope.errorMessage = "You cannot delete it. Not found or is referenced in another model";
                    }
                });
        }
    }
]);

iFluxFrontCtrl.controller('RuleEditorCtrl', ['$rootScope', '$scope', '$filter', '$location', '$route', 'Rules', 'ActionTarget', 'ActionType', 'EventSourceTemplate', 'EventSource', 'EventType', 'SharedProperties', 'Me',
    function ($rootScope, $scope, $filter, $location, $route, Rules, ActionTarget, ActionType, EventSourceTemplate, EventSource, EventType, SharedProperties, Me) {
        $scope.htmlTooltipTransformation = "<p><b>function</b>(event, actionTarget, actionType, eventSource, eventType, options) {<br>" +
        "  return // Evaluation code (your expression comes there) <br>" +
        "}</p><ul><li><b>event</b>: The event received by iFLUX</li>" +
        "<li><b>actionTarget</b>: Always available.</li>" +
        "<li><b>actionType</b>: Always available.</li>" +
        "<li><b>eventSource</b>: If the event contains the event source, then it is retrieved and pass to the function</li>" +
        "<li><b>eventType</b>: Same for the event type than the event source.</li>" +
        "<li><b>options</b>: ?</li></ul>";

        $scope.htmlTooltipCondition = "<p><b>function</b>(event, eventSource, eventType, options) {<br>" +
        "  return // Evaluation code (your expression comes there) <br>" +
        "}</p><ul><li><b>event</b>: The event received by iFLUX</li>" +
        "<li><b>eventSource</b>: If the event contains the event source, then it is retrieved and pass to the function</li>" +
        "<li><b>eventType</b>: Same for the event type than the event source.</li>" +
        "<li><b>options</b>: ?</li></ul>";


        var ruleId = $route.current.params.id;
        var isUpdate = false;

        $scope.helpConditionEventTypeForm = [{}];
        $scope.helpTransformationActionTypeForm = [{}];
        $scope.helpTransformationEventTypeForm = [{}];

        $scope.showPropertiesTransformation = false;
        $scope.errorMessage = null;
        $scope.organizations = Me.query();
        $scope.eventSources = EventSource.query({organizationId: $rootScope.globalCurrentOrganization},
            function success(res) {
                $scope.eventSources.splice(0, 0, {"name": "*", "id": ""});
            });

        $scope.eventTypes = EventType.query({public: true},
            function success(res) {
                $scope.eventTypes.splice(0, 0, {"name": "*", "id": ""});
            });
        $scope.actionTypes = ActionType.query({public: true});
        $scope.actionTargets = ActionTarget.query({organizationId: $rootScope.globalCurrentOrganization});
        $scope.eventSourceTemplates = EventSourceTemplate.query({public: true});

        $scope.rule = {};
        $scope.payload = {conditions: [{}], transformations: [{}], "public": false};
        var selectedRule = {};

        //if it's a modification
        if (ruleId !== undefined && ruleId !== "") {
            $scope.payload = Rules.get({"rulesId": ruleId}, function success(data, status) {
                //  console.log(data);
                for (var i = 0; i < data.transformations.length; i++) {
                    //    console.log(data.transformations[i].fn);
                    //create two array for the helping box with the size = data.transformations.length
                    $scope.helpTransformationActionTypeForm.push({});
                    $scope.helpTransformationEventTypeForm.push({});

                    $scope.payload.transformations[i].actionTargetId = data.transformations[i].actionTarget.id;
                    $scope.payload.transformations[i].actionTypeId = data.transformations[i].actionType.id;
                    if(data.transformations[i].actionType.id){
                        $scope.helpTransformationActionTypeForm[i] = ActionType.get({"actionTypeId": data.transformations[i].actionType.id});
                    }
                    if (data.transformations[i].eventType) {
                        $scope.payload.transformations[i].eventTypeId = data.transformations[i].eventType.id;
                        $scope.helpTransformationEventTypeForm[i] = EventType.get({"eventTypeId": data.transformations[i].eventType.id});
                    }

                    if (data.transformations[i].fn.sample.event) {
                        console.log("sample event true");      //   console.log(data.transformations[i].fn.sample.event);
                        $scope.payload.transformations[i].fn.sample2 = {"event": {"sdf": "df"}};
                        $scope.payload.transformations[i].fn.sample2.event = JSON.stringify(data.transformations[i].fn.sample.event);
                        // $scope.payload.transformations[i].fn.sample = $scope.payload.transformations[i].fn.sample2;
                        //   console.log($scope.payload.transformations[i].fn.sample.event);
                    }

                }
                for (var i = 0; i < data.conditions.length; i++) {
                    //create one array for the helping box with the size = data.conditions.length
                    $scope.helpConditionEventTypeForm.push({});

                    if (data.conditions[i].eventSource)
                        $scope.payload.conditions[i].eventSourceId = data.conditions[i].eventSource.id;
                    if (data.conditions[i].eventType) {
                        $scope.payload.conditions[i].eventTypeId = data.conditions[i].eventType.id;
                        $scope.helpConditionEventTypeForm[i] = EventType.get({"eventTypeId": data.conditions[i].eventType.id});
                    }
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
            $scope.helpConditionEventTypeForm.push({});

        };
        $scope.addTransformations = function () {
            $scope.payload.transformations.push({});
            $scope.helpTransformationActionTypeForm.push({});
            $scope.helpTransformationEventTypeForm.push({});
        };
        $scope.removeConditions = function (index) {
            $scope.payload.conditions.splice(index, 1);
            $scope.helpConditionEventTypeForm.splice(index, 1);
        };
        $scope.removeTransformations = function (index) {

            $scope.payload.transformations.splice(index, 1);
            $scope.helpTransformationActionTypeForm.splice(index, 1);
            $scope.helpTransformationEventTypeForm.splice(index, 1);
        };

        $scope.eventTypeSelect = function (eventTypeId, index) {
            $scope.helpConditionEventTypeForm[index] = EventType.get({"eventTypeId": eventTypeId});
        };

        $scope.actionTypeSelect = function (actionTypeId, index) {
            $scope.helpTransformationActionTypeForm[index] = ActionType.get({"actionTypeId": actionTypeId});
        };
        $scope.actionEventTypeSelect = function (eventTypeId, index) {
            $scope.helpTransformationEventTypeForm[index] = EventType.get({"eventTypeId": eventTypeId});
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
    }
]);
