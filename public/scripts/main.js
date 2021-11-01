var FORM_SELECTOR = '[create-playdate="form"]';
var CARD_SELECTOR = '[create-playdate="cards"]';
var JOINED_SELECTOR = '[joined-playdate="cards"]';
var FormHandler = App.FormHandler;


(function (window) {
    'use strict';

    var FIREBASE_SERVER_URL = 'http://play-dates-b38e9.firebaseapp.com';
    
    var App = window.App;
    var Playdate = App.Playdate;
    var firebasedatastore = App.firebasedatastore;
    // var CheckList = App.CheckList;
    
    
    
    

    

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
    
    
    
    //console.log(formHandler);
})(window);