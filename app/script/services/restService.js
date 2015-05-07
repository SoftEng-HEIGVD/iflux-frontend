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
