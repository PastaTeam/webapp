'use strict';

/**
 * @ngdoc function
 * @name fieraApp.service:ProdottiService
 * @description
 * # ProdottiService
 * Service of the fieraApp
 */
angular.module('fieraApp')
    .service('ProdottiService', function (ResourcesGeneratorService, AuthService, $q) {
        this.addProdotto = function (nome, descrizione) {
            if (!AuthService.isLogged() || AuthService.getRole() != 'azienda') {
                return $q.reject('Invalid session or role');
            }

            return ResourcesGeneratorService.getResource(AuthService.getAuthToken(), 'prodotti').save({
                nome: nome,
                descrizione: descrizione
            }).$promise
                .then(ResourcesGeneratorService.successHandler, ResourcesGeneratorService.failureHandler);
        };

        this.getListaProdotti = function (id_azienda) {
            return ResourcesGeneratorService.getResource(null, 'prodotti').query({azienda: id_azienda}).$promise
                .then(ResourcesGeneratorService.successHandler, ResourcesGeneratorService.failureHandler);
        };

        this.getProdotto = function (id_prodotto) {
            return ResourcesGeneratorService.getResource(null, 'prodotti/:id').get({id: id_prodotto}).$promise
                .then(ResourcesGeneratorService.successHandler, ResourcesGeneratorService.failureHandler);
        };
    });

