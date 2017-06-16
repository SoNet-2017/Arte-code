'use strict';

angular.module('myApp.evento.insertUserService', [])

    .factory('InsertUserService', function($firebaseArray) {
        var NewUserService = {
            insertNewUser: function (eventoId,userParId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("partecipanti");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    userPar: userParId,
                    eventoId: eventoId,
                });
            },
            updateUserPar: function (eventoId,userPar) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("partecipanti").child(userPar);
                // create a synchronized array
                ref.update({
                    id: userPar
                });
            }
        };
        return NewUserService;
    });
