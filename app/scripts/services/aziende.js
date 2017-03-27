'use strict';

/**
 * @ngdoc function
 * @name fieraApp.service:AziendeService
 * @description
 * # AziendeService
 * Service of the fieraApp
 */
angular.module('fieraApp')
    .service('AziendeService', function (ResourcesGeneratorService) {
        this.getListaAziende = function () {
            return ResourcesGeneratorService.getResource(null, 'aziende').query().$promise
                .then(ResourcesGeneratorService.successHandler, ResourcesGeneratorService.failureHandler);
        };
    });
