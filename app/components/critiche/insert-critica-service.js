'use strict';

angular.module('myApp.critiche.insertCriticaService', [])

    .factory('InsertCriticaService', function($firebaseArray) {
        var NewCriticaService = {
            insertNewCritica: function (autoreId,nome_critica, tema, opera,testo) {
                //add the critica to list of critucs and set the logged value to true
                var ref = firebase.database().ref().child("critics");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    autoreId: autoreId,
                    nome_critica: nome_critica ,
                    tema: tema ,
                    opera: opera ,
                    testo : testo ,
                });
            },
            updateCritica: function (criticaId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("critics").child(criticaId);
                // create a synchronized array
                ref.update({
                    id: criticaId
                });
            }
        };
        return NewCriticaService;
    });
