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

       $scope.dati.userId = UsersFollowService.getUserInfo(currentAuth.uid);
       $scope.dati.otherUserId = $routeParams.otherUserId;

       //$scope.dati.userInfo = UsersFollowService.getUserInfo($scope.dati.userId);
       $scope.dati.recipient = UsersFollowService.getUserInfo($scope.dati.otherUserId);





       $scope.dati.eventos = Evento.getData();
       $scope.dati.opere = Opera.getData();
       $scope.dati.critiche = Critica.getData();
       $scope.dati.follows = UsersFollowService.getFollow();



       $scope.CreateFollow = function() {
           UsersFollowService.insertNewUsersFollow($scope.dati.userId,$routeParams.otherUserId,$scope.dati.recipient.name).then(function (ref) {
               var followId = ref.key;
               UsersFollowService.updateUsersFollow(followId);
           })
       };
        $scope.removeFollow = function (followId) {
            UsersFollowService.deleteFollow(followId);
        };
   }]);