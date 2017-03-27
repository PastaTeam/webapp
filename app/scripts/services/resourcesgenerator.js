'use strict';

/**
 * @ngdoc function
 * @name fieraApp.service:ResourcesGeneratorService
 * @description
 * # ResourcesGeneratorService
 * Service of the fieraApp
 */
angular.module('fieraApp')
    .service('ResourcesGeneratorService', function (Config, $resource, $q, $mdDialog, $rootScope) {
        var errors = {
            data: {},
            code: {
                409: 'Conflitto nella creazione della risorsa',
                404: 'Risorsa non trovata',
                403: 'Accesso negato',
                401: 'Permessi insufficienti per accedere alla risorsa',
                400: 'Parametri mancanti'
            }
        };

        this.getResource = function (authToken, path) {
            var headersObj = {};
            if (authToken != null)
                headersObj[Config.getAuthTokenName()] = authToken;

            if (Config.mockResources()) {
                return $resource('/mock/' + path + '-:mockMethod.json', {}, {
                    'get': {method: 'GET', headers: headersObj, params: {mockMethod: 'GET'}},
                    'save': {method: 'GET', headers: headersObj, params: {mockMethod: 'POST'}},
                    'post': {method: 'GET', headers: headersObj, params: {mockMethod: 'POST'}},
                    'put': {method: 'GET', headers: headersObj, params: {mockMethod: 'PUT'}},
                    'query': {method: 'GET', isArray: true, headers: headersObj, params: {mockMethod: 'GET'}},
                    'remove': {method: 'GET', headers: headersObj, params: {mockMethod: 'DELETE'}},
                    'delete': {method: 'GET', headers: headersObj, params: {mockMethod: 'DELETE'}}
                });
            }

            return $resource(Config.getServerPath() + path, {}, {
                'get': {method: 'GET', headers: headersObj},
                'save': {method: 'POST', headers: headersObj},
                'post': {method: 'POST', headers: headersObj},
                'put': {
                    method: 'PUT', headers: headersObj, params: {
                        /* paramName: '@paramName' */
                    }
                },
                'query': {method: 'GET', isArray: true, headers: headersObj},
                'remove': {method: 'DELETE', headers: headersObj},
                'delete': {method: 'DELETE', headers: headersObj}
            });
        };

        this.successHandler = function (response) {
            return response;
        };

        this.failureHandler = function (error) {
            $rootScope.$emit('loading-stop');

            var errorString = null;
            if (error && error.data && error.data.error != undefined)
                errorString = errors.data[error.data.error];

            if (!errorString)
                errorString = errors.code[error.status];

            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('An error occurred')
                    .textContent(errorString)
                    .ariaLabel('Error message')
                    .ok('Close')
                    .targetEvent($rootScope.getClickEvent())
                    .theme($rootScope.theme)
            );

            return $q.reject(errorString || error);
        }
    });
