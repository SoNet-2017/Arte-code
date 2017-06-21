'use strict';

angular.module('myApp.opere.singleOperaService', [])

    .factory('SingleOpera', function($firebaseObject) {
        var singleOperaService = {
            getSingleOpera: function (operaId) {
                var ref = firebase.database().ref().child("works").child(operaId);
                return $firebaseObject(ref);
            },
            getAutoreOpera: function(autoreId)    {
                    var userRef = firebase.database().ref().child("users").child(autoreId);
                    return $firebaseObject(userRef);
            }
                };
        return singleOperaService;
    });
