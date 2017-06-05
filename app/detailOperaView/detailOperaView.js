'use strict';

angular.module('myApp.detailOperaView', ['ngRoute','myApp.opere'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detailOpera/:autoreId/:operaId',{
            templateUrl: 'detailOperaView/detailOperaView.html',
            controller: 'detailOperaViewCtrl',
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

    .controller('detailOperaViewCtrl', ['$scope','$rootScope','$routeParams','currentAuth', 'SingleOpera', function($scope,$rootScope,$routeParams,currentAuth,SingleOpera) {
            $scope.dati={};
            /*$rootScope.dati.currentView = "detailOpera";*/
            $rootScope.dati.currentView = "otherUser";
            $scope.dati.userId = currentAuth.uid;




        $scope.dati.opera = SingleOpera.getSingleOpera($routeParams.operaId);
            $scope.dati.autoreId = SingleOpera.getAutoreOpera($routeParams.autoreId);
            $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyB2RySAMBGiwVPZ6RmD1KI9dO5Iw2rDwCA";
            $scope.dati.vm = this;
            $scope.dati.vm.positions = [];
            $scope.dati.opera.$loaded().then(function () {
             var ubicazione = $scope.dati.opera.ubicazione;
             $scope.dati.vm.positions.push({ubicazione: ubicazione});
             console.log("vm.positions", $scope.dati.vm.positions);
            });


        //$scope.dati.UserId = $routeParams.userId;

    }]);