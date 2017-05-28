'use strict';

angular.module('myApp.detailOperaView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detailOpera/:operaId',{
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

    .controller('detailOperaViewCtrl', ['$scope','$routeParams', 'SingleOpera', function($scope,$routeParams,SingleOpera) {
            $scope.dati={};
            $scope.dati.critica = SingleOpera.getSingleOpera($routeParams.operaId);
    }]);