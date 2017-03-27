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
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/aziende/:id_azienda/:id_prodotto?', {
                templateUrl: 'views/aziende.html',
                controller: 'AziendeCtrl'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl'
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
