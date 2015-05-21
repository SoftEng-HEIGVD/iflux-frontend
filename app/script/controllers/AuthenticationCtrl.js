/**
 * Created by vincent on 5/12/15.
 */
var iFluxFrontCtrl = angular.module('AuthenticationCtrl', []);

iFluxFrontCtrl.controller('AuthCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Authentication',
    function ($rootScope, $scope, $location, $localStorage, Authentication) {

        $scope.credentials = {};

        $scope.login = function () {
            Authentication.login($scope.credentials, function (res) {
                if (res.type == false) {
                    alert(res.data);
                } else {
                    $localStorage.token = res.token;
                    $location.path('/cockpit');
                }
            });
            //TODO remove the 2 lines when authentication is working
            $location.path('/cockpit');
            $localStorage.token = "blublu";

            $rootScope.isAuthenticate =$localStorage.token;
        };

        $scope.register = function () {
            Authentication.register($scope.credentials, function (res) {
                if (res.type == false) {
                    alert(res.data);
                } else {
                    $localStorage.token = res.data.token;
                    $location.path('/cockpit');
                }
            }, function () {
                $rootScope.error = 'Failed to signup';
            });
            //TODO remove the 2 lines when authentication is working
            $location.path('/cockpit');
            $localStorage.token = "blublu";

            $rootScope.isAuthenticate =$localStorage.token;
        };

        $scope.logout = function () {
            $rootScope.isAuthenticate = null;
            delete $localStorage.token;
            $location.path('/home');
        };

        //TODO change with
        $rootScope.isAuthenticate =$localStorage.token;
    }

]);


iFluxFrontCtrl.controller('LoginInfoCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Me',
    function ($rootScope, $scope, $location, $localStorage, Me) {
        //  $scope.organization = Me.query();
        $scope.organizations = [{"orgName": "HEIA-FR", "orgId": 1}, {"orgName": "HES-SO", "orgId": 2}];

    }
]);