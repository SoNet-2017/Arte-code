/**
 * Created by Ale on 08/06/2017.
 */
'use strict';

angular.module('myApp.conferenceView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/conference/:recipientUserId', {
            templateUrl: 'conferenceView/conferenceView.html',
            controller: 'conferenceViewCtrl',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]

            }
        })
    }])
    .controller('conferenceViewCtrl', ['$scope', '$routeParams', 'currentAuth', 'UsersConferenceService',
        function($scope, $routeParams, currentAuth, usersConferenceService) {
            $scope.dati = {};
            $scope.userId = currentAuth.uid;
            $scope.dati.recipientUserId = $routeParams.recipientUserId;

            $scope.orderProp = 'utctime';
            $scope.dati.userInfo = UsersConferenceService.getUserInfo($scope.dati.userId);

            //get messages from firebase
            $scope.dati.messages = UsersConferenceService.getMessages();
            //function that add a message on firebase
            $scope.addMessage = function(e) {
                if (e.keyCode != 13) return;
                //create the JSON structure that should be sent to Firebase
                var newMessage = UsersConferenceService.createMessage($scope.dati.userId, $scope.dati.userInfo.email, $routeParams.recipientUserId, $scope.dati.msg);
                UsersConferenceService.addMessage(newMessage);
                $scope.dati.msg = "";
        }}]);