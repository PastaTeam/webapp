'use strict';

/**
 * @ngdoc function
 * @name webappApp.directive:ngBlockies
 * @description
 * # ngBlockies
 * Directive of the webappApp
 */
angular.module('fieraApp')
    .directive('ngBlockies', function ($mdColors) {
        function link(scope, element) {
            function update(seed) {
                if (seed == undefined || seed == '') {
                    element.addClass('account-circle');
                    element.css({
                        'background-image': ''
                    });
                } else {
                    var blockiesUrl = blockies.create({
                        seed: seed,
                        color: $mdColors.getThemeColor('primary'),
                        bgcolor: $mdColors.getThemeColor('accent'),
                        spotcolor: 'white',
                        size: 12,
                        scale: 12
                    }).toDataURL();

                    element.removeClass('account-circle');
                    element.css({
                        'background-image': 'url(' + blockiesUrl + ')'
                    });
                }
            }

            scope.$watch(function () {
                    return scope.seed();
                },
                function () {
                    update(scope.seed());
                });
        }

        return {
            link: link,
            restrict: 'A',
            scope: {
                seed: "&ngBlockies"
            }
        };
    });
