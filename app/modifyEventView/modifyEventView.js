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
            $scope.dati.availableUsers = UserList.getListOfUsers();
            $scope.dati.partecipanti = SingleEvento.getPartecipants();
            $scope.dati.evento = SingleEvento.getSingleEvento($routeParams.eventoId);
            $scope.orderProp = "eventoId";
            $scope.evento = function (eventoId) {
                if (eventoId = $scope.dati.evento.id){
                    return eventoId;
                }
            };
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


            /* aggiungo un opera
            $scope.dati.Artista= "";

            $scope.dati.A = function () {
                SingleEvento.getAutoreEvento($scope.dati.partecipante).then(function () {
                    var artista = $scope.dati.partecipante;
                    $scope.dati.Artista = artista;
                    console.log("", $scope.dati.Artista);
                    return $scope.dati.Artista;
                });
            };*/
           $scope.A = function (partecipante) {
               $scope.eventoId = partecipante.eventoId;
               $scope.IdParteipazione = partecipante.id;
               $scope.userPar = SingleEvento.getAutoreEvento(partecipante.userPar);
               console.log($scope.partecipant);
           };

           $scope.dati.opere = Opera.getData();


            $scope.addWorks = function (idPartecipazione, opera) {
                InsertOperaEventService.insertNewOperaEvent(idPartecipazione, opera);
                console.log(opera);
            };



            }]);