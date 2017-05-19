'use strict';

angular.module('myApp.loginView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/loginView', {
            templateUrl: 'loginView/loginView.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope',function($scope) {
        $scope.user={};
    }]);