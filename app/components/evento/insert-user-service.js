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
            },
            deleteUserPar: function (partecipazioneId) {
                var pRef = firebase.database().ref().child("partecipanti").child(partecipazioneId);
                pRef.remove();
            },
            insertNewOperaEvent: function (IdPartecipazione,opera) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("partecipanti").child(IdPartecipazione).child("opere");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    opera: opera,
                });
            }
        };
        return NewUserService;
    });
