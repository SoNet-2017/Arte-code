'use strict';

angular.module('myApp.evento.insertUserService', [])

    .factory('InsertUserService', function($firebaseArray) {
        var NewUserService = {
            getUserInfo: function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
            },
            getSingleEvento: function (eventoId) {
                var ref = firebase.database().ref().child("eventos").child(eventoId);
            },
            insertNewUser: function (eventoId,userPar) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("eventos").child(eventoId).child("partecipanti");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    userPar: userPar,
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
        return NewUserService;
    });
