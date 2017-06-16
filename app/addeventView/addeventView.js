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
        });

    }])

    .controller('addeventViewCtrl', ['$scope', '$rootScope','currentAuth', 'InsertEventoService',
        function($scope, $rootScope,currentAuth, InsertEventoService) {
            $scope.dati = {};
            $scope.dati.feedback = "";
            $rootScope.dati.currentView = "addEvento";
            $rootScope.dati.userId = currentAuth.uid;
            console.log($rootScope.dati.userId);

        }])

    .controller('addeventViewCtrl_2', ['$scope', '$rootScope', 'InsertEventoService', '$firebaseStorage',
        function($scope, $rootScope, InsertEventoService, $firebaseStorage) {
            $scope.dati = {};
            $scope.dati.feedback = "";
            $rootScope.dati.currentView = "addEvento";
            var ctrl = this;


            console.log($rootScope.dati.userId);
            $scope.fileToUpload = null;
            $scope.imgPath= "";

            $scope.addEvento = function() {

                //check if the user inserted all the required information
                if ($scope.dati.ubicazione!= undefined && $scope.dati.ubicazione!="" && $scope.dati.nome_evento!= undefined && $scope.dati.nome_evento!="") {
                    $scope.dati.error = "";
                    //try to upload the image: if no image was specified, we create a new opera without an image
                    if ($scope.fileToUpload != null) {
                        //get the name of the file
                        var fileName = $scope.fileToUpload.name;
                        //specify the path in which the file should be saved on firebase
                        var storageRef = firebase.storage().ref("eventFiles/" + fileName);
                        $scope.storage = $firebaseStorage(storageRef);
                        var uploadTask = $scope.storage.$put($scope.fileToUpload);
                        uploadTask.$complete(function (snapshot) {
                            $scope.imgPath = snapshot.downloadURL;
                            $scope.finalEventoAddition();


                        });
                        uploadTask.$error(function (error) {
                            $scope.dati.error = error + " - the Event will be added without a condition report!";
                            //add the pizza in any case (without the image)
                            $scope.finalEventoAddition();
                        });
                    }
                    else {
                        //do not add the image
                        $scope.finalEventoAddition();

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


            $scope.finalEventoAddition = function() {
                InsertEventoService.insertNewEvento($rootScope.dati.userId,$scope.dati.nome_evento, $scope.dati.tema, $scope.dati.inaugurazione.toDateString(), $scope.dati.start.toDateString(), $scope.dati.end.toDateString(), $scope.dati.ubicazione,$scope.dati.info, $scope.imgPath).then(function(ref) {
                    var eventoId = ref.key;
                    $scope.dati.userInfo = InsertEventoService.getUserInfo($rootScope.dati.userId);
                    InsertEventoService.updateEvento(eventoId);
                    $scope.dati.feedback = "Inserimento effettuato con successo";
                    $scope.dati.nome_evento = "";
                    $scope.dati.tema = "";
                    $scope.dati.inaugurazione = "";
                    $scope.dati.start = "";
                    $scope.dati.end = "";
                    $scope.dati.ubicazione = "";
                    $scope.dati.mostra = "";
                    $scope.dati.info = "";
                    console.log($scope.dati.start);
                });
            };
}]);