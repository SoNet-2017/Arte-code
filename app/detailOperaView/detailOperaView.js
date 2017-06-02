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
            $rootScope.dati.currentView = "detailOpera";
            $scope.dati.opera = SingleOpera.getSingleOpera($routeParams.operaId);
            $scope.dati.autoreId = SingleOpera.getAutoreOpera($routeParams.autoreId);



        //$scope.dati.UserId = $routeParams.userId;

    }]);