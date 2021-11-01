//listening for auth status changes
auth.onAuthStateChanged(user =>{
    var FORM_SELECTOR = '[create-playdate="form"]';
    const CARD_SELECTOR = '[create-playdate="cards"]';
    var JOINED_SELECTOR = '[joined-playdate="cards"]';
    if (user){
        console.log('logged in as: ' + user.email);
    }
    else {
        console.log('user logged out');
    }

    

    var Cards = App.Cards;
    var cards = new Cards(CARD_SELECTOR, auth.currentUser.email);
    var joinedCheckList = new Cards(JOINED_SELECTOR, auth.currentUser.email);
    cards.addClickHandler(playdate.deleteDate.bind(playdate));
    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(function(data) {
        return playdate.createDate.call(playdate, data)
            .then(function() {
                cards.addEntry.call(cards, data);
            },
            function() { 
                alert('Server unreachable. Try again later.');
            });
    });
    
    // playdate.printDates(checkList.addRow.bind(checkList));

    playdate.printDates(cards.addEntry.bind(cards));
    playdate.printDates(joinedCheckList.addEntry.bind(joinedCheckList));

})

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // getting user
    const emailAddr = signupForm['signup-email'].value;
    const pwd = signupForm['signup-password'].value;

    // console.log(emailAddr, pwd)

    //signup to firebase. is async
    auth.createUserWithEmailAndPassword(emailAddr, pwd).then(cred => {
        console.log(cred);
        const modal = document.querySelector('#modal-signup');
        
        signupForm.reset();
        history.go(0);
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) =>{
    e.preventDefault();

    auth.signOut().then(() => {
        console.log('User logged out');
        history.go(0);
    });
})

// login
const login = document.querySelector('#login-form');
login.addEventListener('submit', (e) =>{
    e.preventDefault();

    // getting user info
    const emailAddr = login['login-email'].value;
    const pwd = login['login-password'].value;


    auth.signInWithEmailAndPassword(emailAddr, pwd).then((cred) => {
        console.log(cred.user);
        const modal = document.querySelector('#modal-login');
        
        login.reset();
        console.log('User logged in');
        history.go(0);
    });
})
