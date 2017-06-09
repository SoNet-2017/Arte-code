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
    .controller('modifyEventViewCtrl', ['$scope', '$rootScope', '$routeParams','UserList', 'ModifyEventoService','InsertUserService','SingleEvento',
        function($scope, $rootScope,$routeParams,UserList, ModifyEventoService,InsertUserService,SingleEvento) {
            $scope.dati={};
            $scope.dati.evento = ModifyEventoService.getSingleEvento($routeParams.eventoId);
            $scope.dati.availableUsers = UserList.getListOfUsers();
            console.log($routeParams.eventoId);
            $scope.dati.partecipanti = SingleEvento.getPartecipant($routeParams.eventoId);


            $scope.editEvento = function() {
                ModifyEventoService.updateEvento($routeParams.eventoId,$scope.dati.nome_evento, $scope.dati.tema, $scope.dati.inaugurazione,$scope.dati.mostra,$scope.dati.info);
                //$scope.dati.evento = ModifyEventoService.getSingleEvento($routeParams.eventoId);

            };

            $scope.addUser = function (){
                InsertUserService.insertNewUser($routeParams.eventoId,$scope.dati.userPar);
                $scope.dati.userPar = "";

                };
            }])