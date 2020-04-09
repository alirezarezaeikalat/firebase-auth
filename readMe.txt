1. firebase is a backend product, and you can interact with 
  firebase backend functions with firebase SDK

2. first initialize your firestore and firebase auth in firebase
    console, then set it up locally:

3. to set up firebase locally:

  <script src="https://www.gstatic.com/firebasejs/7.13.2/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/7.13.2/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/7.13.2/firebase-firestore.js"></script>
  
  <script type="module">
    // Your web app's Firebase configuration
    import firebaseConfig from './config/firebase-config.js';
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // make auth and firestore references
    const auth = firebase.auth();
    const db = firebase.firestore();
  </script>


4. we can use this function to create user in firestore:
    first get user email and password from form input then:
    // sign up user
    auth.createUserWithEmailAndPassword(email, password)
      .then(cred => {
        console.log(cred);
      });

5. to close the modal and reset the form:
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();

6. to logout in firebase use auth.signOut().then():

    const logouts = document.querySelectorAll('#logout');
    logouts.forEach(logout => {
      logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
          console.log('The user has logged out');
        });
      })
    });

7. To loggin in firebase auth we can use
   auth.signInWithEmailAndPassword(email, password).then()  :

      // first get the input field of user then:
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    console.log(cred);
    closeModal("modal-login", loginForm);
  });

8. We need to be aware of user status, for example whether
  they are logged in or logged out:

  you have to add this at the top of your js file after
  the declaration of auth object, this function sees the 
  firest initialization as a first change:

    auth.onAuthStateChanged(user => {
      if(user){
        console.log('user loggend in', user);
      }else {
        console.log('the user is logged out');
      }
    });

9. We can show the different thing based on the AuthState in UI,
  but every on can see your firebase Api and steal your data,
  so you have to make it safe in the firestore console.

  check this link:
      https://firebase.google.com/docs/firestore/security/rules-conditions?authuser=0
  
  and this one example with using firebase-auth and firestore:
    service cloud.firestore {
      match /databases/{database}/documents {
        // Allow the user to access documents in the "cities" collection
        // only if they are authenticated.
        match /cities/{city} {
          allow read, write: if request.auth.uid != null;
        }
      }
    }

10. we can show real time data to the user that logged in :
  [ATTENTION] : pay attention to the onSnapshot function,
  onSnapshot attach listener to the database, and every time
  a

  auth.onAuthStateChanged(user => {
    console.log(user);
    if(user){
      // get data 
      db.collection('guides').onSnapshot(snapshot => {
        setupGuides(snapshot.docs);
      }); 
      setupUI(user);
    }else {
      setupUI();
      setupGuides([]);
    }
});

11. We have to save additional user information in firestore, not
in firebase auth:

    auth.createUserWithEmailAndPassword(email, password)
      .then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
          bio: signupForm['signup-bio'].value
        });
      }).then(() => {
        closeModal("modal-signup", signupForm);
      });

when we use add method to make new documents, it will generate
auto id for the document, but we can use .doc(id).set({})
  [ATTENTION]
  remember this is not a good way to store additional user info
  like this, and you have to use firebase cloud functions,
  check the documentation.

12. In firestore rules, write means you can also edit, but 
  create means you can just make one.

13. We can make authorization with custom claims in firebase auth:

  we should make custom claims in server, not in the UI, because 
  it is not safe, we should make custom claims with cloud functions

    a. cloud functions run on the server
    b. Good for code you don't want to expose on the clinet
    c. Perform tasks not available to client users
    d. Callable from the front-end

14. To use firebase cloud functions we need firebase CLI :

      npm install firebase-tools -g

    after that we have to initialize cloud functions locally
    in your project:

      firebase init functions

by running this command the firebase makes some files and folders
  in our project:
    .firebaseserc: shows the project in firebase console
    .firebase.json: extra configuration for the project
    functions folder: have dependencies and cloud functions

[ATTENTION]
functions folder in just a node file that runs on the node env
when we push this file to the firebase server.

in index.js file we can require admin sdk in order to:
  a. initialize the app in server side
  b. and use services like authentication services

  const functions = require('firebase-functions');
  const admin = require('firebase-admin');
  admin.initializeApp();
