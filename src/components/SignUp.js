import React, { useState } from 'react';
import { signInWithPopup, auth, googleProvider } from '../firebase'; // Adjusted path

const SignUp = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    location_id: '', // location_id for consistency with your backend
    role: 'CEO', // Default role
  });

  const handleGoogleSignUp = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Google sign-in
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const { displayName, email } = user;

      // Pre-fill the form with Google user data
      const firstName = displayName.split(' ')[0];
      const lastName = displayName.split(' ')[1] || ''; // If last name is missing

      setFormData({ ...formData, firstName, lastName, email });

    } catch (err) {
      setError('Google sign-up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form data to request account creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/request-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const resultData = await response.json();

      if (response.ok) {
        setSuccess(resultData.message);
      } else {
        setError(resultData.message);
      }
    } catch (err) {
      setError('Failed to request account creation. Please try again.');
    }
  };

  return (
    <div className="create-account-container">
      <h2>SignUp with Google</h2>

      {/* Google Sign-Up Button */}
      <button onClick={handleGoogleSignUp} disabled={loading}>
        {loading ? 'Signing up...' : 'Sign Up with Google'}
      </button>

      {/* Show form only after Google sign-in */}
      {formData.email && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            name="location_id"
            value={formData.location_id}
            onChange={handleChange}
            placeholder="Location ID"
            required
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="CEO">CEO</option>
            <option value="CFO">CFO</option>
            <option value="COO">COO</option>
            <option value="VERIFIER">Verifier</option>
            <option value="CO-FOUNDER">Co-Founder</option>
            <option value="COUNTRY MANAGER">Country Manager</option>
            <option value="TRAINER">Trainer</option>
            <option value="GLOBAL HEAD OF DATA & TECHNOLOG">GLOBA HEAD OF DATA & TECHNOLOGY</option>
            <option value="GLOBAL HEAD OF COMPLINCE & OPERATIONS">GLOBA HEAD OF COMPLINCE & OPERATIONS</option>
            <option value="LEAD TRAINER">LEAD TRAINER</option>
            <option value="CM ASSISTANT">CM ASSISTANT</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Request Account Creation'}
          </button>
        </form>
      )}

      {error && <p className="error-message" aria-live="assertive">{error}</p>}
      {success && <p className="success-message" aria-live="polite">{success}</p>}
    </div>
  );
};

export default SignUp;
