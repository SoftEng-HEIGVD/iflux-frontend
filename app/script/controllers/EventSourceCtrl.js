/**
 * Created by vincent on 5/21/15.
 */

var iFluxFrontCtrl = angular.module('EventSource', []);

iFluxFrontCtrl.controller('EventSourceCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'EventSourceTemplate', 'EventSourceInstance',
    function ($rootScope, $scope, $location, $localStorage, EventSourceTemplate, EventSourceInstance) {

        $scope.showIndex = null;
        $scope.eventSourceTemplates = EventSourceTemplate.query({allOrganizations: true});
        $scope.eventSourceInstances = EventSourceInstance.query({allOrganizations: true});
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
        }
    }

]);


iFluxFrontCtrl.controller('EventSourceInstanceCtrl', ['$rootScope', '$scope', '$location', '$route', '$localStorage', 'EventSourceTemplate', 'EventSourceInstance', 'Me',
    function ($rootScope, $scope, $location, $route, $localStorage, EventSourceTemplate, EventSourceInstance, Me) {

        $scope.organizations = Me.query();
        var isUpdate = false;
        var instanceId = $route.current.params.id;
        //init the data structure

        $scope.esInstance = {};
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
            $("input,textarea").not("[type=submit]").jqBootstrapValidation();
            if (isUpdate) {
                $scope.esInstance.eventSourceInstanceId = instanceId;
                EventSourceInstance.update($scope.esInstance);
            }
            else {
                EventSourceInstance.save($scope.esInstance);
            }

            $location.path('/eventSource');
            isUpdate = false;
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
            $scope.esTemplate = EventSourceTemplate.get({eventSourceId: templateId});
            isUpdate = true;
        }
        //Or a new template
        else {
            $scope.buttonName = "Create it!";
        }

        $scope.cancel = function () {
            $location.path('/eventSource');
        }

        $scope.submitForm = function () {
            $("input,textarea").not("[type=submit]").jqBootstrapValidation();
            if (isUpdate) {
                $scope.esTemplate.eventSourceId = templateId;
                EventSourceTemplate.update($scope.esTemplate);
            }
            else {
                EventSourceTemplate.save($scope.esTemplate);
            }
            $location.path('/eventSource');
            isUpdate = false;
        }
    }
]);



