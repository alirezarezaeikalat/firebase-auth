import {auth, db} from './firestore.js';
import {setupGuides , setupUI} from './index.js';

// closign modal
function closeModal(modalId, form) {
  const modal = document.querySelector("#" + modalId);
  M.Modal.getInstance(modal).close();
  form.reset();
}

// Listen for auth status change
auth.onAuthStateChanged(user => {
  
  if(user){
    // get data 
    db.collection('guides').onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
    }, (err) => {
      console.log(err)
    })
    setupUI(user);
  }else {
    setupUI(user);
    setupGuides([]);
  }
});

// Create Form
const createForm = document.querySelector('#create-form');
const createCancel = document.querySelector("#create-cancel");

  // cancel button
createCancel.addEventListener('click', e => {
  closeModal("modal-create", createForm);
});
createForm.addEventListener('submit', (e) => {
  e.preventDefault();

  db.collection('guides').add({
    title: createForm['title'].value,
    content: createForm['content'].value
  }).then(() => {
    closeModal("modal-create", createForm);
  }).catch(err => {
    console.log(err.message);
  });
});
// sign up
const signupForm = document.querySelector('#signup-form');
const signupCancel = document.querySelector("#signup-cancel");



// signup Form

      // cancel button
signupCancel.addEventListener('click', e => {
  closeModal("modal-signup", signupForm);
});

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
    // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
    // sign up user
  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db.collection('users').doc(cred.user.uid).set({
        bio: signupForm['signup-bio'].value
      });
    }).then(() => {
      closeModal("modal-signup", signupForm);
    });
});

// logout method 
const logouts = document.querySelectorAll('#logout');
logouts.forEach(logout => {
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  })
});


// Login form
const loginForm = document.querySelector('#login-form');
const loginCancel = document.querySelector("#login-cancel");

      // cancel button
loginCancel.addEventListener('click', e => {
  closeModal("modal-login", loginForm);
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  // login with firebase
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    
    closeModal("modal-login", loginForm);
  });
});
  

