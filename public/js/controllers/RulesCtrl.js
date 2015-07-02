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

iFluxFrontCtrl.controller('RuleEditorCtrl', ['$scope', '$filter', '$location', '$route', 'Rules', 'ActionTargetInstance','ActionTypes','EventSourceTemplate', 'EventSourceInstance', 'EventTypes', 'SharedProperties', 'Me',
    function ($scope, $filter, $location, $route, Rules, ActionTargetInstance, ActionTypes, EventSourceTemplate, EventSourceInstance, EventTypes, SharedProperties, Me) {
        var ruleId = $route.current.params.id;

        $scope.organizations = Me.query();
        $scope.eventSources = EventSourceInstance.query({allOrganizations: true});
        $scope.eventTypes = EventTypes.query({allOrganizations: true});
        $scope.actionTypes = ActionTypes.query({allOrganizations: true});
        $scope.actionTargets = ActionTargetInstance.query({allOrganizations: true});
        $scope.eventSourceTemplates = EventSourceTemplate.query({allOrganizations: true});

        $scope.rule = {};
        $scope.payload = {conditions: [{}], transformations: [{}]};
        var selectedRule = {};

        //if it's a modification
        if (ruleId !== undefined && ruleId !== "") {
           // selectedRule = $filter('filter')(SharedProperties.getProperty(), {id: ruleId})[0];
            $scope.buttonName = "Update the rule";
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

          //  Rules.save($scope.payload);
        }
    }]);

