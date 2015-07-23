/**
 * Created by vincent on 5/12/15.
 */
var iFluxFrontCtrl = angular.module('AuthenticationCtrl', []);

iFluxFrontCtrl.controller('AuthCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Authentication',
    function ($rootScope, $scope, $location, $localStorage, Authentication) {
        $scope.errorMessages = null;
        $scope.credentials = {};


        $scope.login = function () {
            Authentication.login($scope.credentials,
                function (res) {
                    if (res.type == false) {
                    } else {
                        $localStorage.token = res.token;
                        $rootScope.token = $localStorage.token;
                        $rootScope.isAuthenticate = $localStorage.token;
                        $location.path('/cockpit');
                    }
                }, function (err) {
                    $scope.errorMessages = err.data.name;
                });
            $rootScope.token = $localStorage.token;
            $rootScope.isAuthenticate = $localStorage.token;
        };

        $scope.register = function () {
            if ($scope.credentials.password !== $scope.credentials.passwordConfirmation) {
                $scope.errorMessages = [];
                $scope.errorMessages.push("Password does not match");
            }
            else {
                Authentication.register($scope.credentials,
                    function success(data) {
                        $scope.errorMessages = null;
                        $location.path('/signin');

                    }, function error(err) {
                        $scope.errorMessages = [];
                        if (err.data !== null && err.data.email !== undefined) {
                            $scope.errorMessages.push(err.data.email[0]);
                        }
                        if (err.data !== null && err.data.password !== undefined) {
                            $scope.errorMessages.push(err.data.password[0]);
                        }
                        if (err.data !== null && err.data.firstName !== undefined) {
                            $scope.errorMessages.push(err.data.firstName[0]);
                        }
                        if (err.data !== null && err.data.lastName !== undefined) {
                            $scope.errorMessages.push(err.data.lastName[0]);
                        }
                    }
                );
            }
        };

        $scope.logout = function () {
            $rootScope.isAuthenticate = null;
            delete $localStorage.token;
            delete $localStorage.globalCurrentOrganization;
            $location.path('/signin');
        };

        $rootScope.isAuthenticate = $localStorage.token;
    }

]);


iFluxFrontCtrl.controller('LoginInfoCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Me', '$route',
    function ($rootScope, $scope, $location, $localStorage, Me, $route) {
        $scope.organizations = Me.query();

        $scope.currentOrganization = $localStorage.globalCurrentOrganization;
        $rootScope.globalCurrentOrganization = $localStorage.globalCurrentOrganization;
        $scope.someFunction = function (value, model) {
            $rootScope.globalCurrentOrganization = model;
            $localStorage.globalCurrentOrganization = model;
            $route.reload();
        };
    }
]);