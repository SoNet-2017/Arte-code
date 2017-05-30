'use strict';

angular.module('myApp.users.usersFollowService', [])

    .factory('UsersFollowService', function usersFollowService($firebaseArray, $firebaseObject) {
        var ref = firebase.database().ref().child("follows");
        return {
            getFollow: function() {
                return $firebaseArray(ref);
            },

            getUserInfo: function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
                return $firebaseObject(userRef);
            },
            createFollow: function(follower, followerName, followed){
                var newFollow = {};
                newFollow['follower'] = follower;
                newFollow['followerName'] = followerName;
                newFollow['followed'] = followed;
                return newFollow;
            },
            addFollow: function(follow) {
                return $firebaseArray(ref).$add(follow);
            }
        };
    });