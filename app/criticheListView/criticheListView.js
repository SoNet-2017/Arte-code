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

    .controller('criticheListView1Ctrl', ['$scope','Critica', function($scope,Critica) {
        $scope.dati={}; /**la funzione Critica è stata appena creata, potevo chiamarla anche Grimaldellobello volendo */
        $scope.dati.critiche = Critica.getData();
    }]);