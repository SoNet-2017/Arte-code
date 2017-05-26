
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
  'myApp.evento',
  'myApp.homeView',
  'myApp.loginView',
  'myApp.eventView',
  'myApp.authentication',
  'myApp.listeventView',
    'myApp.addeventView'
])
    .run(["$rootScope", "$location", function($rootScope, $location) {
        $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
                $location.path("/loginView");
            }
        });
    }])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/loginView'});
}])



    /*.config(function($routeProvider){
        $routeProvider.when("/utenti",{...})
        .when("/utenti/:userId",{...})
        .otherwise({redirectTo:"/utenti"});
    })*/;
