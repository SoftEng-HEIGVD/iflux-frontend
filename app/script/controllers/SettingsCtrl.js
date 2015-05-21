/**
 * Created by vincent on 5/12/15.
 */

var iFluxFrontCtrl = angular.module('SettingsCtrl', []);

iFluxFrontCtrl.controller('SettingsCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Organization', 'Users', 'Utils',
    function ($rootScope, $scope, $location, $localStorage, Organization, Users, Utils) {
        $scope.allOrgAvailable = Organization.query();

        //get currentUserId
        //var currentUser = Utils.currentUser();

        //get user info
        //var detailCurrentUser = Users.get(currentUser.id);
        $scope.detailCurrentUser = {"firstName": "Henri", "lastName": "Dupont", "userId": 1};

        $scope.modifyUser = function () {
            Users.update($scope.detailCurrentUser);
        };

        $scope.modifyOrganization = function (organization) {
            //TODO organization must contains organizationId int
            Organization.update(organization);
        }
    }

]);
