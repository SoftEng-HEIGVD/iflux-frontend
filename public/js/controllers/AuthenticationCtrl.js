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
                } else {
                    $localStorage.token = res.token;
                    $rootScope.token = $localStorage.token;
                    $rootScope.isAuthenticate = $localStorage.token;
                    $location.path('/cockpit');
                }
            }, function (err) {
                alert(err.message);
                $rootScope.error = 'Failed to signin';
            });
            $rootScope.token = $localStorage.token;
            $rootScope.isAuthenticate = $localStorage.token;
        };

        $scope.register = function () {
            Authentication.register($scope.credentials, function success(data) {

                $location.path('/login');

            }, function error(err) {
                if(err.data.email !==undefined){
                    alert(JSON.stringify(err.data.email[0]));
                }
                if(err.data.password !==undefined){
                    alert(JSON.stringify(err.data.password[0]));
                }
                if(err.data.firstName !==undefined){
                    alert(JSON.stringify(err.data.firstName[0]));
                }
                $rootScope.error = 'Failed to signup';
                $location.path('/register');
            });

        };

        $scope.logout = function () {
            $rootScope.isAuthenticate = null;
            delete $localStorage.token;
            $location.path('/signin');
        };

        $rootScope.isAuthenticate = $localStorage.token;
    }

]);


iFluxFrontCtrl.controller('LoginInfoCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Me',
    function ($rootScope, $scope, $location, $localStorage, Me) {
        $scope.organizations = Me.query();

    }
]);