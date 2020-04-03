import {auth, db} from './firestore.js';
// sign up
const signupForm = document.querySelector('#signup-form');
const cancelButton = document.querySelector("#signup-cancel");

// cancel button
cancelButton.addEventListener('click', e => {
  const modal = document.querySelector("#modal-signup");
  M.Modal.getInstance(modal).close();
  signupForm.reset();
});

// signup submit
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  // sign up user
  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      console.log(cred.user);
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    });
});