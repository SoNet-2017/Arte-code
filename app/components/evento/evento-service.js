/**
 * Created by S234591 on 19/05/2017.
 */
'use strict';

angular.module('myApp.evento.eventoService', [])
    /**eventoService dovrebbe essere eventos, ricordarsene */

    .factory('Evento', function($firebaseArray) {
        var eventoService = {
            getData: function () {
                var ref = firebase.database().ref().child("eventos");
                return $firebaseArray(ref);
            },
            getAutori:function () {
                var ARef = firebase.database().ref().child("users");
                return $firebaseArray(ARef);
            },
            deleteEvento : function (eventoId) {
                var ref = firebase.database().ref().child("eventos").child(eventoId);
                ref.remove();
            }
        };
        return eventoService;
    });
