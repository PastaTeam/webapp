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
        var loginResponse = {};

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

        this.login = function (email, password) {
            return ResourcesGeneratorService.getResource(null, 'login').save({
                email: email,
                password: password
            }).$promise
                .then(function (response) {
                    if (response.error)
                        return $q.reject(response.error);

                    $window.localStorage.setItem('authToken', response.token);
                    authToken = response.token;
                    userId = response.id;
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

        this.signup = function (fname, lname, email, paypal, password, passwordConfirm) {
            return ResourcesGeneratorService.getResource(null, 'signup').save({
                first_name: fname,
                last_name: lname,
                email: email,
                paypal: paypal,
                password: password,
                passwordConfirm: passwordConfirm
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
                    isLogged = false;
                    loginResponse = null;

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
