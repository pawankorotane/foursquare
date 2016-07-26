"use strict";

(function () {

    var app = angular.module('Foursquare', ['ui.bootstrap']).config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('LoadingInterceptor');
        }]);
    


    app.controller('AppCtrl', function ($scope, geoLocation, $http, PlacesFactory) {
        $scope.filter = {};
        geoLocation.getCurrentPosition().then(function (data) {
            $scope.location = data.coords;
            PlacesFactory.getPlaces({latitude: $scope.location.latitude.toFixed(2), longitude: $scope.location.longitude.toFixed(2)}).then(function (data) {
                $scope.places = data.data;
            });
        }, function (err) {
            alert(err);
        });

        $scope.fetchPlaces = function () {
            var filter = {
                latitude: $scope.location.latitude.toFixed(2),
                longitude: $scope.location.longitude.toFixed(2),
                query: $scope.query.name
            };
            PlacesFactory.getPlaces(filter).then(function (data) {
                $scope.places = data.data;
            });
        };


    }).factory('geoLocation', function ($q, $window) {
        function getCurrentPosition() {
            var deferred = $q.defer();

            if (!$window.navigator.geolocation) {
                deferred.reject('Geolocation not supported.');
            } else {
                $window.navigator.geolocation.getCurrentPosition(
                        function (position) {
                            deferred.resolve(position);
                        },
                        function (err) {
                            deferred.reject(err);
                        });
            }

            return deferred.promise;
        }

        return {
            getCurrentPosition: getCurrentPosition
        };
    }).factory('PlacesFactory', function ($http) {
        return {
            getPlaces: function (filter) {
                if (typeof filter !== 'undefined') {
                    return $http.get('/api', {params: filter});
                } else {
                    return $http.get('/api');
                }
            }
        };
    }).service('LoadingInterceptor',
            ['$q', '$rootScope', '$log',
                function ($q, $rootScope, $log) {
                    'use strict';

                    return {
                        request: function (config) {
                            $rootScope.loading = true;
                            return config;
                        },
                        requestError: function (rejection) {
                            $rootScope.loading = false;
                            $log.error('Request error:', rejection);
                            return $q.reject(rejection);
                        },
                        response: function (response) {
                            $rootScope.loading = false;
                            return response;
                        },
                        responseError: function (rejection) {
                            $rootScope.loading = false;
                            $log.error('Response error:', rejection);
                            return $q.reject(rejection);
                        }
                    };
                }]);




})();