import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp'; // Updated to SignUp;
import { auth, googleProvider, signInWithPopup, onAuthStateChanged, signOut } from './firebase';

function App() {
  const [user, setUser] = useState(null);

  // Check if a user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Function to handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      // Send the Google token to your backend to verify if the email exists in PostgreSQL
      const token = await googleUser.getIdToken();
      const response = await fetch('/api/check-google-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.exists) {
        // Email exists, allow the user to proceed
        console.log('User email exists in the people table');
        setUser(googleUser); // Set user after email is confirmed in DB
      } else {
        // Email does not exist, sign out the user and show an error message
        console.log('User email does NOT exist in the people table');
        alert('Email not found in the system. Access denied.');
        await signOut(auth); // Sign out the user if email does not exist
        setUser(null); // Reset user state to null
      }
    } catch (error) {
      console.error('Error during Google sign-in or backend validation:', error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route
          path="/"
          element={
            user ? (
              <div>
                <p>Signed in as {user.email}</p>
                {/* Optionally, add a sign-out button */}
                <button onClick={() => signOut(auth).then(() => setUser(null))}>
                  Sign Out
                </button>
              </div>
            ) : (
              <Login onGoogleSignIn={handleGoogleSignIn} />
            )
          }
        />
        {/* Route for creating a new account */}
        <Route path="/create-account" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
