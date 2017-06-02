'use strict';

angular.module('myApp.evento.singleEventoService', [])

    .factory('SingleEvento', function($firebaseObject) {
        var singleEventoService = {
            getAutoreEvento: function(autoreId)    {
                var userRef = firebase.database().ref().child("users").child(autoreId);
                return $firebaseObject(userRef);
            },
            getSingleEvento: function (eventoId) {
                    var ref = firebase.database().ref().child("eventos").child(eventoId);
                    return $firebaseObject(ref);
                    }
                };
        return singleEventoService;
    });
