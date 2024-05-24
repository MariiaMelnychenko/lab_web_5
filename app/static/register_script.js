import React, { useEffect } from 'react';
import './Registr.css'; // Assuming you have a CSS file named 'Registration.css'

function Registration() {
    useEffect(() => {
        const submitForm = (event) => {
            event.preventDefault();

            const formData = {
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            };

            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Registration failed');
                }
                return response.json();
            })
            .then(data => {
                //alert(data.message); // Повідомлення про успішну реєстрацію
                window.location.href = '/login'; // Переадресація на сторінку логіну
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Registration failed. Please try again.');
            });
        };

        // Cleanup function if needed
        return () => {
            // Cleanup code if needed
        };
    }, []); // Empty dependency array ensures this effect runs only once after initial render

    return (
        <div className="wrapper">
            <form id="registerForm" onSubmit={submitForm}>
                <h1>Registration</h1>
                <div className="input-box">
                    <input type="text" id="username" placeholder="Username" required />
                    <i className="bx bxs-user"></i>
                </div>

                <div className="input-box">
                    <input type="text" id="email" placeholder="Email" required />
                    <i className="bx bx-envelope"></i>
                </div>

                <div className="input-box">
                    <input type="password" id="password" placeholder="Password" required />
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

export default Registration;
