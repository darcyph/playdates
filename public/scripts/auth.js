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
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) =>{
    e.preventDefault();

    auth.signOut().then(() => {
        console.log('User logged out');
    });
})


