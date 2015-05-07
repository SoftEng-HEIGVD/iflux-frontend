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
            setProperty: function(value) {
                property = value;
            }
        };
    });