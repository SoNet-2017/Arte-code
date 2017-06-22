'use strict';

// Initialize the Firebase SDK
var config = {
    apiKey: "AIzaSyB038goORO0c8K4g3lsSk9ExrBPsB_6A_s",
    authDomain: "arte-853a7.firebaseapp.com",
    databaseURL: "https://arte-853a7.firebaseio.com",
    projectId: "arte-853a7",
    storageBucket: "arte-853a7.appspot.com"
};
firebase.initializeApp(config);

// Declare app level module which depends on views, and components
angular.module('myApp', [
    "firebase",
  'ngRoute',
    'ngMap',
    'ui.bootstrap',
    'myApp.calendar',
    'myApp.homeView',
    'myApp.eventView',
    'myApp.evento',
    'myApp.critiche',
    'myApp.opere',
    'myApp.listeventView',
    'myApp.addeventView',
    'myApp.userProfileView',
    'myApp.userRegistrationView',
  'myApp.users',
    'myApp.fileUpload',
    'myApp.loginView',
  'myApp.authentication',
    'myApp.usersListView',
    'myApp.criticheListView',
    'myApp.addCriticView',
    'myApp.detailCriticaView',
    'myApp.opereListView',
    'myApp.addOpreaView',
    'myApp.detailOperaView',
    'myApp.OtheUserProfile',
    'myApp.modifyEventView',
    'myApp.modifyCriticView',
    'myApp.usersConferenceListView',
    'myApp.conferenceView'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/home'});
    }])
    .run(["$rootScope", "$location", function($rootScope, $location) {
        $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
                $location.path("/loginView");
            }
        });
    }])
    .controller('MainCtrl', ['$scope', '$rootScope', '$firebaseAuth',
        function($scope, $rootScope, $firebaseAuth) {
        //this controller only declares a function to get information about the user status (logged in / out)
        //it is used to show menu buttons only when the user is logged

        //set the variable that is used in the main template to show the active button
        $rootScope.dati = {};
        $rootScope.dati.currentView = 'home';
            $scope.isLogged = function() {
            if ($firebaseAuth().$getAuth())
            return true;
            else
            return false;
        }
    }]);
