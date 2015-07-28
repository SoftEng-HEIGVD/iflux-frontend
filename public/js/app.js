'use strict';


/**
 * Created by vincent on 4/1/15.
 */


var iFluxFrontendApp = angular.module('iFluxFrontendApp', [
    'ngRoute',
    'ngStorage',
    'schemaForm',
    'ui.select',
    'ui.ace',
    'ui.bootstrap',
    'iFluxFrontControllers',
    'iFluxFrontFilters',
    'iFluxFrontServices',
    'iFluxDirectives',
    'frapontillo.bootstrap-switch',
    'ngSanitize'
]);

iFluxFrontendApp.config(['$routeProvider', '$httpProvider', '$locationProvider',
    function ($routeProvider, $httpProvider, $locationProvider) {

        $routeProvider.
            when('/home', {templateUrl: partialsPath + '/home.jade'}).
            when('/cockpit', {templateUrl: partialsPath + '/cockpit.jade'}).

            when('/rules', {templateUrl: partialsPath + '/rulesManagment.jade', controller: 'RuleCtrl'}).
            when('/ruleEditor', {templateUrl: partialsPath + '/ruleEditor.jade', controller: 'RuleEditorCtrl'}).
            when('/ruleEditor/:id', {templateUrl: partialsPath + '/ruleEditor.jade', controller: 'RuleEditorCtrl'}).

            when('/signin', {templateUrl: partialsPath + '/signin.jade', controller: 'AuthCtrl'}).
            when('/register', {templateUrl: partialsPath + '/register.jade', controller: 'AuthCtrl'}).
            when('/settings', {templateUrl: partialsPath + '/settings.jade', controller: 'SettingsCtrl'}).

            when('/actionTarget', {templateUrl: partialsPath + '/actionTargetManagement.jade', controller: 'ActionTargetCtrl'}).
            when('/actionTargetInstanceEditor', {templateUrl: partialsPath + '/actionTargetInstanceEditor.jade', controller: 'ActionTargetInstanceCtrl'}).
            when('/actionTargetTemplateEditor', {templateUrl: partialsPath + '/actionTargetTemplateEditor.jade', controller: 'ActionTargetTemplateCtrl'}).
            when('/actionTargetInstanceEditor/:id', {templateUrl: partialsPath + '/actionTargetInstanceEditor.jade', controller: 'ActionTargetInstanceCtrl'}).
            when('/actionTargetTemplateEditor/:id', {templateUrl: partialsPath + '/actionTargetTemplateEditor.jade', controller: 'ActionTargetTemplateCtrl'}).

            when('/actionType', {templateUrl: partialsPath + '/actionTypeManagement.jade', controller: 'ActionTypeMgmtCtrl'}).
            when('/actionTypeEditor', {templateUrl: partialsPath + '/actionTypeEditor.jade', controller: 'ActionTypeEditorCtrl'}).
            when('/actionTypeEditor/:id', {templateUrl: partialsPath + '/actionTypeEditor.jade', controller: 'ActionTypeEditorCtrl'}).

            when('/eventSource', {templateUrl: partialsPath + '/eventSourceManagement.jade', controller: 'EventSourceCtrl'}).
            when('/eventSourceInstanceEditor', {templateUrl: partialsPath + '/eventSourceInstanceEditor.jade', controller: 'EventSourceInstanceCtrl'}).
            when('/eventSourceTemplateEditor', {templateUrl: partialsPath + '/eventSourceTemplateEditor.jade', controller: 'EventSourceTemplateCtrl'}).
            when('/eventSourceInstanceEditor/:id', {templateUrl: partialsPath + '/eventSourceInstanceEditor.jade', controller: 'EventSourceInstanceCtrl'}).
            when('/eventSourceTemplateEditor/:id', {templateUrl: partialsPath + '/eventSourceTemplateEditor.jade', controller: 'EventSourceTemplateCtrl'}).

            when('/eventType', {templateUrl: partialsPath + '/eventTypeManagement.jade', controller: 'EventTypeMgmtCtrl'}).
            when('/eventTypeEditor', {templateUrl: partialsPath + '/eventTypeEditor.jade', controller: 'EventTypeEditorCtrl'}).
            when('/eventTypeEditor/:id', {templateUrl: partialsPath + '/eventTypeEditor.jade', controller: 'EventTypeEditorCtrl'}).

            when('/userOrganizationEditor', {templateUrl: partialsPath + '/userOrganizationEditor.jade', controller: 'userOrganizationEditorCtrl'}).

            otherwise({redirectTo: '/home'});

         $locationProvider.html5Mode({
             enabled: true,
             requireBase: false
         });
        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            console.log("partialsPath: " + partialsPath);
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }
]);