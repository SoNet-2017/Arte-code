/**
 * Created by S234591 on 19/05/2017.
 */
'use strict';
angular.module('myApp.critiche', [
        'myApp.critiche.criticheService',
        'myApp.critiche.singleCriticaService',
        'myApp.critiche.insertCriticaService',
        'myApp.critiche.modifyCriticaService'
    ])

    .value('version', '0.1');
