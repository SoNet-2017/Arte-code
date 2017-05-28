'use strict';

angular.module('myApp.critiche.singleCriticaService', [])

    .factory('SingleCritica', function($firebaseObject) {
        var singleCriticaService = {
            getSingleCritica: function (criticaId) {
                    var ref = firebase.database().ref().child("critics").child(criticaId);
                    return $firebaseObject(ref);
                    }
                };
        return singleCriticaService;
    });
