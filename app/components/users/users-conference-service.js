/**
 * Created by Ale on 08/06/2017.
 */
'use strict';

angular.module('myApp.users.usersConferenceService', [])

    .factory('UsersConferenceService', function usersConferenceService($firebaseArray, $firebaseObject)
    //Users e non users perchè è meglio se il nome è differente
    {
        var ref = firebase.database().ref().child("conferences")
        return {
            getMessages: function() {
                return $firebaseArray(ref);
            },
            getEventInfo: function (eventoId) {
                var userRef = firebase.database().ref().child("eventos").child(eventoId);
                return $firebaseObject(userRef);
            },
            getUserInfo: function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
                return $firebaseObject(userRef);
            },
            createMessage: function(sender, senderName, receiver, eventoId, text){
                var newMessage = {};
                newMessage['sender'] = sender;
                newMessage['senderName'] = senderName;
                newMessage['receiver'] = receiver;
                newMessage['eventoId'] = eventoId;
                newMessage['text'] = text;
                var today = new Date();
                var day = today.getUTCDate();
                var month = today.getUTCMonth()+1; //January is 0!
                var year = today.getUTCFullYear();
                var hours = today.getUTCHours();
                var minutes = today.getUTCMinutes();
                var seconds = today.getUTCSeconds();

                if(day<10) {
                    day='0'+day;
                }

                if(month<10) {
                    month='0'+month;
                }
                if(hours<10) {
                    hours='0'+hours;
                }
                if(minutes<10) {
                    minutes='0'+minutes;
                }
                if(seconds<10) {
                    seconds='0'+seconds;
                }
                var currentDate = year.toString()+'-'+month.toString()+'-'+day.toString()+'-'+hours.toString()+':'+minutes.toString()+':'+seconds.toString();
                newMessage['utctime'] = currentDate;
                return newMessage;
            },
            addMessage: function(conference) {
                return $firebaseArray(ref).$add(conference);
            }
        };
    });