'use strict';

angular.module('myApp.homeView', ['ngRoute','myApp.evento'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/homeView', {
    templateUrl: 'homeView/homeView.html',
    controller: 'View1Ctrl'
  });
}])

    .controller('View1Ctrl', ['$scope','Evento',function($scope,Evento) {
        Evento.getData().then(function(data) {
            $scope.dati={};
            $scope.dati.eventos = data;
        });
    }]);