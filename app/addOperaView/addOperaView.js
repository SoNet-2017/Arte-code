'use strict';

angular.module('myApp.addOpreaView',['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addOpera',{
            templateUrl: 'addOperaView/addOperaView.html',
            controller: 'addOperaViewCtrl',
            resolve: {
                "currentAuth":["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })

    }])
    .controller('addOperaViewCtrl', ['$scope', '$rootScope', 'InsertOperaService','currentAuth',
        function($scope, $rootScope, InsertOperaService, currentAuth) {
            $scope.dati = {};
            $scope.dati.feedback = "";
            $rootScope.dati.currentView = "addOpera";
            $rootScope.dati.userId = currentAuth.uid;
            console.log($rootScope.dati.userId);

            //$scope.dati.userId = currentAuth.uid;

        }])
    .controller('addOperaViewCtrl_2', ['$scope', '$rootScope', 'InsertOperaService', '$firebaseStorage',
        function($scope, $rootScope, InsertOperaService, $firebaseStorage) {
            $scope.dati = {};
            $scope.dati.feedback = "";
            $rootScope.dati.currentView = "addOpera";
            var ctrl = this;

            console.log($rootScope.dati.userId);
            $scope.fileToUpload = null;
            $scope.imgPath= "";

            $scope.addOpera = function() {
                //check if the user inserted all the required information
                if ($scope.dati.ubicazione!= undefined && $scope.dati.ubicazione!="" && $scope.dati.titolo!= undefined && $scope.dati.titolo!="") {
                    $scope.dati.error = "";
                    //try to upload the image: if no image was specified, we create a new opera without an image
                    if ($scope.fileToUpload != null) {
                        //get the name of the file
                        var fileName = $scope.fileToUpload.name;
                        //specify the path in which the file should be saved on firebase
                        var storageRef = firebase.storage().ref("opereImg/" + fileName);
                        $scope.storage = $firebaseStorage(storageRef);
                        var uploadTask = $scope.storage.$put($scope.fileToUpload);
                        uploadTask.$complete(function (snapshot) {
                            $scope.imgPath = snapshot.downloadURL;
                            $scope.finalOperaAddition();
                        });
                        uploadTask.$error(function (error) {
                            $scope.dati.error = error + " - the Opera will be added without a descriptive image!";
                            //add the pizza in any case (without the image)
                            $scope.finalOperaAddition();
                        });
                    }
                    else {
                        //do not add the image
                        $scope.finalOperaAddition();

                    }
                }
                else
                {
                    //write an error message to the user
                    $scope.dati.error = "You forgot to insert one of the required information!";
                }
            };
            //initialize the function that will be called when a new file will be specified by the user
            ctrl.onChange = function onChange(fileList) {
                $scope.fileToUpload = fileList[0];
            };

            //$scope.dati.userId = currentAuth.uid;


            $scope.finalOperaAddition = function() {
                InsertOperaService.insertNewOpera($scope.dati.userInfo, $scope.dati.titolo, $scope.dati.ubicazione, $scope.dati.infoTecniche).then(function (ref) {
                    var operaId = ref.key;
                    //$scope.dati.userId = currentAuth.uid;
                    $scope.dati.userInfo = InsertOperaService.getUserInfo($scope.dati.userId);
                    InsertOperaService.updateOpera(operaId);
                    $scope.dati.feedback = "Inserimento effettuato con successo";
                    $scope.dati.titolo = "";
                    $scope.dati.ubicazione = "";
                    $scope.dati.infoTecniche = "";
                });
            }
        }]);