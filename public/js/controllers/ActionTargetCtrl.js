/**
 * Created by vincent on 5/20/15.
 */

var iFluxFrontCtrl = angular.module('ActionTarget', []);

iFluxFrontCtrl.controller('ActionTargetMgmtCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'ActionTargetTemplate', 'ActionTarget','Me',
    function ($rootScope, $scope, $location, $localStorage, ActionTargetTemplate, ActionTarget, Me) {

        $scope.showIndex = null;
        $scope.organizations = Me.query();
        $scope.actionTargetTemplates = ActionTargetTemplate.query({organizationId: $rootScope.globalCurrentOrganization});
        $scope.actionTargets = ActionTarget.query({organizationId: $rootScope.globalCurrentOrganization});
        $scope.selectTableRow = function (index) {
            if ($scope.showIndex === index) {
                $scope.showIndex = null;
            }
            else {
                $scope.showIndex = index;
            }
        };

        $scope.createAT = function (atTemplateId) {
            $rootScope.atTemplateId = atTemplateId;
            $location.path(contextRoot + '/actionTargetEditor');
        };
        $scope.modifyAT = function (aTargetId, atTemplateId) {
            $rootScope.atTemplateId = atTemplateId;
            $location.path(contextRoot + '/actionTargetEditor/' + aTargetId);
        };
        $scope.deleteATTemplate = function (atTemplateId, idx) {
            ActionTargetTemplate.delete({actionTargetId: atTemplateId}, function success(res) {
                $scope.actionTargetTemplates.splice(idx, 1);
            }, function error(res) {
                if (res.status == 403) {
                    $scope.errorMessage = "You cannot delete it. Not found or is referenced in another model";
                }
            });
        };
        $scope.deleteAT = function (atId) {
            ActionTarget.delete({actionTargetId: atId}, function success(res) {
                $scope.actionTargets = ActionTarget.query({organizationId: $rootScope.globalCurrentOrganization});
            }, function error(res) {
                if (res.status == 403) {
                    $scope.errorMessage = "You cannot delete it. Not found or is referenced in another model";
                }
            });
        }

    }

]);


iFluxFrontCtrl.controller('ActionTargetCtrl', ['$rootScope', '$scope', '$location', '$route', '$localStorage', 'ActionTargetTemplate', 'ActionTarget', 'Me',
    function ($rootScope, $scope, $location, $route, $localStorage, ActionTargetTemplate, ActionTarget, Me) {
        $scope.organizations = Me.query();
        $scope.errorMessages = null;
        var isUpdate = false;
        //init the data structure
        $scope.aTarget = {"configuration": {}};
        var atId = $route.current.params.id;
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
        if (atId !== undefined && atId !== "") {
            //   selectedRule = $filter('filter')(SharedProperties.getProperty(), {id: ruleId})[0];
            $scope.buttonName = "Update it!";
            $scope.aTarget = ActionTarget.get({actionTargetId: atId});
            isUpdate = true;
        }
        //Or a new template
        else {
            $scope.aTarget.actionTargetTemplateId = $rootScope.atTemplateId;
            $scope.buttonName = "Create it!";
        }

        $scope.cancel = function () {
            $location.path(contextRoot + '/actionTarget');
        };
        $scope.submitForm = function () {
            if (isUpdate) {
                $scope.aTarget.actionTargetId = atId;
                ActionTarget.update($scope.aTarget, function success(data, status) {
                        $location.path(contextRoot + '/actionTarget');
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
                $scope.aTarget.organizationId = $rootScope.globalCurrentOrganization;
                ActionTarget.save($scope.aTarget, function success(data, status) {
                        $location.path(contextRoot + '/actionTarget');
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
iFluxFrontCtrl.controller('ActionTargetTemplateCtrl', ['$rootScope', '$scope', '$location', '$route', '$localStorage', 'ActionTargetTemplate', 'Me',
    function ($rootScope, $scope, $location, $route, $localStorage, ActionTargetTemplate, Me) {
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
            $scope.atTemplate = {"configurationUi": {}, "configuration": {}, "public": false};

        }

        $scope.cancel = function () {
            $location.path(contextRoot + '/actionTarget');
            isUpdate = false;
        };

        $scope.submitForm = function () {
            if (isUpdate) {
                $scope.atTemplate.actionTargetId = templateId;
                ActionTargetTemplate.update($scope.atTemplate,
                    function success(data, status) {
                        $location.path(contextRoot + '/actionTarget');
                        $scope.errorMessages = null;
                        isUpdate = false;
                    },
                    function error(err) {
                        $scope.errorMessages = err.data.name;
                    });
            }
            else {
                $scope.atTemplate.organizationId = $rootScope.globalCurrentOrganization;
                console.log("orgId: " + $rootScope.globalCurrentOrganization);
                ActionTargetTemplate.save($scope.atTemplate,
                    function success(data, status) {
                        $location.path(contextRoot + '/actionTarget');
                        $scope.errorMessages = null;
                    },
                    function error(err) {
                        $scope.errorMessages = [];
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




