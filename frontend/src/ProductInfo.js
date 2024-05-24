import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductInfo.css';
const ProductInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('id');
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/get_product_info/${productId}`);
        const data = await response.json();
        setProductData(data);
         // Dynamically update the product image container's inner HTML
        const productImgContainer = document.querySelector('.product-img');
        productImgContainer.innerHTML = `
          <div class="product-img">
            <img src="http://127.0.0.1:5000/static/images/${data.name}.jpg" height="420" width="327" />
          </div>
        `;
      } catch (error) {
        console.error('Error fetching product info:', error);
      }
    }
    fetchData();
  }, [productId]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  const { name, price, available_quantity } = productData;

  const handleOrder = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/place_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          units: 1,
          available_quantity: available_quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      await response.json();
      alert('Order placed successfully!');
      navigate('/start#tours');
    } catch (error) {
      alert('Order placed successfully!');
      navigate('/start#tours');
    }
  };

  let details = '';
  let full_name = '';

  switch (name) {
    case 'Japan':
      details = 'Embark on an unforgettable adventure through the land of the rising sun, where ancient traditions blend seamlessly with modern innovation.';
      full_name = 'Exotic Japan Expedition';
      break;
    case 'Brazilian':
      details = 'Feel the pulsating beats of Brazil\'s vibrant music scene as you dance your way through the country\'s lively cities and pristine beaches.';
      full_name = 'Brazilian Rhythms Adventure';
      break;
    case 'France':
      details = 'Let yourself be enchanted by the timeless beauty of France, where every cobblestone street and historic landmark tells a story of romance and sophistication.';
      full_name = 'Enchanting France Tour';
      break;
    case 'Greece':
      details = 'Immerse yourself in the rich tapestry of Greek culture as you explore ancient ruins, savor traditional delicacies, and soak in the breathtaking beauty of the Aegean Sea.';
      full_name = 'Cultural Odyssey in Greece';
      break;
    case 'Ireland':
      details = 'Discover the emerald-green landscapes and mythical charm of Ireland, where rolling hills, ancient castles, and friendly locals await to enchant you at every step.';
      full_name = 'Ireland\'s Emerald Wonders';
      break;
    case 'Italy':
      details = 'Embark on a journey through Italy\'s iconic cities and picturesque countryside, where ancient ruins, Renaissance art, and delectable cuisine await at every turn.';
      full_name = 'Classic Italy Discovery';
      break;
    case 'Norway':
      details = 'Surrender to the spellbinding allure of Norway\'s majestic fjords, where nature\'s grandeur unfolds in breathtaking landscapes and scenic vistas.';
      full_name = 'Magic of Norway and Fjords';
      break;
    case 'Spain':
      details = 'Experience the warmth of the Spanish sun as you explore the rich cultural heritage of Spain\'s vibrant cities and picturesque coastlines.';
      full_name = 'Sun and Sand in Spain';
      break;
    default:
      details = 'Details are not available at this time';
      full_name = 'Unknown Tour';
      break;
  }

  return (
    <div className="wrapperfortour">
      <div id="product-img-container" className="product-img">
        {/* <img src={`http://127.0.0.1:5000/static/images/${name}.jpg`} alt={name} height="420" width="327" /> */}
      </div>
      <div id="product-info-container" className="product-info">
        <div className="product-text">
          <h1>{name}</h1>
          <h2>{full_name}</h2>
          <p>{details}</p>
        </div>
        <div className="product-price-btn">
          <p><span>{price}</span>$</p>
          <button type="button" onClick={handleOrder}>Buy now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
