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
            getAutore:function (auotreId) {
                var ARef = firebase.database().ref().child("users").child(auotreId);
                return $firebaseArray(ARef);
            },
            getAutori: function(){
                var Ref=firebase.database().ref().child("users");
                return $firebaseArray(Ref);
            }
        };
        return opereService;
    });
