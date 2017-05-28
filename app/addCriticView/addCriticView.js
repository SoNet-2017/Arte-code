'use strict';

angular.module('myApp.addCriticView',['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addCritica',{
            templateUrl: 'addCriticView/addCriticView.html',
            controller: 'addCritictViewCtrl',
            resolve: {
                "currentAuth":["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        });

    }])
    .controller('addCritictViewCtrl', ['$scope', '$rootScope', 'InsertCriticaService',
        function($scope, $rootScope, InsertCriticaService) {
            $scope.dati = {};
            $scope.dati.feedback = "";
            $rootScope.dati.currentView = "addCritica";
            $scope.addCritica = function() {
                InsertCriticaService.insertNewCritica($scope.dati.nome, $scope.dati.tema, $scope.dati.opera,$scope.dati.testo).then(function(ref) {
                    var criticaId = ref.key;
                    InsertCriticaService.updateCritica(criticaId);
                    $scope.dati.feedback = "Inserimento effettuato con successo";
                    $scope.dati.nome = "";
                    $scope.dati.tema = "";
                    $scope.dati.opera = "";
                    $scope.dati.testo = "";
                });
            };
        }]);