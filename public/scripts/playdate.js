(function (window) {
    'use strict';

    var App = window.App || {};

    class Playdate {
        constructor(dateId, db) {
            this.dateId = dateId;
            this.db = db;
        }
        createDate(playdate) {
            console.log('Adding date for ' + playdate.id);
            return this.db.add(playdate.id, playdate);
        }

        updateDate(userId) { 
            console.log('Updating date for ' + auth.currentUser.email);
            return this.db.update(userId, auth.currentUser.email);
        }
        printDates(printFn) {
            return this.db.getAll()
                .then(function(playdates) {
                    var playdateIdArray = Object.keys(playdates);
                    playdateIdArray.forEach(function(id) {
    
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