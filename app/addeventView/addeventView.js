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

    .controller('addeventViewCtrl', ['$scope', '$rootScope','currentAuth',
        function($scope, $rootScope,currentAuth) {
            $scope.dati = {};
            $scope.dati.feedback = "";
            $rootScope.dati.currentView = "addEvento";
            $rootScope.dati.userId = currentAuth.uid;

        }])

    .controller('addeventViewCtrl_2', ['$scope', '$rootScope', 'InsertEventoService', '$firebaseStorage','$location',
        function($scope, $rootScope, InsertEventoService, $firebaseStorage, $location) {
            $scope.dati = {};
            $scope.dati.feedback = "";
            $rootScope.dati.currentView = "addEvento";


            $scope.today = new Date();


            var ctrl = this;
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


            $scope.finalEventoAddition = function() {                                                                  //yyyy-MM-dd
                InsertEventoService.insertNewEvento($rootScope.dati.userId,$scope.dati.nome_evento, $scope.dati.tema,
                    $scope.dati.inaugurazione.getUTCFullYear() + '-' + ('0' + ($scope.dati.inaugurazione.getMonth() + 1)).slice(-2) + '-' + ('0' + $scope.dati.inaugurazione.getDate()).slice(-2),
                    $scope.dati.start.getUTCFullYear() + '-' + ('0' + ($scope.dati.start.getMonth() + 1)).slice(-2) + '-' + ('0' + $scope.dati.start.getDate()).slice(-2),
                    $scope.dati.end.getUTCFullYear() + '-' + ('0' + ($scope.dati.end.getMonth() + 1)).slice(-2) + '-' + ('0' + $scope.dati.end.getDate()).slice(-2),
                    $scope.dati.ubicazione,$scope.dati.info, $scope.imgPath).then(function(ref) {
                    var eventoId = ref.key;
                    $scope.evento = eventoId;
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
                    $location.path("/addModifyEvent/"+ eventoId);
                });

            };
}]);