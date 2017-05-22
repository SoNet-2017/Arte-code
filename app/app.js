
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
  'myApp.homeView',
  'myApp.loginView',
  'myApp.eventView',
])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/homeView'});
}])



    /*.config(function($routeProvider){
        $routeProvider.when("/utenti",{...})
        .when("/utenti/:userId",{...})
        .otherwise({redirectTo:"/utenti"});
    })*/;