(function (window) {
    'use strict';

    var App = window.App || {};

    class Playdate {
        constructor(dateId, db) {
            this.dateId = dateId;
            this.db = db;
            //console.log('in the Playdate constructor');
        }
        createDate(playdate) {
            console.log('Adding date for ' + playdate.username);
            return this.db.add(playdate.username, playdate);
        }
        // deleteDate(userId) { 
        //     console.log('Deleting date for ' + userId);
        //     return this.db.remove(userId);
        // }
        updateDate(userId) { 
            console.log('Updating date for ' + auth.currentUser.email);
            return this.db.update(userId, auth.currentUser.email);
        }
        printDates(printFn) {
            return this.db.getAll()
                .then(function(playdates) {
                    var playdateIdArray = Object.keys(playdates);
                    // console.log('Truck #' + this.truckId + ' has pending orders: ');
                    playdateIdArray.forEach(function(id) {
                        //console.log(playdates[id]);
                        if (printFn) {
                            printFn(playdates[id]);
                        }
                }.bind(this));
            }.bind(this));
        }
    }

    App.Playdate = Playdate;
    window.App = App;
})(window);