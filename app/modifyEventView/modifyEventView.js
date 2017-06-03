'use strict';

angular.module('myApp.modifyEventView',['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addModifyEvent/:eventoId',{
            templateUrl: 'modifyEventView/modifyEventView.html',
            controller: 'modifyEventViewCtrl',
            resolve: {
                "currentAuth":["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        });

    }])
    .controller('modifyEventViewCtrl', ['$scope', '$rootScope', '$routeParams', 'ModifyEventoService',
        function($scope, $rootScope,$routeParams, ModifyEventoService) {
            $scope.dati={};
            $scope.dati.evento = ModifyEventoService.getSingleEvento($routeParams.eventoId);

            $scope.addModifyEvent = function() {
                ModifyEventoService.modifyEvento($scope.dati.id,$scope.dati.nome_evento, $scope.dati.tema, $scope.dati.inaugurazione,$scope.dati.mostra,$scope.dati.info)
            }


        }]);