'use strict';

angular.module('myApp.critiche.singleCriticaService', [])

    .factory('SingleCritica', function($firebaseObject) {
        var singleCriticaService = {
            getAutoreCritica: function(autoreId)    {
                var userRef = firebase.database().ref().child("users").child(autoreId);
                return $firebaseObject(userRef);
            },
            getSingleCritica: function (criticaId) {
                    var ref = firebase.database().ref().child("critics").child(criticaId);
                    return $firebaseObject(ref);
                    }
                };
        return singleCriticaService;
    });
