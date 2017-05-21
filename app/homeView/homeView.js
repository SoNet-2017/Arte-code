'use strict';

angular.module('myApp.homeView', ['ngRoute','myApp.evento'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/homeView', {
    templateUrl: 'homeView/homeView.html',
    controller: 'View1Ctrl'
  });
}])

    .controller('View1Ctrl', ['$scope','Evento',function($scope,Evento) {
            $scope.dati={};
            $scope.dati.eventos = Evento.getData();
    }]);