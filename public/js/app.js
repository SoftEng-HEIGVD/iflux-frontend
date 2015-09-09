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
            when(contextRoot + '/home', {templateUrl: partialsPath + '/home.jade'}).
            when(contextRoot + '/cockpit', {templateUrl: partialsPath + '/cockpit.jade'}).

            when(contextRoot + '/rules', {templateUrl: partialsPath + '/rulesManagment.jade', controller: 'RuleCtrl'}).
            when(contextRoot + '/ruleEditor', {templateUrl: partialsPath + '/ruleEditor.jade', controller: 'RuleEditorCtrl'}).
            when(contextRoot + '/ruleEditor/:id', {templateUrl: partialsPath + '/ruleEditor.jade', controller: 'RuleEditorCtrl'}).

            when(contextRoot + '/signin', {templateUrl: partialsPath + '/signin.jade', controller: 'AuthCtrl'}).
            when(contextRoot + '/register', {templateUrl: partialsPath + '/register.jade', controller: 'AuthCtrl'}).
            when(contextRoot + '/settings', {templateUrl: partialsPath + '/settings.jade', controller: 'SettingsCtrl'}).

            when(contextRoot + '/actionTarget', {templateUrl: partialsPath + '/actionTargetManagement.jade', controller: 'ActionTargetMgmtCtrl'}).
            when(contextRoot + '/actionTargetEditor', {templateUrl: partialsPath + '/actionTargetEditor.jade', controller: 'ActionTargetCtrl'}).
            when(contextRoot + '/actionTargetTemplateEditor', {templateUrl: partialsPath + '/actionTargetTemplateEditor.jade', controller: 'ActionTargetTemplateCtrl'}).
            when(contextRoot + '/actionTargetEditor/:id', {templateUrl: partialsPath + '/actionTargetEditor.jade', controller: 'ActionTargetCtrl'}).
            when(contextRoot + '/actionTargetTemplateEditor/:id', {templateUrl: partialsPath + '/actionTargetTemplateEditor.jade', controller: 'ActionTargetTemplateCtrl'}).

            when(contextRoot + '/actionType', {templateUrl: partialsPath + '/actionTypeManagement.jade', controller: 'ActionTypeMgmtCtrl'}).
            when(contextRoot + '/actionTypeEditor', {templateUrl: partialsPath + '/actionTypeEditor.jade', controller: 'ActionTypeEditorCtrl'}).
            when(contextRoot + '/actionTypeEditor/:id', {templateUrl: partialsPath + '/actionTypeEditor.jade', controller: 'ActionTypeEditorCtrl'}).

            when(contextRoot + '/eventSource', {templateUrl: partialsPath + '/eventSourceManagement.jade', controller: 'EventSourceMgmtCtrl'}).
            when(contextRoot + '/eventSourceEditor', {templateUrl: partialsPath + '/eventSourceEditor.jade', controller: 'EventSourceCtrl'}).
            when(contextRoot + '/eventSourceTemplateEditor', {templateUrl: partialsPath + '/eventSourceTemplateEditor.jade', controller: 'EventSourceTemplateCtrl'}).
            when(contextRoot + '/eventSourceEditor/:id', {templateUrl: partialsPath + '/eventSourceEditor.jade', controller: 'EventSourceCtrl'}).
            when(contextRoot + '/eventSourceTemplateEditor/:id', {templateUrl: partialsPath + '/eventSourceTemplateEditor.jade', controller: 'EventSourceTemplateCtrl'}).

            when(contextRoot + '/eventType', {templateUrl: partialsPath + '/eventTypeManagement.jade', controller: 'EventTypeMgmtCtrl'}).
            when(contextRoot + '/eventTypeEditor', {templateUrl: partialsPath + '/eventTypeEditor.jade', controller: 'EventTypeEditorCtrl'}).
            when(contextRoot + '/eventTypeEditor/:id', {templateUrl: partialsPath + '/eventTypeEditor.jade', controller: 'EventTypeEditorCtrl'}).

            when(contextRoot + '/userOrganizationEditor', {templateUrl: partialsPath + '/userOrganizationEditor.jade', controller: 'userOrganizationEditorCtrl'}).

            otherwise({redirectTo: contextRoot + '/home'});

         $locationProvider.html5Mode({
             enabled: true,
             requireBase: false
         });
        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401) {
                        $location.path(contextRoot + '/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }
]);