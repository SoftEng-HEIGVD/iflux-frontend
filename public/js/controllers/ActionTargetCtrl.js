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
        $scope.errorMessages = null;
        var isUpdate = false;
        //init the data structure
        $scope.atInstance = {"configuration": {}};
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
            if (isUpdate) {
                $scope.atInstance.actionTargetInstanceId = instanceId;
                ActionTargetInstance.update($scope.atInstance, function success(data, status) {
                        $location.path('/actionTarget');
                        $scope.errorMessages = null;
                        isUpdate = false;
                        $scope.errorMessages = null;
                    },
                    function error(err) {
                        $scope.errorMessages = [];
                        if (err.data !== null && err.data.name !== undefined) {
                            $scope.errorMessages.push(err.data.name[0]);
                        }

                    });
            }
            else {
                ActionTargetInstance.save($scope.atInstance, function success(data, status) {
                        $location.path('/actionTarget');
                        $scope.errorMessages = null;
                    },
                    function error(err) {
                        $scope.errorMessages = [];
                        if (err.data !== null && err.data.organizationId !== undefined) {
                            $scope.errorMessages.push(err.data.organizationId[0]);
                        }
                        if (err.data !== null && err.data.actionTargetTemplateId !== undefined) {
                            $scope.errorMessages.push(err.data.actionTargetTemplateId[0]);
                        }
                    });
            }

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
                $scope.jsonForm = ["*"];
                if (data.configurationUi === undefined || data.configurationUi.schemaForm === "" || data.configurationUi.schemaForm === undefined) {

                    $scope.atTemplate.configurationUi = {};
                    $scope.atTemplate.configurationUi.schemaForm = "";
                }
                else {
                    $scope.jsonForm = JSON.stringify(data.configurationUi.schemaForm, null, '\t');
                }
            });

            isUpdate = true;
        }
        //Or a new template
        else {
            $scope.buttonName = "Create it!";
            $scope.atTemplate = {"configurationUi": {}, "configuration": {}};

        }

        $scope.cancel = function () {
            $location.path('/actionTarget');
            isUpdate = false;
        };

        $scope.submitForm = function () {
            if (isUpdate) {
                $scope.atTemplate.actionTargetId = templateId;
                ActionTargetTemplate.update($scope.atTemplate,
                    function success(data, status) {
                        $location.path('/actionTarget');
                        $scope.errorMessages = null;
                        isUpdate = false;
                    },
                    function error(err) {
                        $scope.errorMessages = err.data.name;
                    });
            }
            else {
                ActionTargetTemplate.save($scope.atTemplate,
                    function success(data, status) {
                        $location.path('/actionTarget');
                        $scope.errorMessages = null;
                    },
                    function error(err) {
                        $scope.errorMessages =[];
                        if (err.data !== null && err.data.name !== undefined) {
                            $scope.errorMessages.push(err.data.name[0]);
                        }
                        if (err.data !== null && err.data.configuration !== undefined) {
                            $scope.errorMessages.push(err.data.configuration.url[0]);
                        }
                        if (err.data !== null && err.data.target !== undefined) {
                            $scope.errorMessages.push(err.data.target[0]);
                        }
                        if (err.data !== null && err.data.organizationId !== undefined) {
                            $scope.errorMessages.push(err.data.organizationId[0]);
                        }

                    });
            }
        };
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




