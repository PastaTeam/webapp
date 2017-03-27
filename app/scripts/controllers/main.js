'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappApp
 */
angular.module('fieraApp')
    .controller('MainCtrl', function ($scope, $rootScope, $location, AziendeService) {
        $scope.aziende = [];
        $scope.loading = true;
        $rootScope.$emit('loading-start');

        AziendeService.getListaAziende()
            .then(function (aziende) {
                $scope.aziende = aziende;
                $rootScope.$emit('loading-stop');
                $scope.loading = false;
            }, function () {
                $rootScope.$emit('loading-stop');
                $scope.loading = false;
            });

        $scope.goToAzienda = function (azienda) {
            $location.path('/aziende/' + azienda);
        };

        $rootScope.$emit('page-title', 'Dashboard');
    });
