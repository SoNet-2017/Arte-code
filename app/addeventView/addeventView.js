'use strict';

angular.module('myApp.addeventView',['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addEvento',{
            templateUrl: 'addeventView/addeventView.html',
            controller: 'addeventViewCtrl',
            resolve: {
                "currentAuth":["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })

    }])
    .controller('addeventViewCtrl',['$scope','$rootScope','InsertEventoService',
        function ($scope,$rootScope,InsertEventoService) {
        $scope.dati = {};
        $scope.dati.feedback = "";
        $rootScope.dati.currentView = "addEvento"
    }])