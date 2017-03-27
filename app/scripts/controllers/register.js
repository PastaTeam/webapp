'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the webappApp
 */
angular.module('fieraApp')
    .controller('RegisterCtrl', function ($scope, $rootScope, AuthService, $location) {

        $scope.error = null;
        $scope.loading = false;
        $scope.user = {
            name: '',
            surname: '',
            email: '',
            password: '',
            type: 'persona'
        };

        $scope.register = function () {
            $scope.loading = true;
            $scope.error = null;

            var promise = null;
            if ($scope.user.type == 'persona') {
                promise = AuthService.registerPersona($scope.user.name, $scope.user.surname, $scope.user.email, $scope.user.password);
            } else {
                promise = AuthService.registerAzienda($scope.user.name, $scope.user.email, $scope.user.password);
            }

            promise
                .then(function () {
                    $scope.loading = false;
                    $location.path('/login');
                }, function (error) {
                    $scope.error = error;
                    $scope.loading = false;
                })
        };

        $rootScope.$emit('page-title', 'Registrazione');
    });
