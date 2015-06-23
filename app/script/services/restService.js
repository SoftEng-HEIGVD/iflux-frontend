/**
 * Created by vincent on 4/22/15.
 */
var iFluxFrontServices = angular.module('restServices', ['ngResource']);


var baseUrl = "http://localhost:3000/api/v1";



iFluxFrontServices.factory('Authentication', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/auth/:funct', {}, {
            login: {method: 'POST', params: {funct: 'signin'}},
            register: {method: 'POST', params: {funct: 'register'}}
        });
    }
]);

iFluxFrontServices.factory('ActionTargetInstance', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/actionTargetInstances/:actionTargetInstanceId', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {actionTargetInstanceId: '@actionTargetInstanceId'}},
            get: {method: 'GET', params: {actionTargetInstanceId: '@actionTargetInstanceId'}}
        });
    }
]);

iFluxFrontServices.factory('ActionTargetTemplate', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/actionTargetTemplates/:actionTargetId', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {actionTargetId: '@actionTargetId'}},
            get: {method: 'GET', params: {actionTargetId: '@actionTargetId'}}
        });
    }
]);

iFluxFrontServices.factory('EventSourceInstance', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/eventSourceInstances/:eventSourceInstanceId', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {eventSourceInstanceId: '@eventSourceInstanceId'}},
            get: {method: 'GET', params: {eventSourceInstanceId: '@eventSourceInstanceId'}}
        });
    }
]);

iFluxFrontServices.factory('EventSourceTemplate', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/eventSourceTemplates/:eventSourceId', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {eventSourceId: '@eventSourceId'}},
            get: {method: 'GET', params: {eventSourceId: '@eventSourceId'}}
        });
    }
]);

iFluxFrontServices.factory('Organization', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/organizations/:organizationId/:action', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {organizationId: '@organizationId'}},
            get: {method: 'GET', params: {organizationId: '@organizationId'}},
            action: {method: 'POST', params: {organizationId: '@organizationId', action: 'actions'}},
            users: {method: 'GET', params: {organizationId: '@organizationId', action: 'users'}, isArray: true}
        });
    }
]);

iFluxFrontServices.factory('Users', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/users/:userId', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {userId: '@userId'}},
            get: {method: 'GET', params: {userId: '@userId'}}
        });
    }
]);

iFluxFrontServices.factory('Me', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/me/organizations', {}, {
            query: {method: 'GET', isArray: true}
        });
    }
]);

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