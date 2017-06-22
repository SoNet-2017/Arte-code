'use strict';

angular.module('myApp.eventView', ['ngRoute','myApp.evento','myApp.calendar'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detailsEvento/:autoreId/:eventoId', {
            templateUrl: 'eventView/eventView.html',
            controller: 'eventView1Ctrl',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]

            }
        })
    }])

    .controller('eventView1Ctrl', ['$scope','$rootScope','$routeParams', 'SingleEvento','UserList', 'currentAuth', 'Opera',
        function($scope,$rootScope,$routeParams,SingleEvento,UserList, currentAuth, Opera) {
            $scope.dati={};
            $scope.dati.evento = SingleEvento.getSingleEvento($routeParams.eventoId);
            $scope.dati.autoreId = SingleEvento.getAutoreEvento($routeParams.autoreId);
            $scope.dati.opere = Opera.getData();


        $scope.dati.availableUsers = UserList.getListOfUsers();
        $scope.dati.userId = currentAuth.uid;

            $scope.orderProp = "";
            $scope.evento = function (eventoId) {
                if (eventoId = $scope.dati.evento.id){
                    return eventoId;
                }
            };



        $scope.dati.partecipanti =  SingleEvento.getPartecipants();


        $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyB2RySAMBGiwVPZ6RmD1KI9dO5Iw2rDwCA";
        $scope.dati.vm = this;
        $scope.dati.vm.positions = [];
        $scope.dati.evento.$loaded().then(function () {
            var ubicazione = $scope.dati.evento.ubicazione;
            $scope.dati.vm.positions.push({ubicazione: ubicazione});
            console.log("vm.positions", $scope.dati.vm.positions);
        });


            $scope.dati.Ini=""
            $scope.dati.F= "";
            $scope.dati.Ina="";
            $scope.dati.date = $scope.dati.evento.$loaded().then(function () {
                var inizio = $scope.dati.evento.start;
                var fine = $scope.dati.evento.end;
                var inaug = $scope.dati.evento.inaugurazione;
                $scope.dati.Ini = inizio;
                $scope.dati.F = fine;
                $scope.dati.Ina = inaug;
                $scope.events.push(
                    {title: 'Mostra',start: inizio, end: fine,allDay: false},
                    {title :'Inagurazione',start: inaug});
            });
            $scope.Prova = function (partecipante) {
                $rootScope.evento = this;
                $scope.opereEvento = partecipante.opere
                $scope.eventoId = partecipante.eventoId;
                $scope.IdParteipazione = partecipante.id;
                $scope.userPar = SingleEvento.getAutoreEvento(partecipante.userPar);
                console.log($scope.partecipante);
            };



            var ctrl = this;
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();




            /*Controller Calendario*/
            $scope.changeTo = 'Italian';

            /* event source that pulls from google.com */
            $scope.eventSource = {
                url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
                className: 'gcal-event',           // an option!
                currentTimezone: 'America/Chicago' // an option!
            };
            /* event source that contains custom events on the scope */

            /* https://fullcalendar.io/docs/text/timeFormat/ DOCUMENTAZIONE FULLCALENDAR*/
            $scope.events =
                [
            ];


            console.log($scope.events)
            /* event source that calls a function on every view switch */
            $scope.eventsF = function (start, end, timezone, callback) {
                var s = new Date(start).getTime() / 1000;
                var e = new Date(end).getTime() / 1000;
                var m = new Date(start).getMonth();
                var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
                callback(events);
            };

            $scope.calEventsExt = {
                color: '#f00',
                textColor: 'yellow',
                events: [
                    {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                    {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                    {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
                ]
            };
            /* add and removes an event source of choice */

            /* event sources array*/
            $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
            $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

    }]);