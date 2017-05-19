/**
 * Created by S234591 on 19/05/2017.
 */
'use strict';

angular.module('myApp.evento.eventoService', [])

    .factory('Evento', function($http) {
        var eventoService = {
            getData: function () {
                return $http.get('../data/evento.json').then(function (response) {
                    return response.data;
                });
            }
        };
        return eventoService;
    });
