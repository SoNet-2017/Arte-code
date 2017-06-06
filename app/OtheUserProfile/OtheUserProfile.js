'use strict';

angular.module('myApp.OtheUserProfile', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/otherUser/:otherUserId', {
            templateUrl: 'OtheUserProfile/OtheUserProfile.html',
            controller: 'OtheUserProfileCtrl',
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

   .controller('OtheUserProfileCtrl',['$scope','$rootScope','$routeParams','currentAuth','UsersFollowService', 'Evento', 'Opera', 'Critica', 'UserList',
   function ($scope, $rootScope, $routeParams, currentAuth, UsersFollowService, Evento, Opera, Critica, UserList) {

       $scope.dati = {};
       $rootScope.dati.currentView = "otherUser";

       $scope.dati.userId = currentAuth.uid;
       $scope.dati.otherUserId = $routeParams.otherUserId;

       //$scope.dati.userInfo = UsersFollowService.getUserInfo($scope.dati.userId);
       $scope.dati.recipient = UsersFollowService.getUserInfo($scope.dati.otherUserId);





       $scope.dati.eventos = Evento.getData();
       $scope.dati.opere = Opera.getData();
       $scope.dati.critiche = Critica.getData();
       $scope.dati.follows = UsersFollowService.getFollow();



       $scope.CreateFollow = function() {

           $scope.dati.userInfo = UsersFollowService.getUserInfo($scope.dati.userId);
           //$scope.dati.recipient.email  =  UsersFollowService.getUserInfo($scope.dati.followedUserId.email);
           //$scope.dati.recipient = UsersFollowService.getUserInfo($scope.dati.followedUserId);

           var newFollow = UsersFollowService.createFollow($scope.dati.userId, $scope.dati.recipient.name, $routeParams.otherUserId);
           UsersFollowService.addFollow(newFollow);
       }
   }]);