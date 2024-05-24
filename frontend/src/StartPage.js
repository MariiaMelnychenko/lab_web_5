import React, { useEffect } from 'react';
import './StartPage.css'; // Припускаю, що у вас є файл CSS з назвою 'start_style.css'

function Start() {
    useEffect(() => {
        const displayProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/get_products', {
                    method: 'GET',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error);
                }

                const products = await response.json();
                const productsContainer = document.getElementById('productsContainer');

                products.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('img-box');
                    productElement.style.backgroundImage = `url('http://127.0.0.1:5000/static/images/${product.name}.jpg')`;
                    productElement.style.backgroundSize = '100% 100%';
                    productElement.style.backgroundPosition = 'center';
                    productElement.style.borderRadius = '15px';
                    productElement.innerHTML = `<button class="buy-button" onclick="window.location.href = '/tour_info?id=${product.product_id}';">Info</button><p class="tour_name">${product.name}</p>`;
                    productsContainer.appendChild(productElement);
                });
            } catch (error) {
                //console.error('Error fetching products:', error);
            }
        };

      displayProducts();

    }, []);



    return (
        <React.Fragment>
            {/* Header section */}
            <header>
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#tours">Tours</a></li>
                        <li><a href="#services">Services</a></li>
                        {/* <li><a href="http://127.0.0.1:5000/start-account_page" id="accountButton">Account</a></li> */}
                        {/* <li><a href="/" id="LogOut">LogOut</a></li> */}
                    </ul>
                </nav>
                <div className="containerstartpage">
                    <div className="home-content">
                        <h1>Planet of Journeys</h1>
                        <h3>Explore Beyond Boundaries</h3>
                    </div>
                </div>
            </header>
            {/* Header section end */}

            {/* Tours section */}
            <section className="tours" id="tours">
                <h2 className="heading">Worldwide Tours</h2>
                <p>
                    Experience the world in all its beauty with our unique tours. From
                    thrilling adventures to luxurious getaways, we offer unforgettable
                    journeys to help you see, feel, and immerse yourself in the most
                    fascinating corners of our planet. Explore new horizons and enrich your
                    life with adventures that remain in your memory forever.
                </p>
                <div id="productsContainer" className="img-container">
                    {/* Тут будуть відображені товари */}
                </div>
            </section>
            {/* Tours section end */}

            {/* Services section */}
            <section className="services" id="services">
                <h2 className="heading">Our Services</h2>
                <div className="box-container">
                    <div className="box-item">
                        <div className="top">
                            <img src="http://127.0.0.1:5000/static/images/tours.png" alt="Tours"/>
                            <h4>Tours</h4>
                        </div>
                        <div className="text">
                            <p>
                                Discover the limitless possibilities of the world with our tour
                                service! We are ready to provide you with the most exciting trips
                                and unforgettable adventures, regardless of your destination or
                                budget. Our experts know every corner of the planet and are ready
                                to choose the perfect route for you.
                            </p>
                        </div>
                    </div>

                    <div className="box-item">
                        <div className="top">
                            <img src="http://127.0.0.1:5000/static/images/transport.png" alt="Transfer"/>
                            <h4>Transfer</h4>
                        </div>
                        <div className="text">
                            <p>
                                Ensure safe and comfortable movement with our transfer service!
                                Our professional drivers will provide you with fast and reliable
                                transportation from one point to another. Choose our transfer
                                service and relax knowing that we take care of your
                                transportation!
                            </p>
                        </div>
                    </div>

                    <div className="box-item">
                        <div className="top">
                            <img src="http://127.0.0.1:5000/static/images/earth.png" alt="Travel"/>
                            <h4>Travel</h4>
                        </div>
                        <div className="text">
                            <p>
                                Open the door to the world of adventure and discovery with our
                                travel service! We offer you not only places to visit, but also
                                unforgettable experiences that will stay with you forever. Our
                                experts are ready to help you plan every detail of your trip -
                                from choosing a destination to booking a hotel and organizing
                                excursions.
                            </p>
                        </div>
                    </div>

                    <div className="box-item">
                        <div className="top">
                            <img src="http://127.0.0.1:5000/static/images/support.png" alt="Support"/>
                            <h4>Support</h4>
                        </div>
                        <div className="text">
                            <p>
                                Our support service is your reliable partner in solving any
                                questions and problems. Our experienced specialists are available
                                to you around the clock, ready to provide quick and effective
                                assistance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Services section end */}

            {/* Footer section */}
            <section className="footer" id="footer">
                <p>&copy; 2024 website. All rights reserved.</p>
            </section>
            {/* Footer section end */}
        </React.Fragment>
    );
}

export default Start;
