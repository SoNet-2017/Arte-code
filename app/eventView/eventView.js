'use strict';

angular.module('myApp.eventView', ['ngRoute','myApp.evento'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detailsEvento/:eventoId', {
            templateUrl: 'eventView/eventView.html',
            controller: 'eventView1Ctrl'
        });
    }])

    .controller('eventView1Ctrl', ['$scope','$routeParams', 'SingleEvento', function($scope,$routeParams,SingleEvento) {
            $scope.dati={};
            $scope.dati.evento = SingleEvento.getSingleEvento($routeParams.eventoId);

    }]);