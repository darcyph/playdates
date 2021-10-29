(function (window) {
    'use strict';
    var FORM_SELECTOR = '[create-playdate="form"]';
    // var CHECKLIST_SELECTOR = '[create-playdate="checklist"]';
    var CARD_SELECTOR = '[create-playdate="cards"]';
    var FIREBASE_SERVER_URL = 'http://play-dates-b38e9.firebaseapp.com';
    
    var App = window.App;
    var Playdate = App.Playdate;
    var firebasedatastore = App.firebasedatastore;
    var FormHandler = App.FormHandler;
    // var CheckList = App.CheckList;
    var Cards = App.Cards;

    

    var datastore = new firebasedatastore(FIREBASE_SERVER_URL);
    var playdate = new Playdate('test', datastore);
    window.playdate = playdate;
    
    // var checkList = new CheckList(CHECKLIST_SELECTOR);
    // checkList.addClickHandler(playdate.deleteDate.bind(playdate));
    // var formHandler = new FormHandler(FORM_SELECTOR);
    // formHandler.addSubmitHandler(function(data) {
    //     return playdate.createDate.call(playdate, data)
    //         .then(function() {
    //             checkList.addRow.call(checkList, data);
    //         },
    //         function() { 
    //             alert('Server unreachable. Try again later.');
    //         });
    // });
    var cards = new Cards(CARD_SELECTOR);
    cards.addClickHandler(playdate.deleteDate.bind(playdate));
    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(function(data) {
        return playdate.createDate.call(playdate, data)
            .then(function() {
                cards.addRow.call(cards, data);
            },
            function() { 
                alert('Server unreachable. Try again later.');
            });
    });
    
    // playdate.printDates(checkList.addRow.bind(checkList));

    playdate.printDates(cards.addRow.bind(cards));
    
    //console.log(formHandler);
})(window);