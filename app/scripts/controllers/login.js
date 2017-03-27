'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webappApp
 */
angular.module('fieraApp')
    .controller('LoginCtrl', function ($scope, $rootScope, AuthService, $location) {
        if (AuthService.isLogged()) {
            $location.path('/');
            return;
        }

        $scope.error = null;
        $scope.loading = false;
        $scope.user = {
            email: '',
            password: '',
            type: 'persona'
        };

        $scope.login = function () {
            $scope.loading = true;
            $scope.error = null;
            AuthService.login($scope.user.email, $scope.user.password, $scope.user.type)
                .then(function () {
                    $scope.loading = false;
                    $location.path('/');
                }, function (error) {
                    $scope.error = error;
                    $scope.loading = false;
                })
        };

        $rootScope.$emit('page-title', 'Login');
    });
