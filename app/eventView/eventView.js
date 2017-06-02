'use strict';

angular.module('myApp.eventView', ['ngRoute','myApp.evento'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detailsEvento/:autoreId/:eventoId', {
            templateUrl: 'eventView/eventView.html',
            controller: 'eventView1Ctrl',
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

    .controller('eventView1Ctrl', ['$scope','$routeParams', 'SingleEvento', function($scope,$routeParams,SingleEvento) {
            $scope.dati={};
            $scope.dati.evento = SingleEvento.getSingleEvento($routeParams.eventoId);
            $scope.dati.autoreId = SingleEvento.getAutoreEvento($routeParams.autoreId);

    }]);