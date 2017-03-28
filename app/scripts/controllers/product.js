'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:RegisterCtrl
 * @description
 * # ProductCtrl
 * Controller of the webappApp
 */
angular.module('fieraApp')
    .controller('ProductCtrl', function ($scope, $rootScope, ProdottiService, AuthService, $location) {
        if (!AuthService.isLogged()) {
            $location.path('/');
            return;
        }

        $scope.error = null;
        $scope.loading = false;
        $scope.product = {
            name: '',
            description: ''
        };

        $scope.add = function () {
            $scope.loading = true;
            $scope.error = null;

            var promise = ProdottiService.addProdotto($scope.product.name, $scope.product.description);

            promise
                .then(function () {
                    $scope.loading = false;
                    $location.path('/login');
                }, function (error) {
                    $scope.error = error;
                    $scope.loading = false;
                })
        };

        $rootScope.$emit('page-title', 'Aggiungi Prodotto');
    });

