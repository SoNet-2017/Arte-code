'use strict';

angular.module('myApp.userProfileView', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userProfile', {
    templateUrl: 'userProfile/userProfileView.html',
    controller: 'userProfileCtrl',
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

.controller('userProfileCtrl', ['$scope', '$rootScope', 'UsersFollowService', 'currentAuth', '$firebaseAuth',
    function($scope, $rootScope, UsersFollowService, currentAuth) {
    $scope.dati={};
    $rootScope.dati.currentView = "userProfile";
        $scope.dati.userId = currentAuth.uid;
        $scope.dati.user = UsersFollowService.getUserInfo(currentAuth.uid);


    }])
.controller('userProfileCtrl2',['$scope','$rootScope', 'Users', '$firebaseStorage','Evento', 'Opera', 'Critica', 'UsersFollowService','$firebaseAuth','$location',
    function ($scope,$rootScope, Users, $firebaseStorage,Evento, Opera, Critica, UsersFollowService,$firebaseAuth,$location) {

        $rootScope.dati.currentView = "userProfile";
    $scope.myInterval = 3000;
    $scope.dati.eventos = Evento.getData();
    $scope.dati.opere = Opera.getData();
    $scope.dati.critics = Critica.getData();
    $scope.dati.follows = UsersFollowService.getFollow();

    $scope.Autore = function (autoreId) {
        if (autoreId = $scope.dati.userId){
            return autoreId;
        };
    };
    console.log($scope.dati.userId);
    $scope.orderProp = "autoreId";
    // Function: form submission
    $scope.logout = function () {
        Users.registerLogout($scope.dati.userId);
        $firebaseAuth().$signOut();
        $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser) {
                console.log("User is yet signed in as:", firebaseUser.uid);
            } else {
                $location.path("/loginView");
            }
        });


    };
    var ctrl = this;
    $scope.fileToUpload = null;
    $scope.imgPath= "";

    $scope.addImage = function() {
        console.log($scope.dati.userId);
        //try to upload the image: if no image was specified, we create a new opera without an image
        if ($scope.fileToUpload != null) {
            //get the name of the file
            var fileName = $scope.fileToUpload.name;
            //specify the path in which the file should be saved on firebase
            var storageRef = firebase.storage().ref("userImg/" + fileName);
            $scope.storage = $firebaseStorage(storageRef);
            var uploadTask = $scope.storage.$put($scope.fileToUpload);
            uploadTask.$complete(function (snapshot) {
                $scope.imgPath = snapshot.downloadURL;
                $scope.finaladdImage();


            });
            uploadTask.$error(function (error) {
                $scope.dati.error = error + " - the Opera will be added without a descriptive image!";
                //add the pizza in any case (without the image)
                $scope.finaladdImage();
            });
        }
        else {
            //do not add the image
            $scope.finaladdImage();

        }
    };
    //initialize the function that will be called when a new file will be specified by the user
    ctrl.onChange = function onChange(fileList) {
        $scope.fileToUpload = fileList[0];
    };
    $scope.finaladdImage = function() {
        Users.updateImage($scope.dati.userId,$scope.imgPath);
        console.log("mamma");
        $scope.dati.feedback = "Inserimento effettuato con successo";

    };
}])




