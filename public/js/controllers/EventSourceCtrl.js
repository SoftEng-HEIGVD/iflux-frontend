/**
 * Created by vincent on 5/21/15.
 */

var iFluxFrontCtrl = angular.module('EventSource', []);

iFluxFrontCtrl.controller('EventSourceMgmtCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'EventSourceTemplate', 'EventSource', 'Me',
    function ($rootScope, $scope, $location, $localStorage, EventSourceTemplate, EventSource, Me) {
        $scope.organizations = Me.query();
        $scope.showIndex = null;
        $scope.eventSourceTemplates = EventSourceTemplate.query({organizationId: $rootScope.globalCurrentOrganization});
        $scope.eventSources = EventSource.query({organizationId: $rootScope.globalCurrentOrganization});
        $scope.selectTableRow = function (index, templateId) {
            if ($scope.showIndex === index) {
                $scope.showIndex = null;
            }
            else {
                $scope.showIndex = index;
            }
        };

        $scope.createES = function (esTemplateId) {
            $rootScope.esTemplateId = esTemplateId;
            $location.path(contextRoot + '/eventSourceEditor');
        };
        $scope.modifyES = function (eSourceId, esTemplateId) {
            $rootScope.esTemplateId = esTemplateId;
            $location.path(contextRoot + '/eventSourceEditor/' + eSourceId);
        }
        $scope.deleteESTemplate = function(esTemplateID, idx){
            EventSourceTemplate.delete({eventSourceId: esTemplateID}, function success(res) {
                $scope.eventSourceTemplates.splice(idx, 1);
            }, function error(res) {
                if (res.status == 403) {
                    $scope.errorMessage = "You cannot delete it. Not found or is referenced in another model";
                }
            });
        };
        $scope.deleteES = function(esID){
            EventSource.delete({eventSourceId: esID}, function success(res) {
                $scope.eventSourceTemplates = EventSourceTemplate.query({organizationId: $rootScope.globalCurrentOrganization});
                $scope.eventSources = EventSource.query({organizationId: $rootScope.globalCurrentOrganization});
            }, function error(res) {
                if (res.status == 403) {
                    $scope.errorMessage = "You cannot delete it. Not found or is referenced in another model";
                }
            });
        }
    }

]);


iFluxFrontCtrl.controller('EventSourceCtrl', ['$rootScope', '$scope', '$location', '$route', '$localStorage', 'EventSourceTemplate', 'EventSource', 'Me',
    function ($rootScope, $scope, $location, $route, $localStorage, EventSourceTemplate, EventSource, Me) {
        $scope.organizations = Me.query();
        var isUpdate = false;
        var esId = $route.current.params.id;
        //init the data structure
        $scope.eSource = {"configuration": {}};

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
        if (esId !== undefined && esId !== "") {
            //   selectedRule = $filter('filter')(SharedProperties.getProperty(), {id: ruleId})[0];
            $scope.buttonName = "Update it!";
            $scope.eSource = EventSource.get({eventSourceId: esId});
            isUpdate = true;
        }
        //Or a new template
        else {

            $scope.eSource.eventSourceTemplateId = $rootScope.esTemplateId;
            $scope.buttonName = "Create it!";
        }

        $scope.cancel = function () {
            $location.path(contextRoot + '/eventSource');
        };

        $scope.submitForm = function () {
            if (isUpdate) {
                $scope.eSource.eventSourceId = esId;
                EventSource.update($scope.eSource,
                    function success(data, status) {
                        $location.path(contextRoot + '/eventSource');
                        $scope.errorMessages = null;
                        isUpdate = false;
                    },
                    function error(err) {
                        $scope.errorMessages = err.data.name;
                    });
            }
            else {
                $scope.eSource.organizationId = $rootScope.globalCurrentOrganization;
                EventSource.save($scope.eSource,
                    function success(data, status) {
                        $location.path(contextRoot + '/eventSource');
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
iFluxFrontCtrl.controller('EventSourceTemplateCtrl', ['$rootScope', '$scope', '$location', '$route', '$localStorage', 'EventSourceTemplate', 'Me',
    function ($rootScope, $scope, $location, $route, $localStorage, EventSourceTemplate, Me) {
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
            $location.path(contextRoot + '/eventSource');
        };

        $scope.submitForm = function () {
            if (isUpdate) {
                $scope.esTemplate.eventSourceId = templateId;
                EventSourceTemplate.update($scope.esTemplate,
                    function success(data, status) {
                        $location.path(contextRoot + '/eventSource');
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
                        $location.path(contextRoot + '/eventSource');
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



