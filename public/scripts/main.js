(function (window) {
    'use strict';
    var FORM_SELECTOR = '[create-playdate="form"]';
    var CHECKLIST_SELECTOR = '[create-playdate="checklist"]';
    var JOINED_SELECTOR = '[joined-playdate="checklist"]';
    var FIREBASE_SERVER_URL = 'http://play-dates-b38e9.firebaseapp.com';
    
    var App = window.App;
    var Playdate = App.Playdate;
    var firebasedatastore = App.firebasedatastore;
    
    
    

    var datastore = new firebasedatastore(FIREBASE_SERVER_URL);
    var playdate = new Playdate('test', datastore);
    window.playdate = playdate;

    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;
    
    var checkList = new CheckList(CHECKLIST_SELECTOR, auth);
    var joinedCheckList = new CheckList(JOINED_SELECTOR, auth);
    checkList.addClickHandler(playdate.deleteDate.bind(playdate));
    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(function(data) {
        return playdate.createDate.call(playdate, data)
            .then(function() {
                checkList.addRow.call(checkList, data);
            },
            function() { 
                alert('Server unreachable. Try again later.');
            });
    });
    
    playdate.printDates(checkList.addRow.bind(checkList));
    playdate.printDates(joinedCheckList.addRow.bind(joinedCheckList));
    
    //console.log(formHandler);
})(window);