document.addEventListener('DOMContentLoaded', () => {
    displayUserInfo();
    showOrders(); // Load and display orders when the page loads
});

function deleteAccount() {
    const confirmation = confirm('Are you sure you want to delete your account?');
    if (confirmation) {
        fetch('/delete_account', {
            method: 'POST',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Delete account failed');
                }
                return response.json();
            })
            .then((data) => {
                // alert(data.message);
                window.location.href = '/'; // Redirect to the main page
            })
            .catch((error) => {
                alert('Delete account failed.');
            });
    }
}

function displayUserInfo() {
    fetch('/get_user_info', {
        method: 'GET',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to get user info');
            }
            return response.json();
        })
        .then((userInfo) => {
            const userInfoContainer = document.getElementById('userInfo');
            userInfoContainer.innerHTML = `<p>Username: ${userInfo.username} <button class="changeButton" onclick="changeUsername()">Change Name</button></p><p>Email: ${userInfo.email} <button class="changeButton" onclick="changeEmail()">Change Email</button></p><p><button class="deleteAccountButton" onclick="deleteAccount()">Delete account</button></p>`;
        })
        .catch((error) => {
            console.error('Error getting user info:', error);
        });
}

function changeUsername() {
    const newUsername = prompt('Enter new username:');
    if (newUsername !== null && newUsername !== '') {
        sendChangeRequest('change_username', { newUsername });
    }
}

function changeEmail() {
    const newEmail = prompt('Enter new email:');
    if (newEmail !== null && newEmail !== '') {
        sendChangeRequest('change_email', { newEmail });
    }
}

function sendChangeRequest(endpoint, data) {
    fetch(`/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to change ${endpoint}`);
            }
            return response.json();
        })
        .then((result) => {
            // alert(result.message);
            displayUserInfo();
        })
        .catch((error) => {
            console.error(`Error changing ${endpoint}:`, error);
        });
}

function showOrders() {
    fetch('/get_user_orders', {
        method: 'GET',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch user orders');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Received data:', data);
            const ordersContainer = document.getElementById('orderList');
            ordersContainer.innerHTML = ''; // Clear the container

            if (data.orders && data.orders.length > 0) {
                data.orders.forEach((order) => {
                    const orderElement = document.createElement('div'); // Use a div container for each order
                    orderElement.innerHTML = `
                                <p>Name: ${order.name}, Status: ${order.status}</p>
                                <button class="deleteButton centeredButton" onclick="deleteOrder(${order.order_id})">Delete</button>
                            `;
                    ordersContainer.appendChild(orderElement);
                });
            } else {
                const noOrdersElement = document.createElement('p');
                noOrdersElement.textContent = 'No orders available.';
                ordersContainer.appendChild(noOrdersElement);
            }

            // Display immediately after receiving data
            ordersContainer.style.display = 'block';
        })
        .catch((error) => {
            console.error('Error fetching user orders:', error);
            alert('Failed to fetch user orders.');
        });
}

function deleteOrder(orderId) {
    const confirmation = confirm('Are you sure you want to delete this order?');
    if (confirmation) {
        fetch(`/delete_order/${orderId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete order');
                }
                return response.json();
            })
            .then((result) => {
                // alert(result.message);
                showOrders(); // Reload orders after deletion
            })
            .catch((error) => {
                console.error('Error deleting order:', error);
                alert('Failed to delete order.');
            });
    }
}

function goBack() {
    window.location.href = '/start-page';
}
