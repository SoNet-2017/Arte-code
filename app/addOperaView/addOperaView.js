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
    .controller('addOperaViewCtrl', ['$scope', '$rootScope', 'currentAuth', 'InsertOperaService',
        function($scope, $rootScope,currentAuth, InsertOperaService) {
            $scope.dati = {};
            $scope.dati.feedback = "";
            $rootScope.dati.currentView = "addOpera";

            $scope.dati.userId = currentAuth.uid;





            $scope.addOpera = function() {
                InsertOperaService.insertNewOpera($scope.dati.userId,$scope.dati.nome).then(function(ref) {
                    var operaId = ref.key;
                    $scope.dati.userInfo = InsertOperaService.getUserInfo($scope.dati.userId);
                    InsertOperaService.updateOpera(operaId);
                    $scope.dati.feedback = "Inserimento effettuato con successo";
                    $scope.dati.nome = "";
                });
            };
        }]);