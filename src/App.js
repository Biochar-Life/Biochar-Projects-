import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { auth, googleProvider, signInWithPopup, onAuthStateChanged } from './firebase';


function App() {
  const [user, setUser] = useState(null);

  // Check if a user is already logged in
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // Function to handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Send the Google token to your backend to verify if email exists in PostgreSQL
      const token = await user.getIdToken();
      const response = await fetch('/api/check-google-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.exists) {
        console.log('User email exists in the people table');
      } else {
        console.log('User email does NOT exist in the people table');
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
              </div>
            ) : (
              <Login onGoogleSignIn={handleGoogleSignIn} />
            )
          }
        />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
