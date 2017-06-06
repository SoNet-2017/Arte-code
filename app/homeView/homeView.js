'use strict';

angular.module('myApp.homeView', ['ngRoute' ])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/homeView', {
    templateUrl: 'homeView/homeView.html',
    controller: 'View1Ctrl',
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

    .controller('View1Ctrl', ['$scope','$rootScope','currentAuth','UsersChatService', 'Opera','Evento','Critica',
        function($scope,$rootScope,currentAuth,UsersChatService,Opera,Evento,Critica) {
        $scope.dati={};
        $rootScope.dati.currentView = "homeView";
        $scope.dati.userId = currentAuth.uid;
        $scope.dati.user = UsersChatService.getUserInfo(currentAuth.uid);


        $scope.dati.eventos = Evento.getData();
        $scope.dati.opere = Opera.getData();
        $scope.dati.critics = Critica.getData();

    }]);