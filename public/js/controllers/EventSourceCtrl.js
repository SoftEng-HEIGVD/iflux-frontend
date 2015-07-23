/**
 * Created by vincent on 5/21/15.
 */

var iFluxFrontCtrl = angular.module('EventSource', []);

iFluxFrontCtrl.controller('EventSourceCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'EventSourceTemplate', 'EventSourceInstance', 'Me',
    function ($rootScope, $scope, $location, $localStorage, EventSourceTemplate, EventSourceInstance, Me) {
        $scope.organizations = Me.query();
        $scope.showIndex = null;
        $scope.eventSourceTemplates = EventSourceTemplate.query({organizationId: $rootScope.globalCurrentOrganization});
        $scope.eventSourceInstances = EventSourceInstance.query({organizationId: $rootScope.globalCurrentOrganization});
        $scope.selectTableRow = function (index, templateId) {
            if ($scope.showIndex === index) {
                $scope.showIndex = null;
            }
            else {
                $scope.showIndex = index;
            }
        };

        $scope.createInstance = function (esTemplateId) {
            $rootScope.esTemplateId = esTemplateId;
            $location.path('/eventSourceInstanceEditor');
        };
        $scope.modifyInstance = function (esInstanceId, esTemplateId) {
            $rootScope.esTemplateId = esTemplateId;
            $location.path('/eventSourceInstanceEditor/' + esInstanceId);
        }
    }

]);


iFluxFrontCtrl.controller('EventSourceInstanceCtrl', ['$rootScope', '$scope', '$location', '$route', '$localStorage', 'EventSourceTemplate', 'EventSourceInstance', 'Me',
    function ($rootScope, $scope, $location, $route, $localStorage, EventSourceTemplate, EventSourceInstance, Me) {
        $scope.organizations = Me.query();
        var isUpdate = false;
        var instanceId = $route.current.params.id;
        //init the data structure
        $scope.esInstance = {"configuration": {}};

        //get schema and form for configuration
        EventSourceTemplate.get({eventSourceId: $rootScope.esTemplateId}, function success(data, status) {
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
            $scope.esInstance = EventSourceInstance.get({eventSourceInstanceId: instanceId});
            isUpdate = true;
        }
        //Or a new template
        else {

            $scope.esInstance.eventSourceTemplateId = $rootScope.esTemplateId;
            $scope.buttonName = "Create it!";
        }

        $scope.cancel = function () {
            $location.path('/eventSource');
        }

        $scope.submitForm = function () {
            if (isUpdate) {
                $scope.esInstance.eventSourceInstanceId = instanceId;
                EventSourceInstance.update($scope.esInstance,
                    function success(data, status) {
                        $location.path('/eventSource');
                        $scope.errorMessages = null;
                        isUpdate = false;
                    },
                    function error(err) {
                        $scope.errorMessages = err.data.name;
                    });
            }
            else {
                $scope.esInstance.organizationId = $rootScope.globalCurrentOrganization;
                EventSourceInstance.save($scope.esInstance,
                    function success(data, status) {
                        $location.path('/eventSource');
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
        }


    }
]);
iFluxFrontCtrl.controller('EventSourceTemplateCtrl', ['$rootScope', '$scope', '$location', '$route', '$localStorage', 'EventSourceTemplate', 'EventSourceInstance', 'Me',
    function ($rootScope, $scope, $location, $route, $localStorage, EventSourceTemplate, EventSourceInstance, Me) {
        $scope.organizations = Me.query();
        var isUpdate = false;
        var templateId = $route.current.params.id;
        //init the data structure

        //if it's a modification
        if (templateId !== undefined && templateId !== "") {
            $scope.buttonName = "Update it!";
            $scope.esTemplate = EventSourceTemplate.get({eventSourceId: templateId}, function success(data, status) {
                $scope.jsonSchema = JSON.stringify(data.configuration.schema, null, '\t');

                if (data.configurationUi === undefined || data.configurationUi.schemaForm === undefined || data.configurationUi.schemaForm === "" || !data.configurationUi.schemaForm) {
                    $scope.jsonForm = ["*"];
                    $scope.esTemplate.configurationUi = {};
                    $scope.esTemplate.configurationUi.schemaForm = ["*"];
                }
                else {
                    $scope.jsonForm = JSON.stringify(data.configurationUi.schemaForm, null, '\t');
                }
            });

            isUpdate = true;
        }
        //Or a new template
        else {

            $scope.esTemplate = {"configurationUi": {}, "configuration": {}, "public":false};
            $scope.buttonName = "Create it!";
        }

        $scope.cancel = function () {
            $location.path('/eventSource');
        };

        $scope.submitForm = function () {
            if (isUpdate) {
                $scope.esTemplate.eventSourceId = templateId;
                EventSourceTemplate.update($scope.esTemplate,
                    function success(data, status) {
                        $location.path('/eventSource');
                        $scope.errorMessages = null;
                        isUpdate = false;
                    },
                    function error(err) {
                        $scope.errorMessages = err.data.name;
                    });
            }
            else {
                $scope.esTemplate.organizationId = $rootScope.globalCurrentOrganization;
                EventSourceTemplate.save($scope.esTemplate,
                    function success(data, status) {
                        $location.path('/eventSource');
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
            "esTemplate.configuration.schema",
            function (newValue) {
                if (newValue !== undefined) {
                    $scope.schema = newValue;
                }
            }
        );
        $scope.$watch(
            "esTemplate.configurationUi.schemaForm",
            function (newValue) {
                if (newValue === "" || newValue === undefined) {
                    $scope.form = ["*"];
                }
                else {
                    $scope.form = newValue;
                }
            }
        );

        $scope.eventFormChanged = function (e) {
            $scope.esTemplate.configurationUi.schemaForm = JSON.parse($scope.jsonForm);
        };
        $scope.eventSchemaChanged = function (e) {
            $scope.esTemplate.configuration.schema = JSON.parse($scope.jsonSchema);
        };
    }
]);



