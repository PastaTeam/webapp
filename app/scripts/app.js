'use strict';

/**
 * @ngdoc overview
 * @name fieraApp
 * @description
 * # webappApp
 *
 * Main module of the application.
 */
angular
    .module('fieraApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngMaterial',
        'angularMoment'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('admin')
            .primaryPalette('indigo')
            .accentPalette('pink')
            .warnPalette('red');

        $mdThemingProvider.setDefaultTheme('admin');
        $mdThemingProvider.alwaysWatchTheme(true);
    })
    .config(function (ConfigProvider) {
        ConfigProvider.serverVersion = 'v1';
        ConfigProvider.serverHost = 'http://localhost:8001/';
        ConfigProvider.authTokenName = 'x-authorization-token';
    });
