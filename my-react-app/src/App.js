import React, { useState } from 'react';
import Home from './Home.js';
import ProductsList from './ProductList.js';
import Products from './Products.js';
import ShoppingCart from './ShoppingCart.js';
import RegisterForm from './RegisterForm.js';
import LoginForm from './LoginForm.js';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [products] = useState([
    { id: 1, name: 'Real Madrid Adidas shirt season 2023/24', price: 80 },
    { id: 2, name: 'Napoli shirt EA7 season 2023/24', price: 70 },
    { id: 3, name: 'Argentina World Cup Champions Adidas Shirt season 2022/23', price: 100 },
    { id: 4, name: 'Manchester City Puma shirt season 2023/24', price: 90 },
    { id: 5, name: 'FC Barcelona Nike shirt season 2023/24', price: 75 },
    { id: 6, name: 'France World Cup 2022 Nike shirt season 2022/23', price: 60 },
  ]);

  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [currentView, setCurrentView] = useState('home');
 
  const navigateTo = (view) => {
    setCurrentView(view);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    setTotalPrice(totalPrice + product.price);
  };

  const removeFromCart = (productId) => {
    const removedProduct = cart.find((item) => item.id === productId);
    if (removedProduct) {
      const updatedCart = cart.filter((item) => item.id !== productId);
      setCart(updatedCart);
      setTotalPrice(totalPrice - removedProduct.price);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Registering user:', registerData);
    setRegisterData({
      username: '',
      email: '',
      password: '',
    });
 
    setCurrentView('login');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in user:', loginData);
    setLoginData({
      email: '',
      password: '',
    });
  };

  const handlePayment = () => {
    setPaymentStatus(true);
  };

  let currentComponent;

  switch (currentView) {
    case 'home':
      currentComponent = <Home />;
      break;
    case 'products':
      currentComponent = <ProductsList products={products} addToCart={addToCart} />;
      break;
    case 'cart':
      currentComponent = <ShoppingCart
        cart={cart}
        total={paymentStatus ? `Total Amount: $${totalPrice}` : ''}
        removeFromCart={removeFromCart}
        handlePayment={handlePayment}
      />;
      break;
    case 'register':
      currentComponent = <RegisterForm
        registerData={registerData}
        setRegisterData={setRegisterData}
        handleRegisterSubmit={handleRegisterSubmit}
        navigateToLogin={() => setCurrentView('login')}
      />;
      break;
    case 'login':
      currentComponent = <LoginForm
        loginData={loginData}
        setLoginData={setLoginData}
        handleLoginSubmit={handleLoginSubmit}
      />;
      break;
    default:
      currentComponent = <Home />;
  }

  return (
    <div>
      <header>
        <h1>Football Online Store</h1>
        <nav>
          <ul>
            <li onClick={() => navigateTo('home')}>Home</li>
            <li onClick={() => navigateTo('products')}>Products</li>
            <li onClick={() => navigateTo('cart')}>Shopping Cart</li>
            <li onClick={() => navigateTo('register')}>Register</li>
            <li onClick={() => navigateTo('login')}>Sign In</li>
          </ul>
        </nav>
      </header>

      {currentComponent}
    </div>
  );
};

export default App;
