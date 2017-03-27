'use strict';

/**
 * @ngdoc function
 * @name fieraApp.service:AuthService
 * @description
 * # AuthService
 * Service of the fieraApp
 */
angular.module('fieraApp')
    .service('AuthService', function (ResourcesGeneratorService, $q, $window, $location) {
        var authToken = $window.localStorage.getItem('authToken');
        var userId = null;
        var isLogged = false;
        var loginResponse = {
            account: {
                email: 'Guest User',
                role: 'guest'
            }
        };
        var role = 'guest';

        this.getLoginResponse = function () {
            return loginResponse;
        };

        this.isLogged = function () {
            return isLogged;
        };

        this.getAuthToken = function () {
            return authToken;
        };

        this.hasAuthToken = function () {
            return authToken != undefined && authToken != null;
        };

        this.getUserId = function () {
            return userId;
        };

        this.getRole = function () {
            return role;
        };

        this.login = function (email, password, type) {
            return ResourcesGeneratorService.getResource(null, 'login').save({
                email: email,
                password: password,
                type: type
            }).$promise
                .then(function (response) {
                    if (response.error)
                        return $q.reject(response.error);

                    $window.localStorage.setItem('authToken', response.token);
                    authToken = response.token;
                    userId = response.id;
                    role = response.account.role;
                    isLogged = true;
                    loginResponse = response;

                    return response;
                }, function (error) {
                    $window.localStorage.removeItem('authToken');
                    authToken = null;
                    isLogged = false;

                    return $q.reject(error.data);
                });
        };

        this.registerPersona = function (nome, cognome, email, password) {
            return ResourcesGeneratorService.getResource(null, 'register/persona').save({
                nome: nome,
                cognome: cognome,
                email: email,
                password: password
            }).$promise
                .then(function (response) {
                    if (response.error)
                        return $q.reject(response.error);

                    return response;
                }, function (error) {
                    return $q.reject(error.data);
                });
        };

        this.registerAzienda = function (nome, email, password) {
            return ResourcesGeneratorService.getResource(null, 'register/azienda').save({
                nome: nome,
                email: email,
                password: password
            }).$promise
                .then(function (response) {
                    if (response.error)
                        return $q.reject(response.error);

                    return response;
                }, function (error) {
                    return $q.reject(error.data);
                });
        };

        this.logout = function () {
            if (!authToken || !isLogged)
                return $q.reject('null authToken');

            return ResourcesGeneratorService.getResource(authToken, 'logout').get().$promise
                .then(function (response) {
                    $window.localStorage.removeItem('authToken');
                    authToken = null;
                    role = 'guest';
                    isLogged = false;
                    loginResponse = {
                        account: {
                            email: 'Guest User',
                            role: 'guest'
                        }
                    };

                    return response;
                }, function (error) {
                    return $q.reject(error.data);
                });
        };

        this.getSessionInfo = function () {
            if (!authToken)
                return $q.reject('null authToken');

            return ResourcesGeneratorService.getResource(authToken, 'info').get().$promise
                .then(function (response) {
                    if (response.error)
                        return $q.reject(response.error);

                    isLogged = true;
                    loginResponse = response;
                    role = response.account.role;
                    userId = response.id;

                    return response;
                }, function (error) {
                    isLogged = false;

                    return $q.reject(error.data);
                });
        };

        this.goToLogin = function () {
            $location.path('/login');
        };
    });
