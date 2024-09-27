// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDR8mt3_ZqigF60L3EcNqViK2-F_M5HSqA",
  authDomain: "biocharlife.firebaseapp.com",
  projectId: "biocharlife",
  storageBucket: "biocharlife.appspot.com",
  messagingSenderId: "245138580658",
  appId: "1:245138580658:web:1a32da10a055d5678a95ab",
  measurementId: "G-30Y1ECZC27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db, signInWithPopup, onAuthStateChanged };
