'use strict';


/**
 * Created by vincent on 4/1/15.
 */


var iFluxFrontendApp = angular.module('iFluxFrontendApp', [
    'ngRoute',
    'ngStorage',
    'schemaForm',
    'ui.select',
    'iFluxFrontControllers',
    'iFluxFrontFilters',
    'iFluxFrontServices',
    'iFluxDirectives',
    'frapontillo.bootstrap-switch',
    'ngSanitize'
]);

iFluxFrontendApp.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {

        $routeProvider.
            when('/home', {templateUrl: 'app/partials/home.html'}).
            when('/cockpit', {templateUrl: 'app/partials/cockpit.html'}).

            when('/rules', {templateUrl: 'app/partials/rulesManagment.html', controller: 'RuleCtrl'}).
            when('/ruleEditor', {templateUrl: 'app/partials/ruleEditor.html', controller: 'RuleEditorCtrl'}).
            when('/ruleEditor/:id', {templateUrl: 'app/partials/ruleEditor.html', controller: 'RuleEditorCtrl'}).

            when('/signin', {templateUrl: 'app/partials/signin.html', controller: 'AuthCtrl'}).
            when('/register', {templateUrl: 'app/partials/register.html', controller: 'AuthCtrl'}).
            when('/settings', {templateUrl: 'app/partials/settings.html', controller: 'SettingsCtrl'}).

            when('/actionTarget', {templateUrl: 'app/partials/actionTargetManagement.html', controller: 'ActionTargetCtrl'}).
            when('/actionTargetInstanceEditor', {templateUrl: 'app/partials/actionTargetInstanceEditor.html', controller: 'ActionTargetInstanceCtrl'}).
            when('/actionTargetTemplateEditor', {templateUrl: 'app/partials/actionTargetTemplateEditor.html', controller: 'ActionTargetTemplateCtrl'}).
            when('/actionTargetInstanceEditor/:id', {templateUrl: 'app/partials/actionTargetInstanceEditor.html', controller: 'ActionTargetInstanceCtrl'}).
            when('/actionTargetTemplateEditor/:id', {templateUrl: 'app/partials/actionTargetTemplateEditor.html', controller: 'ActionTargetTemplateCtrl'}).

            when('/eventSource', {templateUrl: 'app/partials/eventSourceManagement.html', controller: 'EventSourceCtrl'}).
            when('/eventSourceInstanceEditor', {templateUrl: 'app/partials/eventSourceInstanceEditor.html', controller: 'EventSourceInstanceCtrl'}).
            when('/eventSourceTemplateEditor', {templateUrl: 'app/partials/eventSourceTemplateEditor.html', controller: 'EventSourceTemplateCtrl'}).
            when('/eventSourceInstanceEditor/:id', {templateUrl: 'app/partials/eventSourceInstanceEditor.html', controller: 'EventSourceInstanceCtrl'}).
            when('/eventSourceTemplateEditor/:id', {templateUrl: 'app/partials/eventSourceTemplateEditor.html', controller: 'EventSourceTemplateCtrl'}).

            when('/userOrganizationEditor', {templateUrl: 'app/partials/userOrganizationEditor.html', controller: 'userOrganizationEditorCtrl'}).

            otherwise({redirectTo: '/home'});

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }
]);