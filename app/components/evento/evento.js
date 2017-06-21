/**
 * Created by S234591 on 19/05/2017.
 */
'use strict';
angular.module('myApp.evento', [
        'myApp.evento.eventoService',
        'myApp.evento.singleEventoService',
        'myApp.evento.insertEventoService',
        'myApp.evento.modifyEventoService',
        'myApp.evento.insertUserService',
    ])

    .value('version', '0.1');
