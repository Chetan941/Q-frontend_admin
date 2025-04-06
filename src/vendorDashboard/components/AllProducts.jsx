import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/apiPath';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const data = await response.json();
      setProducts(data.products || []);
      console.log('Fetched Products:', data);
    } catch (error) {
      console.error("Failed to fetch products", error);
      alert('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
    console.log('useEffect triggered: fetching products');
  }, []);

  const deleteProductById = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
        alert("Product deleted successfully");
      }
    } catch (error) {
      console.error('Failed to delete product', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="productSection">
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(item => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>₹{item.price}</td>
                <td>
                  {item.image && (
                    <img
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.productName}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  )}
                </td>
                <td>
                  <button
                    onClick={() => deleteProductById(item._id)}
                    className="deleteBtn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
