/**
 * Created by vincent on 5/12/15.
 */
var iFluxFrontCtrl = angular.module('AuthenticationCtrl', []);

iFluxFrontCtrl.controller('AuthCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Authentication',
    function ($rootScope, $scope, $location, $localStorage, Authentication) {
        $scope.errorMessages = null;
        $scope.credentials = {};


        $scope.login = function () {
            $scope.errorMessages = [];
            Authentication.login($scope.credentials,
                function (res) {
                    if (res.type == false) {
                    } else {
                        $localStorage.token = res.token;
                        $rootScope.token = $localStorage.token;
                        $rootScope.isAuthenticate = $localStorage.token;
                        $location.path(contextRoot + '/cockpit');
                    }
                }, function (err) {
                    console.log("error: "+ err);
                    if (err.data && err.data.name) {
                        $scope.errorMessages.push(err.data.name);
                    }
                    else if (err.status == 401) {
                        $scope.errorMessages.push("Wrong username or password");
                    }
                    else {
                        $scope.errorMessages.push("An error occur!");
                    }
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
                        $location.path(contextRoot + '/signin');

                    }, function error(err) {
                        $scope.errorMessages = [];
                        console.log(err);
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
            $location.path(contextRoot + '/signin');
        };

        $rootScope.isAuthenticate = $localStorage.token;
    }

]);


iFluxFrontCtrl.controller('LoginInfoCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Me', '$route',
    function ($rootScope, $scope, $location, $localStorage, Me, $route) {
        $rootScope.$watch(
            "isAuthenticate",
            function (newValue) {
                if (newValue) {
                    $scope.organizations = Me.query(function success(data) {
                        if (data.length >= 1) {
                            $rootScope.globalCurrentOrganization = data[0].id;
                            $localStorage.globalCurrentOrganization = data[0].id;
                            $scope.currentOrganization = data[0].id;
                        }
                    });

                }
            }
        );

        $scope.currentOrganization = $localStorage.globalCurrentOrganization;
        $rootScope.globalCurrentOrganization = $localStorage.globalCurrentOrganization;
        $scope.changeOrganization = function (value, model) {
            console.log(value + " || " + model);
            $rootScope.globalCurrentOrganization = model;
            $localStorage.globalCurrentOrganization = model;
            $route.reload();
        };
    }
]);