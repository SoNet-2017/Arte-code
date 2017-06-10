'use strict';

angular.module('myApp.evento.singleEventoService', [])

    .factory('SingleEvento', function($firebaseObject,$firebaseArray) {
        var singleEventoService = {
            getAutoreEvento: function(autoreId)    {
                var userRef = firebase.database().ref().child("users").child(autoreId);
                return $firebaseObject(userRef);
            },
            getSingleEvento: function (eventoId) {
                    var ref = firebase.database().ref().child("eventos").child(eventoId);
                    return $firebaseObject(ref);
                    },
            getPartecipant: function (eventoId) {
                var parRef = firebase.database().ref().child("eventos").child(eventoId).child("partecipanti");
                    return $firebaseArray(parRef);
            },
            getOpere: function (eventoId,PartId){
                var opRef = firebase.database().ref().child("eventos").child(eventoId).child("partecipanti").child(PartId).child("opere");
           // Non conosci PartId cioè l'id del figlio d partecipanti
                }
                };
        return singleEventoService;
    });
