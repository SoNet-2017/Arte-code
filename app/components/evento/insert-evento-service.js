'use strict';

angular.module('myApp.evento.insertEventoService', [])

    .factory('InsertEventoService', function($firebaseArray) {
        var NewEventoService = {
            getUserInfo: function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
            },
            insertNewEvento: function (autoreId,nome_evento, tema, inaugurazione, mostra, info) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("eventos");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    autoreId: autoreId,
                    nome_evento: nome_evento,
                    tema: tema,
                    inaugurazione: inaugurazione,
                    mostra: mostra,
                    info: info
                });
            },
            updateEvento: function (eventoId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("eventos").child(eventoId);
                // create a synchronized array
                ref.update({
                    id: eventoId
                });
            }
        };
        return NewEventoService;
    });
