'use strict';

angular.module('myApp.users', [
    'myApp.users.usersService',
    'myApp.users.usersListService'])

    .value('version', '0.1');
