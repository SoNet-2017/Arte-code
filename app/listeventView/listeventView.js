'use strict';

angular.module('myApp.listeventView', ['ngRoute','myApp.evento'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/listeventView', {
            templateUrl: 'listeventView/listeventView.html',
            controller: 'View1Ctrl',
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

    .controller('View1Ctrl', ['$scope','Evento', 'currentAuth','ModifyEventoService',function($scope,Evento, currentAuth,ModifyEventoService) {
        $scope.dati={};
        $scope.dati.eventos = Evento.getData();
        $scope.dati.userId = currentAuth.uid;
        $scope.removeEvento = function(EventoId){
            ModifyEventoService.deleteEvento(EventoId);
            $scope.dati.feedback = "Rimozione effettuata con successo";

        };
    }]);