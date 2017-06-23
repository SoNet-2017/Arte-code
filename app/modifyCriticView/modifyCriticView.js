'use strict';

angular.module('myApp.modifyCriticView',['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addModifyCritic/:criticaId',{
            templateUrl: 'modifyCriticView/modifyCriticView.html',
            controller: 'modifyCriticViewCtrl',
            resolve: {
                "currentAuth":["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        });

    }])
    .controller('modifyCriticViewCtrl', ['$scope', '$rootScope', '$routeParams', 'ModifyCriticaService',
        function($scope, $rootScope,$routeParams, ModifyCriticaService) {
            $scope.dati={};
            $scope.dati.critica = ModifyCriticaService.getSingleCritica($routeParams.criticaId);
            console.log($routeParams.criticaId)

            $scope.ediCritica = function() {
                ModifyCriticaService.updateCritica($routeParams.criticaId,$scope.dati.critica.nome_critica, $scope.dati.critica.tema, $scope.dati.critica.opera,$scope.dati.critica.testo);
                $scope.dati.feedback = "Inserimento effettuato con successo";
            }


        }]);