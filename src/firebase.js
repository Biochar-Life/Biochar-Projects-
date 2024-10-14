import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

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

// Configure Google Provider
const googleProvider = new GoogleAuthProvider();
// Optional: Add custom scopes if needed
// googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const db = getFirestore(app);

// Optional: Initialize analytics if needed
if (typeof window !== 'undefined') {
  getAnalytics(app);
}

// Export all necessary Firebase functionalities
export { auth, googleProvider, db, signInWithPopup, onAuthStateChanged, signOut };
