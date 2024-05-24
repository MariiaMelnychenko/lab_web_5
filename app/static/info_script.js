document.addEventListener('DOMContentLoaded', function () {
    var searchParams = new URLSearchParams(window.location.search);
    var productId = searchParams.get('id');
    var productInfoContainer = document.getElementById('product-info-container');
    var productImgContainer = document.getElementById('product-img-container');
    var productButtonContainer = document.getElementById('product-buttons-container');

    // Вибираємо body
    var body = document.querySelector('body');

    fetch('/get_product_info/' + productId)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                productInfoContainer.innerHTML = '<p>' + data.error + '</p>';
                productImgContainer.innerHTML = '<p>' + data.error + '</p>';
            } else {
                // Оновлюємо фонове зображення body з отриманими даними
                body.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../static/images/${data.name}.jpg") no-repeat center/cover`;

                // Оновлений HTML код з використанням отриманих даних
                productImgContainer.innerHTML = `
            <div class="product-img">
            <img src="/static/images/${data.name}.jpg" height="420" width="327" />
          </div>
        `;
                let details,
                    full_name;

                switch (data.name) {
                case 'Japan':
                    details = 'Embark on an unforgettable adventure<br /> \n' +
                        '            through the land of the rising sun,<br /> \n' +
                        '            where ancient traditions blend seamlessly<br /> \n' +
                        '            with modern innovation.';
                    full_name = 'Exotic Japan Expedition';
                    break;
                case 'Brazilian':
                    details = 'Feel the pulsating beats of Brazil\'s<br /> \n' +
                        '            vibrant music scene as you dance your<br /> \n' +
                        '            way through the country\'s lively cities<br /> \n' +
                        '            and pristine beaches.';
                    full_name = 'Brazilian Rhythms Adventure';
                    break;
                case 'France':
                    details = 'Let yourself be enchanted by the timeless<br /> \n' +
                        '            beauty of France, where every cobblestone<br /> \n' +
                        '            street and historic landmark tells a story of<br /> \n' +
                        '            romance and sophistication.';
                    full_name = 'Enchanting France Tour';
                    break;
                case 'Greece':
                    details = 'Immerse yourself in the rich tapestry<br /> \n' +
                        '            of Greek culture as you explore ancient<br /> \n' +
                        '            ruins, savor traditional delicacies, and soak<br /> \n' +
                        '            in the breathtaking beauty of the Aegean Sea.';
                    full_name = 'Cultural Odyssey in Greece';
                    break;
                case 'Ireland':
                    details = 'Discover the emerald-green landscapes<br /> \n' +
                        '            and mythical charm of Ireland, where rolling<br /> \n' +
                        '            hills, ancient castles, and friendly locals<br /> \n' +
                        '            await to enchant you at every step.';
                    full_name = 'Ireland\'s Emerald Wonders';
                    break;
                case 'Italy':
                    details = 'Embark on a journey through Italy\'s iconic<br /> \n' +
                        '            cities and picturesque countryside, where<br /> \n' +
                        '            ancient ruins, Renaissance art, and delectable<br /> \n' +
                        '            cuisine await at every turn.';
                    full_name = 'Classic Italy Discovery';
                    break;
                case 'Norway':
                    details = 'Surrender to the spellbinding allure<br /> \n' +
                        '            of Norway\'s majestic fjords, where<br /> \n' +
                        '            nature\'s grandeur unfolds in breathtaking<br /> \n' +
                        '            landscapes and scenic vistas.';
                    full_name = 'Magic of Norway and Fjords';
                    break;
                case 'Spain':
                    details = 'Experience the warmth of the Spanish sun as you <br />\n' +
                        '            explore the rich cultural heritage of Spain\'s<br />\n' +
                        '            vibrant cities and picturesque coastlines.';
                    full_name = 'Sun and Sand in Spain';
                    break;
                default:
                    details = 'Details are not available at this time';
                }

                productInfoContainer.innerHTML = `
          <div class="product-info">
            <a href="http://localhost:3000/start" class="back-button">Home</a>
            <div class="product-text">
              <h1>${data.name}</h1>
              <h2>${full_name}</h2>
              <p>${details}</p>
            </div>
            <div class="product-price-btn">
              <p><span>${data.price}</span>$</p>
              <button type="button" onclick="placeOrder(${productId}, ${data.available_quantity})">Buy now</button>
            </div>
          </div>
        `;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            productInfoContainer.innerHTML = '<p>Failed to fetch product information.</p>';
        });
});

function placeOrder(productId, availableQuantity) {
    // Спитати користувача, чи він точно хоче купити
    if (confirm('Are you sure you want to place the order?')) {
        // Відправити запит на сервер для оформлення замовлення
        fetch('/place_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_id: productId,
                units: 1,
                available_quantity: availableQuantity
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to place order');
                }
                return response.json();
            })
            .then(data => {
                //alert(data.message);
                location.reload();
                window.location.href = '/start-page#tours';
            })
            .catch(error => {
                alert('Failed to place order.');
                console.error('Error placing order:', error);
            });
    } else {
        // Якщо користувач відмовився від покупки, нічого не робимо
    }
}


