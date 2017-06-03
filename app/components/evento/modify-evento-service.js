'use strict';

angular.module('myApp.evento.modifyEventoService', [])

    .factory('ModifyEventoService', function($firebaseArray,$firebaseObject) {
        var ChangeEventoService = {
            getSingleEvento: function (eventoId) {
                var ref = firebase.database().ref().child("eventos").child(eventoId);
                return $firebaseObject(ref);
            },
            modifyEvento: function(eventoId,nome_evento,tema,inaugurazione,mostra,info){
                var ModRef = firebase.database().ref().child("eventos").child(eventoId);
                ModRef.set({
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
        return ChangeEventoService;
    });