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
            when('/home', {templateUrl: partialsPath + '/home.html'}).
            when('/cockpit', {templateUrl: partialsPath + '/cockpit.html'}).

            when('/rules', {templateUrl: partialsPath + '/rulesManagment.html', controller: 'RuleCtrl'}).
            when('/ruleEditor', {templateUrl: partialsPath + '/ruleEditor.html', controller: 'RuleEditorCtrl'}).
            when('/ruleEditor/:id', {templateUrl: partialsPath + '/ruleEditor.html', controller: 'RuleEditorCtrl'}).

            when('/signin', {templateUrl: partialsPath + '/signin.html', controller: 'AuthCtrl'}).
            when('/register', {templateUrl: partialsPath + '/register.html', controller: 'AuthCtrl'}).
            when('/settings', {templateUrl: partialsPath + '/settings.html', controller: 'SettingsCtrl'}).

            when('/actionTarget', {templateUrl: partialsPath + '/actionTargetManagement.html', controller: 'ActionTargetCtrl'}).
            when('/actionTargetInstanceEditor', {templateUrl: partialsPath + '/actionTargetInstanceEditor.html', controller: 'ActionTargetInstanceCtrl'}).
            when('/actionTargetTemplateEditor', {templateUrl: partialsPath + '/actionTargetTemplateEditor.html', controller: 'ActionTargetTemplateCtrl'}).
            when('/actionTargetInstanceEditor/:id', {templateUrl: partialsPath + '/actionTargetInstanceEditor.html', controller: 'ActionTargetInstanceCtrl'}).
            when('/actionTargetTemplateEditor/:id', {templateUrl: partialsPath + '/actionTargetTemplateEditor.html', controller: 'ActionTargetTemplateCtrl'}).

            when('/actionType', {templateUrl: partialsPath + '/actionTypeManagement.html', controller: 'ActionTypeMgmtCtrl'}).
            when('/actionTypeEditor', {templateUrl: partialsPath + '/actionTypeEditor.html', controller: 'ActionTypeEditorCtrl'}).
            when('/actionTypeEditor/:id', {templateUrl: partialsPath + '/actionTypeEditor.html', controller: 'ActionTypeEditorCtrl'}).

            when('/eventSource', {templateUrl: partialsPath + '/eventSourceManagement.html', controller: 'EventSourceCtrl'}).
            when('/eventSourceInstanceEditor', {templateUrl: partialsPath + '/eventSourceInstanceEditor.html', controller: 'EventSourceInstanceCtrl'}).
            when('/eventSourceTemplateEditor', {templateUrl: partialsPath + '/eventSourceTemplateEditor.html', controller: 'EventSourceTemplateCtrl'}).
            when('/eventSourceInstanceEditor/:id', {templateUrl: partialsPath + '/eventSourceInstanceEditor.html', controller: 'EventSourceInstanceCtrl'}).
            when('/eventSourceTemplateEditor/:id', {templateUrl: partialsPath + '/eventSourceTemplateEditor.html', controller: 'EventSourceTemplateCtrl'}).

            when('/userOrganizationEditor', {templateUrl: partialsPath + '/userOrganizationEditor.html', controller: 'userOrganizationEditorCtrl'}).

            otherwise({redirectTo: '/home'});

        // $locationProvider.html5Mode(true);

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
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }
]);