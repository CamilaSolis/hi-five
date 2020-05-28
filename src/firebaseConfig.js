import * as firebase from "firebase"
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAcxXUKi2cghm3AdvVW8XSCPWpqCEGvcoQ",
  authDomain: "brains-project.firebaseapp.com",
  databaseURL: "https://brains-project.firebaseio.com",
  projectId: "brains-project",
  storageBucket: "brains-project.appspot.com",
  messagingSenderId: "860986343494",
  appId: "1:860986343494:web:27363e1a431b3c28ac0a47"
});

// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export default app;