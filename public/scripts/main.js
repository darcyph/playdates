(function (window) {
    'use strict';

    var FIREBASE_SERVER_URL = 'http://play-dates-b38e9.firebaseapp.com';
    
    var App = window.App;
    var Playdate = App.Playdate;
    var firebasedatastore = App.firebasedatastore;
    

    var datastore = new firebasedatastore(FIREBASE_SERVER_URL);
    var playdate = new Playdate('test', datastore);
    window.playdate = playdate;

    //listening for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('logged in as: ' + user.email);
        var FORM_SELECTOR = '[create-playdate="form"]';
        const CARD_SELECTOR = '[create-playdate="cards"]';
        var JOINED_SELECTOR = '[joined-playdate="cards"]';
        var FormHandler = App.FormHandler;
        var Cards = App.Cards;
        var cards = new Cards(CARD_SELECTOR, auth.currentUser.email);
        var joinedCheckList = new Cards(JOINED_SELECTOR, auth.currentUser.email);
        cards.addClickHandler(playdate.deleteDate.bind(playdate));
        var formHandler = new FormHandler(FORM_SELECTOR);
        formHandler.addSubmitHandler(function (data) {
            return playdate.createDate.call(playdate, data)
                .then(function () {
                        cards.addEntry.call(cards, data);
                    },
                    function () {
                        alert('Server unreachable. Try again later.');
                    });
        });

        playdate.printDates(cards.addEntry.bind(cards));
        playdate.printDates(joinedCheckList.addEntry.bind(joinedCheckList));
    } else {
        console.log('user logged out');
    }

})
})(window);