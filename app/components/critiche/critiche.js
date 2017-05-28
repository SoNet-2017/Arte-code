/**
 * Created by S234591 on 19/05/2017.
 */
'use strict';
angular.module('myApp.critica', [
        'myApp.critica.criticheService',
        'myApp.critica.singleCriticaService',
        'myApp.critica.insertCriticaService'
    ])

    .value('version', '0.1');
