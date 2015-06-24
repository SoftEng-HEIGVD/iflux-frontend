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
        };
        $scope.modifyInstance = function (atInstanceId, atTemplateId) {
            $rootScope.atTemplateId = atTemplateId;
            $location.path('/actionTargetInstanceEditor/' + atInstanceId);
        }

    }

]);


iFluxFrontCtrl.controller('ActionTargetInstanceCtrl', ['$rootScope', '$scope', '$location', '$route', '$localStorage', 'ActionTargetTemplate', 'ActionTargetInstance', 'Me',
    function ($rootScope, $scope, $location, $route, $localStorage, ActionTargetTemplate, ActionTargetInstance, Me) {
        $scope.organizations = Me.query();
        var isUpdate = false;
        //init the data structure
        $scope.atInstance = {"configuration":{}};
        var instanceId = $route.current.params.id;
        //get schema and form for configuration
        ActionTargetTemplate.get({actionTargetId: $rootScope.atTemplateId}, function success(data, status) {
            $scope.schema = data.configuration.schema;
            if (data.configurationUi === undefined || data.configurationUi.schemaForm === "" || data.configurationUi.schemaForm === undefined) {
                $scope.form = ["*"];
            }
            else {
                $scope.form = data.configurationUi.schemaForm;
            }
        });


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
        };


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
            $scope.atTemplate = ActionTargetTemplate.get({actionTargetId: templateId}, function success(data, status) {
                $scope.jsonSchema = JSON.stringify(data.configuration.schema, null, '\t');
                $scope.jsonForm = JSON.stringify(data.configurationUi.schemaForm, null, '\t');
            });

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
        $scope.$watch(
            "atTemplate.configuration.schema",
            function (newValue) {
                if (newValue !== undefined) {
                    $scope.schema = newValue;
                }
            }
        );
        $scope.$watch(
            "atTemplate.configurationUi.schemaForm",
            function (newValue) {
                if (newValue === "" || newValue === undefined) {
                    $scope.form = ["*"];
                }
                else {
                    $scope.form = newValue;
                }
            }
        );

        $scope.formChanged = function (e) {
            $scope.atTemplate.configurationUi.schemaForm = JSON.parse($scope.jsonForm);
        };
        $scope.schemaChanged = function (e) {
            $scope.atTemplate.configuration.schema = JSON.parse($scope.jsonSchema);
        };
    }
]);




