'use strict';

angular.module('myApp.homeView', ['ngRoute','myApp.evento' ])

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

    .controller('View1Ctrl', ['$scope','Evento', 'Opera',function($scope,Evento,Opera) {
            $scope.dati={};
            $scope.dati.eventos = Evento.getData();
            $scope.dati.opere = Opera.getData();

    }]);