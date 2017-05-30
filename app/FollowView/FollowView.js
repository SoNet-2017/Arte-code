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
    .controller('FollowViewCtrl', ['$scope', '$routeParams', 'currentAuth', 'UsersFollowService',
    function($scope, $routeParams, currentAuth,UsersFollowService) {
        $scope.dati = {};
        $scope.userId = currentAuth.uid;
        $scope.dati.followedUserId = $routeParams.followedUserId;

        $scope.dati.userInfo = UsersFollowService.getUserInfo($scope.dati.userId);

        //get messages from firebase
        $scope.dati.followers = UsersFollowService.getFollow();
        //function that add a message on firebase
        $scope.addFollow = function() {
            //create the JSON structure that should be sent to Firebase
            var newFollow = UsersFollowService.createFollow($scope.dati.userId, $scope.dati.userInfo.email, $routeParams.followedUserId);
            UsersFollowService.addFollow(newFollow);
            $scope.dati.flw = "";
        };
    }]);