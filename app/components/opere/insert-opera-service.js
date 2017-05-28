'use strict';

angular.module('myApp.evento.insertOperaService', [])

    .factory('InsertOperaService', function($firebaseArray) {
        var NewOperaService = {
            insertNewOpera: function (nome) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("works");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    nome: nome
                });
            },
            updateOpera: function (operaId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("works").child(operaId);
                // create a synchronized array
                ref.update({
                    id: operaId
                });
            }
        };
        return NewOperaService;
    });
