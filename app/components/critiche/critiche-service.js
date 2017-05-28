/**
 * Created by S234591 on 19/05/2017.
 */
'use strict';

angular.module('myApp.critica.criticheService', [])

    .factory('Critica', function($firebaseArray) {
        var criticaService = {
            getData: function () {
                var ref = firebase.database().ref().child("critiche");
                return $firebaseArray(ref);
            }
        };
        return criticaService;
    });
