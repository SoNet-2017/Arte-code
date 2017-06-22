'use strict';

angular.module('myApp.homeView', ['ngRoute' ])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'homeView/homeView.html',
    controller: 'homeViewCtrl',
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

    .controller('homeViewCtrl', ['$scope','$rootScope','currentAuth','UsersFollowService', 'Opera','Evento','Critica',
        function($scope,$rootScope,currentAuth,UsersFollowService,Opera,Evento,Critica) {
        $scope.dati={};
        $rootScope.dati.currentView = "home";
        $scope.dati.userId = currentAuth.uid;
        $scope.dati.user = UsersFollowService.getUserInfo(currentAuth.uid);


        $scope.dati.eventos = Evento.getData();
        $scope.dati.opere = Opera.getData();
        $scope.dati.critics = Critica.getData();

    }]);