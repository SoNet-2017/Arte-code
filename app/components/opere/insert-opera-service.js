'use strict';

angular.module('myApp.evento.insertOperaService', [])

    .factory('InsertOperaService', function($firebaseArray) {
        var NewOperaService = {
            insertNewOpera: function (nome_evento, tema, inaugurazione, mostra, info) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("opere");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    nome_evento: nome_evento,
                    tema: tema,
                    inaugurazione: inaugurazione,
                    mostra: mostra,
                    info: info
                });
            },
            updateOpera: function (operaId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("opere").child(eventoId);
                // create a synchronized array
                ref.update({
                    id: operaId
                });
            }
        };
        return NewOperaService;
    });
