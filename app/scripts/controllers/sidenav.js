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
                title: 'Dashboard',
                icon: 'home',
                link: '/'
            },
            {
                title: 'Balance',
                icon: 'monetization_on',
                link: '/balance'
            },
            {
                title: 'About',
                icon: 'info',
                callback: function (entry, event) {
                    openAboutDialog(event)
                }
            }
        ];

        $scope.logout = function (entry, event) {
            AuthService.logout()
                .then(function () {
                    $location.path('/login');
                });
        };

        $scope.handleClick = function (entry, event) {
            if (entry.link)
                $scope.goTo(entry.link);
            else if (typeof entry.callback === 'function')
                entry.callback(entry, event);

            $mdSidenav('left').close();
        };

        function openAboutDialog(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $rootScope.customFullscreen;

            console.log($rootScope.theme);
            $mdDialog.show({
                controller: 'DialogCtrl',
                templateUrl: 'views/about.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    items: {
                        clientVersion: Config.getVersion(),
                        rootScope: $rootScope
                    }
                }
            });

            $rootScope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                $rootScope.customFullscreen = (wantsFullScreen === true);
            });
        }

        $scope.goTo = function (path) {
            $location.path(path);
        };
    });
