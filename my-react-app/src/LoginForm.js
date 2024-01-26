import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      
      const response = await fetchLogin(username, password);

      
      setLoginSuccess(true);
      setLoginError(null);

      console.log('You logged in succesfully!!', response);
    } catch (error) {

      setLoginSuccess(false);
      setLoginError('You logged in succesfully!!!');

      console.error('Error', error);
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>

      {loginError && <p style={{ color: 'green' }}>{loginError}</p>}
      {loginSuccess && <p style={{ color: 'green' }}>Sign In was done succesfully!!!</p>}
    </div>
  );
};


const fetchLogin = async (username, password) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Error, your password or username are incorrects');
  }

  return response.json();
};

export default LoginForm;
