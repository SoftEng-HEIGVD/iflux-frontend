/**
 * Created by vincent on 4/22/15.
 */
var iFluxFrontServices = angular.module('restServices', ['ngResource']);


var baseUrl = "http://localhost:3000/v1";

iFluxFrontServices.factory('Rules', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/rules/:rulesId', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {rulesId: '@rulesId'}},
            get: {method: 'GET', params: {rulesId: '@rulesId'}},
            delete: {method: 'DELETE', params: {rulesId: '@rulesId'}}
        });
    }
]);

iFluxFrontServices.factory('ActionTarget', ['$resource',
    function ($resource) {
        return $resource('./public/template/actionTargets.json', {}, {
            query: {method: 'GET', isArray: true}
        });
    }
]);

iFluxFrontServices.factory('EventSource', ['$resource',
    function ($resource) {
        return $resource('./public/template/eventSources.json', {}, {
            query: {method: 'GET', isArray: true}
        });
    }
]);

iFluxFrontServices.factory('Authentication', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/auth/:funct', {}, {
            login: {method: 'POST', params: {funct: 'signin'}},
            register: {method: 'POST', params: {funct: 'register'}}
        });
    }
]);

iFluxFrontServices.factory('Users', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/users/:userId/:action', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {organizationId: '@organizationId'}},
            get: {method: 'GET', params: {organizationId: '@organizationId'}},
            action: {method: 'POST', params: {organizationId: '@organizationId', action: 'action'}}
        });
    }
]);

iFluxFrontServices.factory('Organizations', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/users/:userId', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {userId: '@userId'}},
            get: {method: 'GET', params: {userId: '@userId'}}
        });
    }
]);