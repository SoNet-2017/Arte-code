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
            getPartecipants: function () {
                var parRef = firebase.database().ref().child("partecipanti");
                    return $firebaseArray(parRef);
            },
                };
        return singleEventoService;
    });
