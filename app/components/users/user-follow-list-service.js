'use strict';

angular.module('myApp.users.usersFollowListService', [])

    .factory('UserListFollow', function($firebaseArray) {
        var userFollowListService = {
            getListOfFollowUsers: function () {
                //get the list of logged users
                var ref = firebase.database().ref().child("follows");
                // download the data into a local object
                return $firebaseArray(ref);
            }
        };
        return userFollowListService;
    });