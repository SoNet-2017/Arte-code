/**
 * Created by Ale on 08/06/2017.
 */
'use strict';

angular.module('myApp.conferenceView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/conference/:eventoId/:partecipanteId', {
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
    .controller('conferenceViewCtrl', ['$scope','$rootScope','$routeParams', 'currentAuth', 'UsersConferenceService', 'SingleEvento',
        function($scope,$rootScope, $routeParams, currentAuth, UsersConferenceService, SingleEvento) {
            $scope.dati = {};
            $rootScope.dati.currentView = "conference";
            $scope.userId = currentAuth.uid;
            $scope.dati.evento = SingleEvento.getSingleEvento($routeParams.eventoId);
            $scope.dati.partecipante=SingleEvento.getAutoreEvento($routeParams.partecipanteId);
            $scope.orderProp = 'utctime';
            $scope.dati.userInfo = UsersConferenceService.getUserInfo($scope.userId);

            //get messages from firebase
            $scope.dati.messages = UsersConferenceService.getMessages();
            //function that add a message on firebase
            $scope.addMessage = function(e) {
                if (e.keyCode != 13) return;
                //create the JSON structure that should be sent to Firebase
                var newMessage = UsersConferenceService.createMessage($scope.userId,
                    $scope.dati.userInfo.email,
                    $scope.dati.partecipante.userId,
                    $scope.dati.evento.id,
                    $scope.dati.msg
                )
                UsersConferenceService.addMessage(newMessage);
                $scope.dati.msg = "";

            }
    }
    ]);