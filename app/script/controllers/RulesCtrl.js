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

iFluxFrontCtrl.controller('RuleEditorCtrl', ['$scope', '$filter', '$location', '$route', 'Rules', 'ActionTarget', 'EventSource', 'SharedProperties', function ($scope, $filter, $location, $route, Rules, ActionTarget, EventSource, SharedProperties) {
    var ruleId = $route.current.params.id;
    //init the data structure
    $scope.actionSelected = {};
    $scope.actionSchema = {};

    $scope.eventSelected = {};
    $scope.eventSchema = {};

    $scope.rule = {};
    $scope.payload = {};
    var selectedRule = {};

    //if it's a modification
    if (ruleId !== undefined && ruleId !== "") {
        selectedRule = $filter('filter')(SharedProperties.getProperty(), {id: ruleId})[0];
        $scope.payload = selectedRule;
        $scope.buttonName = "Update the rule";
    }

    //Or a new rules
    else {
        $scope.payload = {
            "description": "",
            "enabled": true,
            "reference": "",
            "if": {
                "eventSource": "",
                "eventType": "",
                "eventProperties": {}
            },
            "then": {
                "actionTarget": "",
                "actionSchema": ""
            }
        };
        $scope.actionSchema.type = {};
        $scope.actionSchema.properties = {};
        $scope.buttonName = "Create the rule";
    }

    $scope.actionTargets = ActionTarget.query(function (data) {

        if (ruleId !== undefined && ruleId !== "") {
            //    console.log(selectedRule.then.actionSchema);
            var jsonActionSchema = angular.fromJson(selectedRule.then.actionSchema);
            var selectedActionTarget = $filter('filter')(data, {action: jsonActionSchema.type})[0];

            $scope.actionSelected = {action: selectedActionTarget};
            $scope.actionSchema = jsonActionSchema;
            $scope.payload.then.actionTarget = selectedRule.then.actionTarget;
        }
    });

    $scope.eventSources = EventSource.query(function (data) {
        if (ruleId !== undefined && ruleId !== "") {
            var selectedEventSource = $filter('filter')(data, {eventSource: selectedRule.if.eventSource})[0];
            $scope.eventSelected = {event: selectedEventSource};
            $scope.eventSchema = selectedRule.if.eventSource;
            $scope.payload.if.eventType = selectedRule.if.eventType;
            $scope.payload.if.eventProperties = selectedRule.if.eventProperties;
        }
    });

    $scope.create = function () {
        $scope.payload.then.actionSchema = JSON.stringify($scope.actionSchema);
        //send id
        Rules.save($scope.payload);
    }
}]);


iFluxFrontCtrl.controller('NestedFormCtrl', ['$scope', function ($scope) {

}]);

iFluxFrontCtrl.controller('FormController', ['$scope', '$http', function ($scope, $http) {
    $scope.$watch(
        "actionSelected.action",
        function (newValue) {
            if (newValue !== undefined) {
                $scope.actionSchema.type = newValue.action;
                console.log(newValue.urlForm);
                if (newValue.urlForm === "" || newValue.urlForm === undefined) {
                    $scope.form = ["*"];
                }
                else {
                    $http.get(newValue.urlForm).
                        success(function (data, status, headers, config) {
                            $scope.form = data;
                            console.log(data);
                        }).
                        error(function (data, status, headers, config) {
                        }
                    );
                }

                $http.get(newValue.urlSchema).
                    success(function (data, status, headers, config) {
                        $scope.schema = data;
                        console.log(data);
                    }).
                    error(function (data, status, headers, config) {
                    }
                );
            }
        }
    );
}]);

iFluxFrontCtrl.controller('FormControllerEvent', ['$scope', '$http', function ($scope, $http) {
    $scope.$watch(
        "eventSelected.event",
        function (newValue) {
            if (newValue !== undefined) {
                $scope.payload.if.eventSource = newValue.eventSource;

                if (newValue.urlForm === "" || newValue.urlForm === undefined) {
                    $scope.form = ["*"];
                }
                else {
                    $http.get(newValue.urlForm).
                        success(function (data, status, headers, config) {
                            $scope.form = data;
                        }).
                        error(function (data, status, headers, config) {
                        }
                    );
                }

                $http.get(newValue.urlSchema).
                    success(function (data, status, headers, config) {
                        $scope.schema = data;
                    }).
                    error(function (data, status, headers, config) {
                    }
                );
            }
        }
    );
}]);



