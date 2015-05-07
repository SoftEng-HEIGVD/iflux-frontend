'use strict';


/**
 * Created by vincent on 4/1/15.
 */


var iFluxFrontendApp = angular.module('iFluxFrontendApp', [
    'ngRoute',
    'iFluxFrontControllers',
    'iFluxFrontFilters',
    'iFluxFrontServices',
    'frapontillo.bootstrap-switch',
    'schemaForm',
    'ui.select',
    'ngSanitize'
]);

iFluxFrontendApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {templateUrl: 'app/partials/home.html'}).
            when('/rules', {templateUrl: 'app/partials/rulesManagment.html', controller: 'RuleCtrl'}).
            when('/ruleEditor', {templateUrl: 'app/partials/ruleEditor.html', controller: 'RuleEditorCtrl'}).
            when('/ruleEditor/:id', {templateUrl: 'app/partials/ruleEditor.html', controller: 'RuleEditorCtrl'}).

            otherwise({redirectTo: '/home'});
    }]);