
import React, { useState } from 'react';

const ShoppingCart = ({ cart, removeFromCart, handlePayment }) => {
  const [showModal, setShowModal] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handlePayClick = () => {
    setShowModal(true);

  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}{' '}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <div>
          <p>Total: ${calculateTotal()}</p>
          <button onClick={handlePayClick}>Pay</button>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Payment Successful!</h2>
            <p>Thank you for your purchase.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
