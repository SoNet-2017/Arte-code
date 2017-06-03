'use strict';

angular.module('myApp.opere.insertOperaService', [])

    .factory('InsertOperaService', function($firebaseArray) {
        var NewOperaService = {
            getUserInfo: function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
            },
            insertNewOpera: function (autoreId, titolo,ubicazione, infoTecniche,imgPath) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("works");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    autoreId: autoreId,
                    titolo: titolo ,
                    ubicazione: ubicazione,
                    infoTecniche: infoTecniche,
                    img_url: imgPath,
                    img_alt: autoreId+" "+titolo

                });
            },
            updateOpera: function (operaId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("works").child(operaId);
                // create a synchronized array
                ref.update({
                    id: operaId
                });
            }
        };
        return NewOperaService;
    });
