'use strict';

angular.module('myApp.addOpreaView',['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addOpera',{
            templateUrl: 'addOperaView/addOperaView.html',
            controller: 'addOperaViewCtrl',
            resolve: {
                "currentAuth":["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        });

    }])
    .controller('addOperaViewCtrl', ['$scope', '$rootScope', 'InsertOperaService',
        function($scope, $rootScope, InsertOperaService) {
            $scope.dati = {};
            $scope.dati.feedback = "";
            $rootScope.dati.currentView = "addOpera";
            $scope.addOpera = function() {
                InsertOperaService.insertNewOpera($scope.dati.nome).then(function(ref) {
                    var operaId = ref.key;
                    InsertOperaService.updateOpera(operaId);
                    $scope.dati.feedback = "Inserimento effettuato con successo";
                    $scope.dati.nome = "";
                });
            };
        }]);