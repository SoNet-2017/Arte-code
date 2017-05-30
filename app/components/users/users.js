'use strict';

angular.module('myApp.users', [
    'myApp.users.usersService',
    'myApp.users.usersListService',
    'myApp.users.usersChatService',
    'myApp.users.usersFollowService'])

    .value('version', '0.1');
