import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './AuthStyle.css'; 

const Login = ({ onLoginSuccess, switchPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess(userCredential.user); // Call parent handler on successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
  type="submit"
  className="auth-button"
  style={{
    backgroundColor: '#4CAF50', // Green background
    color: 'white', // White text
    padding: '10px 20px', // Padding for size
    borderRadius: '8px', // Rounded corners
    border: 'none', // No border
    cursor: 'pointer', // Pointer cursor on hover
    fontSize: '16px', // Font size
    fontWeight: 'bold', // Bold text
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    transition: 'background-color 0.3s ease, transform 0.3s ease', // Smooth transitions
  }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = '#45a049')} // Darker green on hover
  onMouseLeave={(e) => (e.target.style.backgroundColor = '#4CAF50')} // Return to original color
  onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')} // Scale down on click
  onMouseUp={(e) => (e.target.style.transform = 'scale(1)')} // Return to original size
>
  Login
</button>
        </form>
        <button onClick={() => switchPage('register')} className="switch-button">Register</button>
      </div>
    </div>
  );
};

export default Login;
