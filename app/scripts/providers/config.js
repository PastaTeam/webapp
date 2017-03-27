'use strict';

/**
 * @ngdoc function
 * @name fieraApp.provider:Config
 * @description
 * # Config
 * Provider of the fieraApp
 */
angular.module('fieraApp')
    .provider('Config', function () {
        this.serverVersion = null;
        this.serverHost = null;
        this.authTokenName = null;

        var mockRequests = true;

        this.clientVersion = '{{VERSION}}';

        var exceptionStringValue = "Uninitialized config server values";

        this.$get = function () {
            var obj = this;
            return {
                getServerPath: function () {
                    if (!obj.serverHost || !obj.serverVersion)
                        throw exceptionStringValue;

                    return obj.serverHost + '/' + obj.serverVersion + '/';
                },

                getAuthTokenName: function () {
                    if (!obj.authTokenName)
                        throw exceptionStringValue;

                    return obj.authTokenName;
                },

                getVersion: function () {
                    return obj.clientVersion;
                },

                mockResources: function () {
                    return mockRequests;
                }
            }
        }
    });
