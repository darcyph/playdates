//listening for auth status changes
auth.onAuthStateChanged(user =>{
    if (user){
        console.log('logged in as: ' + user.email);
    }
    else {
        console.log('user logged out');
    }
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
