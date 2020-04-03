// Your web app's Firebase configuration
import firebaseConfig from "../config/firebase-config.js";
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();
export { auth, db };
