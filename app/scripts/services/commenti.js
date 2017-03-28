'use strict';

/**
 * @ngdoc function
 * @name fieraApp.service:
 * @description
 * #
 * Service of the fieraApp
 */
angular.module('fieraApp')
    .service('CommentiService', function (ResourcesGeneratorService, AuthService) {
        this.getCommentiProdotto = function (idProdotto) {
            return ResourcesGeneratorService.getResource(null, 'commenti/:id').query({id: idProdotto}).$promise
                .then(ResourcesGeneratorService.successHandler, ResourcesGeneratorService.failureHandler);
        };

        this.addCommento = function (commento, prodotto) {
            if (!AuthService.isLogged() || AuthService.getRole() != 'persona') {
                return $q.reject('Invalid session or role');
            }

            return ResourcesGeneratorService.getResource(AuthService.getAuthToken(), 'commenti').save({
                commento: commento,
                prodotto: prodotto
            }).$promise
                .then(ResourcesGeneratorService.successHandler, ResourcesGeneratorService.failureHandler);
        };
    });
