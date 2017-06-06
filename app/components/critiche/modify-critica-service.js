'use strict';

angular.module('myApp.critiche.modifyCriticaService', [])

    .factory('ModifyCriticaService', function($firebaseArray,$firebaseObject) {
        var ChangeCriticaService = {
            getSingleCritica: function (criticaId) {
                var ref = firebase.database().ref().child("critics").child(criticaId);
                return $firebaseObject(ref);
            },
            updateEvento: function (criticaId,nome_critica,opera,tema,testo) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("eventos").child(criticaId);
                // create a synchronized array
                ref.update({
                    nome_critica: nome_critica ,
                    tema: tema ,
                    opera: opera ,
                    testo : testo ,
                });
            }
        };
        return ChangeCriticaService;
    });