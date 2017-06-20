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

   .controller('OtheUserProfileCtrl',['$scope','$rootScope','$routeParams','$window','currentAuth','UsersFollowService', 'Evento', 'Opera', 'Critica', 'UserList',
   function ($scope, $rootScope, $routeParams,$window, currentAuth, UsersFollowService, Evento, Opera, Critica, UserList) {

       $scope.dati = {};
       $rootScope.dati.currentView = "otherUser";

       $scope.dati.userId = UsersFollowService.getUserInfo(currentAuth.uid);
       $scope.dati.otherUserId = $routeParams.otherUserId;

       //$scope.dati.userInfo = UsersFollowService.getUserInfo($scope.dati.userId);
       $scope.dati.recipient = UsersFollowService.getUserInfo($scope.dati.otherUserId);
       $scope.Autore = function (autoreId) {
           if (autoreId = $scope.dati.otherUserId){
               return autoreId;
           };
       };
       $scope.orderProp = "autoreId";


        console.log($scope.dati.userId.$id);
        console.log($scope.dati.recipient.$id);


       $scope.orderProp1 = "followed";

       $scope.dati.eventos = Evento.getData();
       $scope.dati.opere = Opera.getData();
       $scope.dati.critiche = Critica.getData();
       $scope.dati.follows = UsersFollowService.getFollow();
       $scope.dati.notYetFollowing = true;
       $scope.dati.follows.$loaded().then(function(){
               var following = $scope.dati.follows;
               for (var keySingleFlowing in following) {
                   if (!angular.isFunction(keySingleFlowing)) {
                       if (!angular.isFunction(following[keySingleFlowing]))
                       {
                           if (following[keySingleFlowing]!=undefined && following[keySingleFlowing].follower!=undefined) {
                               if ($scope.dati.userId.$id == following[keySingleFlowing].follower.userId) {
                                   if ($scope.dati.recipient.$id == following[keySingleFlowing].followed) {
                                       $scope.dati.notYetFollowing = false;
                                   }
                               }
                           }
                       }
                   }
               }
       });
       $scope.dati.yetFollowing = false;
       $scope.dati.follows.$loaded().then(function(){
           var following = $scope.dati.follows;
           for (var keySingleFlowing in following) {
               if (!angular.isFunction(keySingleFlowing)) {
                   if (!angular.isFunction(following[keySingleFlowing])) {
                       if (following[keySingleFlowing]!=undefined && following[keySingleFlowing].follower!=undefined) {
                           if ($scope.dati.userId.$id == following[keySingleFlowing].follower.userId) {
                               if ($scope.dati.recipient.$id == following[keySingleFlowing].followed) {
                                   $scope.dati.Follow = following[keySingleFlowing].id;
                                   console.log($scope.dati.Follow);
                                   $scope.dati.yetFollowing = true;

                               }
                           }
                       }
                   }
               }
           }
       return false;});




       $scope.CreateFollow = function() {
           UsersFollowService.insertNewUsersFollow($scope.dati.userId,$routeParams.otherUserId,$scope.dati.recipient.name,'Bottone disabilitato').then(function (ref) {
               var followId = ref.key;
               UsersFollowService.updateUsersFollow(followId);
               $scope.dati.notYetFollowing = false;
               $scope.dati.yetFollowing =true;
               $window.location.reload();

           });
       };
        $scope.removeFollow = function (followId) {
            UsersFollowService.deleteFollow(followId);
            $scope.dati.notYetFollowing = true;
            $scope.dati.yetFollowing =false;
        };
   }]);