/**
 * Created by vincent on 5/12/15.
 */

var iFluxFrontCtrl = angular.module('SettingsCtrl', []);

iFluxFrontCtrl.controller('SettingsCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Organization', 'Users', 'Utils', 'Me',
    function ($rootScope, $scope, $location, $localStorage, Organization, Users, Utils, Me) {
        $scope.organizations = Me.query();

        //get user info stored in the token
        var currentUser = Utils.currentUser();
        $scope.detailCurrentUser = currentUser;


        $scope.selectTableRow = function (index, organizationId) {
            if ($scope.showIndex === index) {
                $scope.showIndex = null;
                $scope.users = null;
            }
            else {
                $scope.users = Organization.users({organizationId: organizationId});
                $scope.showIndex = index;
            }
        };

        $scope.createOrganization = function (orgName) {
            Organization.save({"name": orgName}, function success(data, status) {
                $scope.organizations = Me.query();
                $scope.org.name = "";
            });
        };

        $scope.addUser = function(organizationId){
            $rootScope.userOrganizationId = organizationId;
            $location.path('/userOrganizationEditor');
        };


        $scope.modifyOrganization = function (organization) {
            Organization.update(organization);
        }
    }

]);
iFluxFrontCtrl.controller('userOrganizationEditorCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Organization',
    function ($rootScope, $scope, $location, $localStorage, Organization) {


        $scope.submitForm = function(){
            $scope.form.organizationId = $rootScope.userOrganizationId;
            $scope.form.type = "addUser";
            Organization.action($scope.form);
            $location.path('/settings');
        }
        $scope.cancel = function(){
            $location.path('/settings');

        };
    }

]);


