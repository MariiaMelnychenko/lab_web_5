document.getElementById('loginForm')
    .addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        };

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Authentication failed');
                }
                return response.json();
            })
            .then(() => {
                // alert(data.message); // Повідомлення про успішний логін
                window.location.href = '/start-page'; // Переадресація на сторінку start.html
            })
            .catch(() => {
                alert('Authentication failed. Please check your email and password.'); // Повідомлення про помилку
            });
    });
