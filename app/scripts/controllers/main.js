'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappApp
 */
angular.module('fieraApp')
    .controller('MainCtrl', function ($scope, $rootScope, AuthService) {
        if (!AuthService.isLogged()) {
            AuthService.goToLogin();
            return;
        }

        $rootScope.$emit('page-title', 'Dashboard');
    });
