'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.homeView',
  'myApp.view2',
  'myApp.loginView',
  'myApp.version'
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