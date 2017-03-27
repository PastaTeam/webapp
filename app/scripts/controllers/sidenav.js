'use strict';

/**
 * @ngdoc function
 * @name fieraApp.controller:SidenavCtrl
 * @description
 * # SidenavCtrl
 * Controller of the fieraApp
 */
angular.module('fieraApp')
    .controller('SidenavCtrl', function ($scope, $mdMedia, $mdDialog, $mdSidenav, $mdTheming, $mdMenu, $location, Config, $rootScope, AuthService) {
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        $scope.authService = AuthService;

        $scope.account = {};

        $scope.$watch(AuthService.getLoginResponse, function (newValue) {
            if (newValue) $scope.account = newValue.account;
            else $scope.account = {};
        });

        $scope.closed = false;
        $rootScope.$on('sidenav-close', function () {
            $scope.closed = true;
        });

        $rootScope.$on('sidenav-toggle', function () {
            $scope.closed = !$scope.closed;
        });

        $rootScope.$on('sidenav-open', function () {
            $scope.closed = false;
        });

        $scope.openAccountMenu = function($mdMenu, ev) {
            $mdMenu.open(ev);
        };

        $scope.menuEntries = [
            {
                title: 'Lista Aziende',
                icon: 'library_books',
                link: '/'
            },
            {
                title: 'Aggiungi Azienda',
                icon: 'library_add',
                link: '/aziende/new'
            },
            {
                title: 'Registrati',
                icon: 'assignment',
                link: '/register'
            },
            {
                title: 'Accedi',
                icon: 'fingerprint',
                link: '/login'
            }
        ];

        $scope.logout = function (entry, event) {
            AuthService.logout()
                .then(function () {
                    $location.path('/login');
                });
            $mdSidenav('left').close();
        };

        $scope.handleClick = function (entry, event) {
            if (entry.link)
                $scope.goTo(entry.link);
            else if (typeof entry.callback === 'function')
                entry.callback(entry, event);

            $mdSidenav('left').close();
        };

        $scope.goTo = function (path) {
            $location.path(path);
        };
    });
