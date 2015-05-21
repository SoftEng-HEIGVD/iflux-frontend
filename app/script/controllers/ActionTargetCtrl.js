/**
 * Created by vincent on 5/20/15.
 */

var iFluxFrontCtrl = angular.module('ActionTarget', []);

iFluxFrontCtrl.controller('ActionTargetCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'ActionTargetTemplate', 'ActionTargetInstance',
    function ($rootScope, $scope, $location, $localStorage, ActionTargetTemplate, ActionTargetInstance) {

        $scope.showIndex = null;
        //   $scope.actionTargetTemplates = ActionTargetTemplate.query({allOrganizations:true});
        $scope.actionTargetTemplates = [
            {
                "id": 1,
                "key": "dazimausme",
                "name": "iFlux Slack bot",
                "public": true,
                "organizationId": 1,
                "target": {
                    "url": "http://slackgateway.bot.instance/actions",
                    "token": "<JSON Web Token>"
                }
            },
            {
                "id": 2,
                "key": "asdfasdf",
                "name": "Email ",
                "public": false,
                "organizationId": 2,
                "target": {
                    "url": "http://slackgateway.bot.instance/actions",
                    "token": "<JSON Web Token>"
                }
            },
            {
                "id": 3,
                "key": "werewrew",
                "name": "Metric",
                "public": true,
                "organizationId": 1,
                "target": {
                    "url": "http://slackgateway.bot.instance/actions",
                    "token": "<JSON Web Token>"
                }
            }
        ];
        $scope.actionTargetInstances = [
            {
                "id": 1,
                "name": "my Slack Instance",
                "actionTargetTemplateId": 1,
                "configuration": {
                    "botId": "jgajdsjgiqd"
                }
            },
            {
                "id": 2,
                "name": "Slack instance 2",
                "actionTargetTemplateId": 1,
                "configuration": {
                    "botId": "uiuzi"
                }
            },
            {
                "id": 3,
                "name": "Email me",
                "actionTargetTemplateId": 2,
                "configuration": {
                    "botId": "wewer"
                }
            },
            {
                "id": 4,
                "name": "Metric instance ",
                "actionTargetTemplateId": 3,
                "configuration": {
                    "botId": "gjkhjh"
                }
            },
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


iFluxFrontCtrl.controller('ActionTargetInstanceCtrl', ['$rootScope', '$scope', '$location', '$route','$localStorage', 'ActionTargetTemplate', 'ActionTargetInstance',
    function ($rootScope, $scope, $location, $route, $localStorage, ActionTargetTemplate, ActionTargetInstance) {

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
            $location.path('/actionTarget');
        }

    }
]);
iFluxFrontCtrl.controller('ActionTargetTemplateCtrl', ['$rootScope', '$scope', '$location', '$route', '$localStorage', 'ActionTargetTemplate', 'ActionTargetInstance',
    function ($rootScope, $scope, $location, $route, $localStorage, ActionTargetTemplate, ActionTargetInstance) {
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
            $location.path('/actionTarget');
        }

    }
]);



