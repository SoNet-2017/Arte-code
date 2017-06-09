'use strict';

angular.module('myApp.eventView', ['ngRoute','myApp.evento'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detailsEvento/:autoreId/:eventoId', {
            templateUrl: 'eventView/eventView.html',
            controller: 'eventView1Ctrl',
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

    .controller('eventView1Ctrl', ['$scope','$routeParams', 'SingleEvento','UserList', 'currentAuth', function($scope,$routeParams,SingleEvento,UserList, currentAuth) {
            $scope.dati={};
            $scope.dati.evento = SingleEvento.getSingleEvento($routeParams.eventoId);
            $scope.dati.autoreId = SingleEvento.getAutoreEvento($routeParams.autoreId);
            $scope.dati.evento.partecipanti = SingleEvento.getPartecipant($routeParams.eventoId); //partecipanti all'evento
        $scope.dati.availableUsers = UserList.getListOfUsers(); //lista di tutti gli utenti
        $scope.dati.userId = currentAuth.uid; //


        $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyB2RySAMBGiwVPZ6RmD1KI9dO5Iw2rDwCA";
        $scope.dati.vm = this;
        $scope.dati.vm.positions = [];
        $scope.dati.evento.$loaded().then(function () {
            var ubicazione = $scope.dati.evento.ubicazione;
            $scope.dati.vm.positions.push({ubicazione: ubicazione});
            console.log("vm.positions", $scope.dati.vm.positions);
        });


    }]);