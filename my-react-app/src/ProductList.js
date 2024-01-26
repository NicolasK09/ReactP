import React, { useState } from 'react';

const ProductsList = ({ products, addToCart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);  
  const [sortBy, setSortBy] = useState('name');  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  
  currentProducts.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'price') {
      return a.price - b.price;
    }
    return 0;
  });

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortProducts = (key) => {
    setSortBy(key);
    
    currentProducts.sort((a, b) => {
      if (key === 'name') {
        return a.name.localeCompare(b.name);
      } else if (key === 'price') {
        return a.price - b.price;
      }
      return 0;
    });
  };

  return (
    <div>
      <h2>Products</h2>
      <label>
        Sort by:
        <select onChange={(e) => sortProducts(e.target.value)}>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </label>

      {currentProducts.map((product) => (
        <div key={product.id}>
          <p>Name: {product.name}</p>
          <p>Price: ${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <hr />
        </div>
      ))}

      <div>
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
