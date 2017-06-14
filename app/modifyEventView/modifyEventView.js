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
    .controller('modifyEventViewCtrl', ['$scope', '$rootScope', '$routeParams','UserList', 'ModifyEventoService','InsertUserService','SingleEvento', 'Opera','InsertOperaEventService',
        function($scope, $rootScope,$routeParams,UserList, ModifyEventoService,InsertUserService,SingleEvento, Opera,InsertOperaEventService) {
            $scope.dati={};
            $scope.dati.evento = ModifyEventoService.getSingleEvento($routeParams.eventoId);
            $scope.dati.availableUsers = UserList.getListOfUsers();
            console.log($routeParams.eventoId);
            $scope.dati.partecipanti = SingleEvento.getPartecipant($routeParams.eventoId);



            $scope.dati.opere = Opera.getData();



            $scope.editEvento = function() {
                ModifyEventoService.updateEvento($routeParams.eventoId,$scope.dati.nome_evento, $scope.dati.tema, $scope.dati.inaugurazione,$scope.dati.start,$scope.dati.end,$scope.dati.ubicazione,$scope.dati.info);
                //$scope.dati.evento = ModifyEventoService.getSingleEvento($routeParams.eventoId);

            };

            $scope.addUser = function (){
                InsertUserService.insertNewUser($routeParams.eventoId,$scope.dati.userParId).then(function(ref) {
                    var Parametro = ref.key;
                    console.log($routeParams.eventoId);
                    InsertUserService.updateUserPar($routeParams.eventoId,Parametro);
                    $scope.dati.userParId = "";
                });

                };



            }]);