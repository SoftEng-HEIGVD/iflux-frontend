/**
 * Created by vincent on 5/20/15.
 */

var iFluxFrontCtrl = angular.module('ActionTarget', []);

iFluxFrontCtrl.controller('ActionTargetCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'ActionTargetTemplate', 'ActionTargetInstance',
    function ($rootScope, $scope, $location, $localStorage, ActionTargetTemplate, ActionTargetInstance) {

        $scope.showIndex = null;
        $scope.actionTargetTemplates = ActionTargetTemplate.query({allOrganizations: true});
        $scope.actionTargetInstances = ActionTargetInstance.query({allOrganizations: true});
        $scope.selectTableRow = function (index) {
            if ($scope.showIndex === index) {
                $scope.showIndex = null;
            }
            else {
                $scope.showIndex = index;
            }
        };

        $scope.createInstance = function (atTemplateId) {
            $rootScope.atTemplateId = atTemplateId;
            $location.path('/actionTargetInstanceEditor');
        }
    }

]);


iFluxFrontCtrl.controller('ActionTargetInstanceCtrl', ['$rootScope', '$scope', '$location', '$route', '$localStorage', 'ActionTargetTemplate', 'ActionTargetInstance', 'Me',
    function ($rootScope, $scope, $location, $route, $localStorage, ActionTargetTemplate, ActionTargetInstance, Me) {
        $scope.organizations = Me.query();
        var isUpdate = false;
        var instanceId = $route.current.params.id;

        //init the data structure
        $scope.atInstance = {};
        //if it's a modification
        if (instanceId !== undefined && instanceId !== "") {
            //   selectedRule = $filter('filter')(SharedProperties.getProperty(), {id: ruleId})[0];
            $scope.buttonName = "Update it!";
            $scope.atInstance = ActionTargetInstance.get({actionTargetInstanceId: instanceId});
            isUpdate = true;
        }
        //Or a new template
        else {
            $scope.atInstance.actionTargetTemplateId = $rootScope.atTemplateId;
            $scope.buttonName = "Create it!";
        }

        $scope.cancel = function () {
            $location.path('/actionTarget');
        };
        $scope.submitForm = function () {
            $("input,textarea").not("[type=submit]").jqBootstrapValidation();
            if (isUpdate) {
                $scope.atInstance.actionTargetInstanceId = instanceId;
                ActionTargetInstance.update($scope.atInstance);
            }
            else {
                ActionTargetInstance.save($scope.atInstance);
            }

            $location.path('/actionTarget');
            isUpdate = false;
        }


    }
]);
iFluxFrontCtrl.controller('ActionTargetTemplateCtrl', ['$rootScope', '$scope', '$location', '$route', '$localStorage', 'ActionTargetTemplate', 'ActionTargetInstance', 'Me',
    function ($rootScope, $scope, $location, $route, $localStorage, ActionTargetTemplate, ActionTargetInstance, Me) {
        $scope.organizations = Me.query();
        var isUpdate = false;
        var templateId = $route.current.params.id;
        //init the data structure

        //if it's a modification
        if (templateId !== undefined && templateId !== "") {
            $scope.buttonName = "Update it!";
            $scope.atTemplate = ActionTargetTemplate.get({actionTargetId: templateId});
            isUpdate = true;
        }
        //Or a new template
        else {
            $scope.buttonName = "Create it!";

        }

        $scope.cancel = function () {
            $location.path('/actionTarget');
        };

        $scope.submitForm = function () {
            $("input,textarea").not("[type=submit]").jqBootstrapValidation();
            if (isUpdate) {
                $scope.atTemplate.actionTargetId = templateId;
                ActionTargetTemplate.update($scope.atTemplate);
            }
            else {
                ActionTargetTemplate.save($scope.atTemplate);
            }

            $location.path('/actionTarget');
            isUpdate = false;
        }

    }
]);



