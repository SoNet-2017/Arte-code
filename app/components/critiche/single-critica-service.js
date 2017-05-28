'use strict';

angular.module('myApp.critica.singleCriticaService', [])

    .factory('SingleCritica', function($firebaseObject) {
        var singleCriticaService = {
            getSingleCritica: function (criticaId) {
                    var ref = firebase.database().ref().child("critiche").child(criticaId);
                    return $firebaseObject(ref);
                    }
                };
        return singleCriticaService;
    });
