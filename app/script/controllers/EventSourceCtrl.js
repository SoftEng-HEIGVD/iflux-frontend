/**
 * Created by vincent on 5/21/15.
 */

var iFluxFrontCtrl = angular.module('EventSource', []);

iFluxFrontCtrl.controller('EventSourceCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'EventSourceTemplate', 'EventSourceInstance',
    function ($rootScope, $scope, $location, $localStorage, EventSourceTemplate, EventSourceInstance) {

        $scope.showIndex = null;
        //   $scope.eventSourceTemplates = EventSourceTemplate.query({allOrganizations:true});
        $scope.eventSourceTemplates = [
            {
                "id": 1,
                "key": "ooimemdazaus",
                "name": "iFlux thermometer",
                "public": true,
                "organizationId": 1
            },
            {
                "id": 2,
                "key": "imemdtreeazaus",
                "name": "publibike",
                "public": true,
                "organizationId": 3
            },
            {
                "id": 3,
                "key": "imemdadsfzaus",
                "name": "citizen engagement",
                "public": false,
                "organizationId": 1
            }
        ];
        $scope.eventSourceInstances = [
            {
                "id": 1,
                "name": "my Temperature Instance",
                "eventSourceTemplateId": 1,
                "configuration": {
                    "captorId": "abcdef"
                }
            },
            {
                "id": 2,
                "name": "my Temperature Instance 2",
                "eventSourceTemplateId": 1,
                "configuration": {
                    "captorId": "abcdef"
                }
            },
            {
                "id": 3,
                "name": "my Temperature Instance 3",
                "eventSourceTemplateId": 1,
                "configuration": {
                    "captorId": "abcdef"
                }
            },
            {
                "id": 4,
                "name": "Publibike instance",
                "eventSourceTemplateId": 2,
                "configuration": {
                    "captorId": "abcdef"
                }
            },
            {
                "id": 5,
                "name": "citizen engagement",
                "eventSourceTemplateId": 3,
                "configuration": {
                    "captorId": "abcdef"
                }
            }
        ];

        $scope.selectTableRow = function (index, templateId) {
            if ($scope.showIndex === index) {
                $scope.showIndex = null;
            }
            else {
                $scope.showIndex = index;
            }
        };
    }

]);


iFluxFrontCtrl.controller('EventSourceInstanceCtrl', ['$rootScope', '$scope', '$location', '$route', '$localStorage', 'EventSourceTemplate', 'EventSourceInstance',
    function ($rootScope, $scope, $location, $route, $localStorage, EventSourceTemplate, EventSourceInstance) {

        var templateId = $route.current.params.id;
        //init the data structure

        //if it's a modification
        if (templateId !== undefined && templateId !== "") {
            //   selectedRule = $filter('filter')(SharedProperties.getProperty(), {id: ruleId})[0];
            //     $scope.payload = selectedRule;
            $scope.buttonName = "Update it!";
        }
        //Or a new template
        else {
            $scope.buttonName = "Create it!";
        }

        $scope.cancel = function () {
            $location.path('/eventSource');
        }

    }
]);
iFluxFrontCtrl.controller('EventSourceTemplateCtrl', ['$rootScope', '$scope', '$location', '$route', '$localStorage', 'EventSourceTemplate', 'EventSourceInstance',
    function ($rootScope, $scope, $location, $route, $localStorage, EventSourceTemplate, EventSourceInstance) {
        $scope.organizations = [{"orgName": "HEIA-FR", "orgId": 1}, {"orgName": "HES-SO", "orgId": 2}];

        var templateId = $route.current.params.id;
        //init the data structure

        //if it's a modification
        if (templateId !== undefined && templateId !== "") {
            //   selectedRule = $filter('filter')(SharedProperties.getProperty(), {id: ruleId})[0];
            //     $scope.payload = selectedRule;
            $scope.buttonName = "Update it!";
        }
        //Or a new template
        else {
            $scope.buttonName = "Create it!";
        }

        $scope.cancel = function () {
            $location.path('/eventSource');
        }

    }
]);



