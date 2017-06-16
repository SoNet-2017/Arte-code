

'use strict';

angular.module('myApp.insertOperaForEventView',['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addOperaForEvent/:eventoId/:userPar/:userParId',{
            templateUrl: 'insertOperaForEventView/insertOperaForEventView.html',
            controller: 'insertOperaForEventViewCtrl',
            resolve: {
                "currentAuth":["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        });

    }])
    .controller('insertOperaForEventViewCtrl',['$scope','$routeParams','InsertOperaEventService', 'Opera',
        function ($scope,$routeParams,InsertOperaEventService,Opera) {
            $scope.dati = {};
            $scope.dati.user = InsertOperaEventService.getUserInfo($routeParams.userParId);
            $scope.dati.evento = InsertOperaEventService.getSingleEvento($routeParams.eventoId);
            $scope.dati.userPar = InsertOperaEventService.getUserPar($routeParams.eventoId,$routeParams.userParId);
            $scope.dati.opere = Opera.getData();


            $scope.addWorks = function (idPartecipazione, opera) {
                InsertOperaEventService.insertNewOperaEvent(idPartecipazione, opera);
                console.log(opera);
            };

        }]
    )