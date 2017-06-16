'use strict';

angular.module('myApp.evento.insertOperaEventService', [])

    .factory('InsertOperaEventService', function($firebaseArray,$firebaseObject) {
        var NewOperaEventService = {
            getUserInfo: function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
                return $firebaseObject(userRef);

            },
            getUserPar: function (eventoId,userPar) {
                var userPar =firebase.database().ref().child("eventos").child(eventoId).child("partecipanti").child(userPar);
                return $firebaseObject(userPar);
            },
            getSingleEvento: function (eventoId) {
                var ref = firebase.database().ref().child("eventos").child(eventoId);
                return $firebaseObject(ref);

            },
            insertNewOperaEvent: function (IdPartecipazione,opera) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("partecipanti").child(IdPartecipazione).child("opere");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    opera: opera,
                });
            },
        };
        return NewOperaEventService;
    });
