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
    .controller('addeventViewCtrl', ['$scope', '$rootScope','currentAuth', 'InsertEventoService',
        function($scope, $rootScope,currentAuth, InsertEventoService) {
            $scope.dati = {};
            $scope.dati.feedback = "";
            $rootScope.dati.currentView = "addEvento";
            $scope.dati.userId = currentAuth.uid;
            $scope.addEvento = function() {
                InsertEventoService.insertNewEvento($scope.dati.userId,$scope.dati.nome_evento, $scope.dati.tema, $scope.dati.inaugurazione,$scope.dati.mostra,$scope.dati.info).then(function(ref) {
                    var eventoId = ref.key;
                    $scope.dati.userInfo = InsertEventoService.getUserInfo($scope.dati.userId);
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