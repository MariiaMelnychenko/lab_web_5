import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const userData = await response.json();
      console.log(userData);
      window.location.href = '/start';
      // Handle successful login, e.g., redirect to another page
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle login failure, e.g., display an error message to the user
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //
  //   const formData = {
  //     email: email,
  //     password: password,
  //   };
  //
  //   axios.post('/login', formData)
  //     .then((response) => {
  //       // Ваша логіка для успішного логіну
  //       // Наприклад, переадресація на сторінку після логіну
  //       window.location.href = '/start-page';
  //     })
  //     .catch((error) => {
  //       // Обробка помилок аутентифікації
  //       if (error.response) {
  //         alert('Authentication failed. Please check your email and password.');
  //       } else {
  //         console.error('Error during login:', error.message);
  //         alert('An error occurred during login. Please try again later.');
  //       }
  //     });
  // };

  return (
    <div className="wrapper">
      <form id="loginForm" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i className="bx bx-envelope"></i>
        </div>

        <div className="input-box">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <button className="login" type="submit">Sign In</button>
      </form>

      <div className="register-link">
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
}

export default Login;
