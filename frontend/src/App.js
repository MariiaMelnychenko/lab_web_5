import React from 'react';
import './Home.css';


function App() {
  const redirectToRegister = () => {
    window.location.href = '/register';
  };

  const redirectToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <h2>Choice of action</h2>
      <a className="register" href="#" onClick={redirectToRegister}>Sign up</a>
      <a className="login" href="#" onClick={redirectToLogin}>Sign in</a>
    </div>
  );
}

export default App;
