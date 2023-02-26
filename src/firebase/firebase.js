import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyAUS18XUeQwRmeBI3lm7QTETXaN1G-IcxM",
  authDomain: "react-interview-challenges.firebaseapp.com",
  projectId: "react-interview-challenges",
  storageBucket: "react-interview-challenges.appspot.com",
  messagingSenderId: "27647234037",
  appId: "1:27647234037:web:ece129ef7486651cbd9abc",
  measurementId: "G-CNFE0KVC67"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database };
