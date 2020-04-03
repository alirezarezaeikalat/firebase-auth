1. firebase is a backend product, and you can interact with 
  firebase backend functions with firebase SDK

2. to set up firebase locally:

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

3. we can use this function to create user in firestore:
    first get user email and password from form input then:
    // sign up user
    auth.createUserWithEmailAndPassword(email, password)
      .then(cred => {
        console.log(cred);
      });

4. to close the modal and reset the form:
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();