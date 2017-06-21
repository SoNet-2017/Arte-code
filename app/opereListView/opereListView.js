'use strict';

angular.module('myApp.opereListView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/listeOpere',{
            templateUrl: 'opereListView/opereListView.html',
            controller: 'opereListViewCtrl',
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

    .controller('opereListViewCtrl', ['$scope','$rootScope','Opera', 'currentAuth',
        function($scope,$rootScope,Opera,currentAuth) {
            $scope.dati = {};
            $rootScope.dati.currentView = "listeOpere";
            $scope.dati.opere = Opera.getData();
            $scope.removeOpera = function(operaId){
                Opera.deleteOpera(operaId);}
            $scope.dati.userId = currentAuth.uid;
            $scope.myInterval = 3000;
            $scope.Autore = function (autoreId) {
                if (autoreId == $scope.dati.userId)
                return autoreId;};
            $scope.dati.users = Opera.getAutori();

            $scope.operaSearch = {};
            $scope.orderProp = "autoreId";


            }
    ]);
