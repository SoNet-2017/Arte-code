/**
 * Created by S234591 on 19/05/2017.
 */
'use strict';

angular.module('myApp.evento.eventoService', [])

    .factory('Evento', function($firebaseArray) {
        var eventoService = {
            getData: function () {
                var ref = $firebase.database().ref().child("eventos");

                return $firebaseArray(ref);
            }
        };
        return eventoService;
    });
