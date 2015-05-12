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
                    partnerId = res.tpartnersTid.tidPartner;
                    $location.path('/cockpit');
                }
            });
            //TODO remove when authentication is working
            $rootScope.isAuthenticate = "blublu";
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
            //TODO remove when authentication is working
            $rootScope.isAuthenticate = "blublu";
        };

        $scope.logout = function () {
            $rootScope.isAuthenticate = null;
            delete $localStorage.token;
            $location.path('/home');
        };

        //TODO change with $scope.token =$localStorage.token;
        //   $scope.isAuthenticate =$localStorage.token;
    }

]);
