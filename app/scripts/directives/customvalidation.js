'use strict';

/**
 * @ngdoc function
 * @name webappApp.directive:passwordConfirm
 * @description
 * # passwordConfirm
 * Directive of the webappApp
 */
angular.module('fieraApp')
    .directive('passwordConfirm', function () {
        function link (scope, element, attrs, ngModel) {
            ngModel.$validators.mismatch = function(value) {
                return value === scope.firstPassword();
            };
        }

        return {
            link: link,
            restrict: 'A',
            require: 'ngModel',
            scope: {
                firstPassword: "&passwordConfirm"
            }
        };
    });
