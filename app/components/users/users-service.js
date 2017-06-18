'use strict';

angular.module('myApp.users.usersService', [])

    .factory('Users', function($firebaseArray) {
        return {
            registerLogin: function (userId, email) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("users").child(userId);
                // create a synchronized array
                ref.update({
                    email: email,
                    logged: true
                });
            },
            registerLogout: function (userId)
            {
                var ref = firebase.database().ref().child("users").child(userId);
                // create a synchronized array
                ref.update({
                    logged: false
                });
            },
            registerNewUserInfo: function (userId, name, surname, email,uType) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("users").child(userId);
                // create a synchronized array
                ref.set({
                    userId:userId,
                    name: name,
                    surname: surname,
                    email: email,
                    uType: uType,
                });
            },
                updateImage: function (userId,imgPath) {
                    var iRef = firebase.database().ref().child("users").child(userId)
                    iRef.update({
                        img_url: imgPath,
                        img_alt: userId,
                    });
                }
        };
    });