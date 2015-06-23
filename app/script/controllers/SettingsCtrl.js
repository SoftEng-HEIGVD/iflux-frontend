/**
 * Created by vincent on 5/12/15.
 */

var iFluxFrontCtrl = angular.module('SettingsCtrl', []);

iFluxFrontCtrl.controller('SettingsCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Organization', 'Users', 'Utils',
    function ($rootScope, $scope, $location, $localStorage, Organization, Users, Utils) {
        $scope.allOrgAvailable = Organization.query();

        //get user info stored in the token
        var currentUser = Utils.currentUser();
        $scope.detailCurrentUser = currentUser;

        $scope.modifyUser = function () {
            Users.update($scope.detailCurrentUser);
        };

        $scope.modifyOrganization = function (organization) {
            //TODO organization must contains organizationId int
            Organization.update(organization);
        }
    }

]);
