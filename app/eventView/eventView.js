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

    .controller('eventView1Ctrl', ['$scope','$routeParams', 'SingleEvento','UserList', 'currentAuth',
        function($scope,$routeParams,SingleEvento,UserList, currentAuth) {
            $scope.dati={};
            $scope.dati.evento = SingleEvento.getSingleEvento($routeParams.eventoId);
            $scope.dati.autoreId = SingleEvento.getAutoreEvento($routeParams.autoreId);

            var partecipante = $scope.dati.evento.userPar;

 //           $scope.dati.evento.partecipante = SingleEvento.getPartecipant($routeParams.eventoId, $routeParams.eventoId.userPar);
        $scope.dati.availableUsers = UserList.getListOfUsers();
        $scope.dati.userId = currentAuth.uid;


        $scope.dati.partecipanti =  SingleEvento.getPartecipant($routeParams.eventoId);


        $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyB2RySAMBGiwVPZ6RmD1KI9dO5Iw2rDwCA";
        $scope.dati.vm = this;
        $scope.dati.vm.positions = [];
        $scope.dati.evento.$loaded().then(function () {
            var ubicazione = $scope.dati.evento.ubicazione;
            $scope.dati.vm.positions.push({ubicazione: ubicazione});
            console.log("vm.positions", $scope.dati.vm.positions);
        });



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
            $scope.events = [
                {title: 'All Day Event',start: new Date(y, m, 1)},
                {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
                {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
                {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
                {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
                {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
            ];
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