'use strict';

angular.module('myApp.criticheListView', ['ngRoute','myApp.critiche'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/listeCritiche',{
            templateUrl: 'criticheListView/criticheListView.html',
            controller: 'criticheListView1Ctrl',
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

    .controller('criticheListView1Ctrl', ['$scope','$rootScope','Critica','currentAuth','ModifyCriticaService',
        function($scope,$rootScope,Critica,currentAuth,ModifyCriticaService) {
        $scope.dati={}; /**la funzione Critica è stata appena creata, potevo chiamarla anche Grimaldellobello volendo */
            $rootScope.dati.currentView = "listeCritiche";
            $scope.dati.critiche = Critica.getData();
        $scope.dati.userId = currentAuth.uid;
        $scope.removeCritica = function(criticaId){
            ModifyCriticaService.deleteCritica(criticaId);
            $scope.dati.feedback = "Rimozione effettuata con successo";
        };
            $scope.myInterval = 3000;
            $scope.Autore = function (autoreId) {
                if (autoreId = $scope.dati.userId){
                    return autoreId;
                };
            };
        $scope.users = Critica.getAutori();
        $scope.orderProp = "autoreId";
        $scope.criticaSearch={};

    }]);