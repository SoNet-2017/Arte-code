'use strict';

angular.module('myApp.users', [
    'myApp.users.usersService',
    'myApp.users.usersListService',
    'myApp.users.usersFollowService',
    'myApp.users.usersConferenceService'])

    .value('version', '0.1');
