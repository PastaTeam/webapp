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
            type: ''
        };

        $scope.register = function () {
            $scope.loading = true;
            $scope.error = null;
            AuthService.login($scope.user.email, $scope.user.password, $scope.user.type, $scope.user.name)
                .then(function () {
                    $scope.loading = false;
                    $location.path('/');
                }, function (error) {
                    $scope.error = error;
                    $scope.loading = false;
                })
        };

        $rootScope.$emit('page-title', 'Registrazione');
    });
