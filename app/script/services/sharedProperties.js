/**
 * Created by vincent on 4/22/15.
 */
var iFluxFrontServices = angular.module('sharedProperties', []);

iFluxFrontServices.service('SharedProperties', function () {
        var property = {};

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function (value) {
                property = value;
            }
        };
    }
);

iFluxFrontServices.factory('Utils', ['$localStorage',
    function ($localStorage) {

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }
        return {
            currentUser: getUserFromToken()
        };

    }
]);