/**
 * Created by S234591 on 19/05/2017.
 */
'use strict';

angular.module('myApp.opere.opereService', [])

    .factory('Opera', function($firebaseArray,$firebaseObject) {
        var opereService = {
            getData: function () {
                var ref = firebase.database().ref().child("works");
                return $firebaseArray(ref);
            },
            getAutori:function () {
                var ARef = firebase.database().ref().child("users");
                return $firebaseArray(ARef);
            },
            deleteOpera : function (operaId) {
                var ref = firebase.database().ref().child("works").child(operaId);
                ref.remove();
            }
        };
        return opereService;
    });
