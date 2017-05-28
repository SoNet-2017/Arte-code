/**
 * Created by S234591 on 19/05/2017.
 */
'use strict';
angular.module('myApp.opere', [
        'myApp.opere.opereService',
        'myApp.opere.singleOperaService',
        'myApp.opere.insertOperaService'
    ])

    .value('version', '0.1');
