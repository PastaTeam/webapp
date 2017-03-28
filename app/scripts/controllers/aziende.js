'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:AziendeCtrl
 * @description
 * # AziendeCtrl
 * Controller of the webappApp
 */
angular.module('fieraApp')
    .controller('AziendeCtrl', function ($scope, $rootScope, $location, ProdottiService, $routeParams, AuthService, CommentiService, $mdDialog) {
        $scope.prodotti = [];
        $scope.loading = true;
        $rootScope.$emit('loading-start');

        $scope.isLogged = AuthService.isLogged() && AuthService.getRole() == 'persona';

        console.log(AuthService.getRole());

        if ($routeParams.id_prodotto) {
            $scope.id_prodotto = $routeParams.id_prodotto;
            $rootScope.$emit('page-title', 'Prodotto');

            $scope.commenti = [];
            $scope.prodotto = {};

            ProdottiService.getProdotto($routeParams.id_prodotto)
                .then(function (prodotto) {
                    $scope.prodotto = prodotto;
                    $rootScope.$emit('loading-stop');
                    $scope.loading = false;
                }, function () {
                    $rootScope.$emit('loading-stop');
                    $scope.loading = false;
                });

            CommentiService.getCommentiProdotto($routeParams.id_prodotto)
                .then(function (commenti) {
                    $scope.commenti = commenti;
                });

            $scope.openComment = function (ev) {
                var confirm = $mdDialog.prompt()
                    .title('Commenta')
                    .textContent('Aggiungi un commento a questo prodotto')
                    .placeholder('Commento')
                    .targetEvent(ev)
                    .ok('Salva')
                    .cancel('Annulla');

                $mdDialog.show(confirm).then(function (result) {
                    $scope.commenti.unshift({
                        persona: {
                            nome: AuthService.getLoginResponse().account.first_name,
                            cognome: AuthService.getLoginResponse().account.last_name
                        },
                        commento: result
                    });

                    return CommentiService.addCommento(result, $routeParams.id_prodotto);
                });
            };

        } else {
            ProdottiService.getListaProdotti($routeParams.id_azienda)
                .then(function (prodotti) {
                    $scope.prodotti = prodotti;
                    $rootScope.$emit('loading-stop');
                    $scope.loading = false;
                }, function () {
                    $rootScope.$emit('loading-stop');
                    $scope.loading = false;
                });

            $scope.goToProdotto = function (prodotto) {
                $location.path('/aziende/' + $routeParams.id_azienda + '/' + prodotto);
            };

            $rootScope.$emit('page-title', 'Lista Prodotti');
        }
    });
