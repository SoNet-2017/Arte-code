'use strict';

angular.module('myApp.addeventView',['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addEvento',{
            templateUrl: 'addeventView/addeventView.html',
            controller: 'addeventViewCtrl',
            resolve: {
                "currentAuth":["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        });

    }])
    .controller('addeventViewCtrl', ['$scope', '$rootScope', 'InsertEventoService',
        function($scope, $rootScope, InsertEventoService) {
            $scope.dati = {};
            $scope.dati.feedback = "";
            $rootScope.dati.currentView = "addEvento";
            $scope.addEvento = function() {
                InsertEventoService.insertNewEvento($scope.dati.nome_evento, $scope.dati.tema, $scope.dati.inaugurazione,$scope.dati.mostra,$scope.dati.info).then(function(ref) {
                    var eventoId = ref.key;
                    InsertEventoService.updateEvento(eventoId);
                    $scope.dati.feedback = "Inserimento effettuato con successo";
                    $scope.dati.nome_evento = "";
                    $scope.dati.tema = "";
                    $scope.dati.inaugurazione = "";
                    $scope.dati.mostra = "";
                    $scope.dati.info = "";
                });
            };
        }]);