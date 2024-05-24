import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Register from './Register';
import Start from './StartPage';
import ProductInfo from './ProductInfo'


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/start" element={<Start />} />
        <Route path="/tour_info" element={<ProductInfo />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
