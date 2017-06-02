'use strict';

angular.module('myApp.followView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/follow/:followedUserId', {
            templateUrl: 'FollowView/FollowView.html',
            controller: 'FollowViewCtrl',
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

   .controller('FollowViewCtrl',['$scope','$rootScope','$routeParams','currentAuth','UsersFollowService',
   function ($scope, $rootScope, $routeParams, currentAuth, UsersFollowService) {

       $scope.dati = {};
       $rootScope.dati.currentView = "follow";

       $scope.dati.userId = currentAuth.uid;
       $scope.dati.followedUserId = $routeParams.followedUserId;

       //$scope.dati.userInfo = UsersFollowService.getUserInfo($scope.dati.userId);
       $scope.dati.recipient = UsersFollowService.getUserInfo($scope.dati.followedUserId);



       $scope.addFollow = function(e) {

           $scope.dati.userInfo = UsersFollowService.getUserInfo($scope.dati.userId);
           //$scope.dati.recipient.email  =  UsersFollowService.getUserInfo($scope.dati.followedUserId.email);
           //$scope.dati.recipient = UsersFollowService.getUserInfo($scope.dati.followedUserId);

           var newFollow = UsersFollowService.createFollow($scope.dati.userId, $scope.dati.recipient.name, $routeParams.followedUserId);
           UsersFollowService.addFollow(newFollow);
       }
   }])