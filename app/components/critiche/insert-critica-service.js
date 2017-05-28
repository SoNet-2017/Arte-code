'use strict';

angular.module('myApp.critica.insertCriticaService', [])

    .factory('InsertCriticaService', function($firebaseArray) {
        var NewCriticaService = {
            insertNewCritica: function (nome_critica, tema, opera) {
                //add the critica to list of critucs and set the logged value to true
                var ref = firebase.database().ref().child("critiche");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    nome_critica: nome_critica,
                    tema: tema,
                    opera: opera,
                });
            },
            updateCritica: function (criticaId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("critiche").child(criticaId);
                // create a synchronized array
                ref.update({
                    id: criticaId
                });
            }
        };
        return NewCriticaService;
    });
