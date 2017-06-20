'use strict';

angular.module('myApp.detailCriticaView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detailCritica/:autoreId/:criticaId',{
            templateUrl: 'detailCriticaView/detailCriticaView.html',
            controller: 'detailCriticaViewCtrl',
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

    .controller('detailCriticaViewCtrl', ['$scope','$routeParams','currentAuth', 'SingleCritica', function($scope,$routeParams,currentAuth,SingleCritica) {
            $scope.dati={};
            $scope.dati.critica = SingleCritica.getSingleCritica($routeParams.criticaId);
            $scope.dati.autoreId = SingleCritica.getAutoreCritica($routeParams.autoreId);
            $scope.dati.userId = currentAuth.uid;

    }]);