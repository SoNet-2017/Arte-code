/**
 * Created by S234591 on 19/05/2017.
 */
'use strict';

angular.module('myApp.opere.opereService', [])

    .factory('Opera', function($firebaseArray) {
        var opereService = {
            getData: function () {
                var ref = firebase.database().ref().child("works");
                return $firebaseArray(ref);
            },
        };
        return opereService;
    });
