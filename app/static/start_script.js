document.addEventListener('DOMContentLoaded', () => {
    /* document.getElementById('deleteAccountButton').addEventListener('click', function() {
         deleteAccount();
     }); */

    /* document.getElementById('accountButton').addEventListener('click', function() {
       // Отримати id користувача і перейти на сторінку акаунта
       getUserId().then(userId => {
           if (userId !== null) {
               window.location.href = `/start-account_page`;
           }
       });
    }); */

    document.getElementById('logoutButton')
        .addEventListener('click', () => {
            logout();
        });

    // функція для відображення товарів при завантаженні сторінки
    displayProducts();
});

// Додана функція для отримання id користувача
function getUserId() {
    return fetch('/get_user_id', {
        method: 'GET',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Get user id failed');
            }
            return response.json();
        })
        .then((data) => {
            const userId = data.user_id;

            if (userId) {
                // alert('User id retrieved successfully');
                return userId;
            }
            alert('User id not available.');
            return null;
        })
        .catch((error) => {
            console.error('Error getting user id:', error);
            // alert('Failed to get user id.');
            return null;
        });
}

// JavaScript-функція для виклику logout
function logout() {
    // const confirmation = confirm('Are you sure you want to sig out?');
    fetch('/logout', {
        method: 'POST',
    })
        .then((response) => {
            if (!response.ok) {
                // throw new Error('Logout failed');
            }
            return response.json();
        })
        .then(() => {
            // alert(data.message);
            window.location.href = '/';
        })
        .catch(() => {
            // alert('Logout failed.');
        });
}

// JavaScript-функція для отримання та відображення товарів
function displayProducts() {
    fetch('/get_products', {
        method: 'GET',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            return response.json();
        })
        .then((products) => {
            const productsContainer = document.getElementById('productsContainer');
            products.forEach((product) => {
                const productElement = document.createElement('div');
                productElement.classList.add('img-box');
                productElement.style.backgroundImage = `url('../static/images/${product.name}.jpg')`;
                productElement.style.backgroundSize = '100% 100%';
                productElement.style.backgroundPosition = 'center';
                productElement.style.borderRadius = '15px';
                productElement.innerHTML = `<button class="buy-button" onclick="window.location.href = '/tour_info?id=${product.product_id}';">Info</button><p class="tour_name">${product.name}</p>`;

                productsContainer.appendChild(productElement);
            });
        })
        .catch((error) => {
            console.error('Error fetching products:', error);
        });
}

// function placeOrder(productId, availableQuantity) {
//     // Відправити запит на сервер для оформлення замовлення
//     fetch('/place_order', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             product_id: productId,
//             units: 1,
//             available_quantity: availableQuantity,
//         }),
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('Failed to place order');
//             }
//             return response.json();
//         })
//         .then((data) => {
//             // alert(data.message);
//             location.reload(); // Це оновить сторінку
//         })
//         .catch((error) => {
//             alert('Failed to place order.');
//             console.error('Error placing order:', error);
//         });
// }
