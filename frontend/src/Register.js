import React, { useState } from 'react';
import './Login.css'; // Припускаю, що у вас є файл CSS з назвою 'Registration.css'

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            username: username,
            email: email,
            password: password
        };
        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            const userData = await response.json();
            console.log(userData);
            window.location.href = '/login';

        }catch(error) {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="wrapper ">
            <form id="registerForm" onSubmit={handleSubmit}>
                <h1>Registration</h1>
                <div className="input-box">
                    <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <i className="bx bxs-user"></i>
                </div>

                <div className="input-box">
                    <input type="text" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <i className="bx bx-envelope"></i>
                </div>

                <div className="input-box">
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <i className="bx bxs-lock-alt"></i>
                </div>

                <button type="submit" className="login">Sign Up</button>

                <div className="register-link">
                    <p>Do you have an account? <a href="/login">Login</a></p>
                </div>
            </form>
        </div>
    );
}

export default Register;
