'use strict';

angular.module('myApp.usersConferenceListView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/ConferenceList/:eventoId', {
            templateUrl: 'usersConferenceListView/usersConferenceListView.html',
            controller: 'usersConferenceListViewCtrl',
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
    .controller('usersConferenceListViewCtrl', ['$scope', '$routeParams', 'SingleEvento', 'UserList', 'currentAuth',
        function($scope, $routeParams, SingleEvento, UserList, currentAuth) {
            $scope.dati = {};
            $scope.dati.evento = SingleEvento.getSingleEvento($routeParams.eventoId);
            $scope.dati.partecipanti = SingleEvento.getPartecipants(); //partecipanti all'evento
            $scope.dati.availableUsers = UserList.getListOfUsers();
            $scope.dati.userId = currentAuth.uid;
        }]);