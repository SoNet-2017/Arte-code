/**
 * Created by S234591 on 19/05/2017.
 */
'use strict';

angular.module('myApp.critiche.criticheService', [])

    .factory('Critica', function($firebaseArray) {
        var criticheService = {
            getData: function () {
                var ref = firebase.database().ref().child("critics");
                return $firebaseArray(ref);
            },
            getAutori:function () {
                var ARef = firebase.database().ref().child("users");
                return $firebaseArray(ARef);
            }
        };
        return criticheService;
    });
