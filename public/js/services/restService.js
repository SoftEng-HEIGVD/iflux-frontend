/**
 * Created by vincent on 4/22/15.
 */
var iFluxFrontServices = angular.module('restServices', ['ngResource']);


iFluxFrontServices.factory('Authentication', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/auth/:funct', {}, {
            login: {method: 'POST', params: {funct: 'signin'}},
            register: {method: 'POST', params: {funct: 'register'}}
        });
    }
]);

iFluxFrontServices.factory('ActionTarget', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/actionTargets/:actionTargetId', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {actionTargetId: '@actionTargetId'}},
            get: {method: 'GET', params: {actionTargetId: '@actionTargetId'}},
            delete: {method: 'DELETE', params: {actionTargetId: '@actionTargetId'}}
        });
    }
]);

iFluxFrontServices.factory('ActionTargetTemplate', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/actionTargetTemplates/:actionTargetId', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {actionTargetId: '@actionTargetId'}},
            get: {method: 'GET', params: {actionTargetId: '@actionTargetId'}},
            delete: {method: 'DELETE', params: {actionTargetId: '@actionTargetId'}}
        });
    }
]);
iFluxFrontServices.factory('ActionType', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/actionTypes/:actionTypeId', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {actionTypeId: '@actionTypeId'}},
            get: {method: 'GET', params: {actionTypeId: '@actionTypeId'}},
            delete: {method: 'DELETE', params: {actionTypeId: '@actionTypeId'}}
        });
    }
]);

iFluxFrontServices.factory('EventSource', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/eventSources/:eventSourceId', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {eventSourceId: '@eventSourceId'}},
            get: {method: 'GET', params: {eventSourceId: '@eventSourceId'}},
            delete: {method: 'DELETE', params: {eventSourceId: '@eventSourceId'}}
        });
    }
]);

iFluxFrontServices.factory('EventSourceTemplate', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/eventSourceTemplates/:eventSourceId', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {eventSourceId: '@eventSourceId'}},
            get: {method: 'GET', params: {eventSourceId: '@eventSourceId'}},
            delete: {method: 'DELETE', params: {eventSourceId: '@eventSourceId'}}
        });
    }
]);
iFluxFrontServices.factory('EventType', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/eventTypes/:eventTypeId', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {eventTypeId: '@eventTypeId'}},
            get: {method: 'GET', params: {eventTypeId: '@eventTypeId'}},
            delete: {method: 'DELETE', params: {eventTypeId: '@eventTypeId'}}
        });
    }
]);
iFluxFrontServices.factory('Organization', ['$resource',
    function ($resource) {
        return $resource(baseUrl + '/organizations/:organizationId/:action', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'},
            update: {method: 'PATCH', params: {organizationId: '@organizationId'}},
            delete: {method: 'DELETE', params: {organizationId: '@organizationId'}},
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
