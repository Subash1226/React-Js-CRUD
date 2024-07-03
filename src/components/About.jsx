import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

export default function About() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const product_title = useRef('');
  const product_price = useRef('');
  const product_description = useRef('');
  const product_image = useRef('');
  const product_category = useRef('');

  const clearInputs = () => {
    product_title.current.value = '';
    product_price.current.value = '';
    product_description.current.value = '';
    product_image.current.value = '';
    product_category.current.value = '';
  };

  const fetchProducts = () => {
    axios.get('http://localhost:3009/toptoken')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  const submitProduct = () => {
    const postData = {
      symbol: product_title.current.value,
      name: product_price.current.value,
      color: product_description.current.value,
      marketCap: product_image.current.value,
      price: product_category.current.value
    };

    axios.post('http://localhost:3009/create', postData)
      .then((response) => {
        console.log('Product submitted successfully:', response.data);
        fetchProducts();
        clearInputs();
      })
      .catch((error) => {
        console.error('Error submitting product:', error);
      });
  };

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:3009/toptoken/${id}`)
      .then((response) => {
        console.log('Product deleted successfully:', response.data);
        fetchProducts(); // Fetch updated product list after deletion
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const updateProduct = () => {
    const updatedData = {
      symbol: product_title.current.value,
      name: product_price.current.value,
      color: product_description.current.value,
      marketCap: product_image.current.value,
      price: product_category.current.value
    };

    axios.put(`http://localhost:3009/toptoken/${selectedProductId}`, updatedData)
      .then((response) => {
        console.log('Product updated successfully:', response.data);
        fetchProducts();
        clearInputs();
        setSelectedProductId(null);
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  const selectProductForUpdate = (product) => {
    setSelectedProductId(product.id);
    product_title.current.value = product.symbol;
    product_price.current.value = product.name;
    product_description.current.value = product.color;
    product_image.current.value = product.marketCap;
    product_category.current.value = product.price;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <label htmlFor="title">Product Title </label>
      <input type="text" ref={product_title} />
      <br />
      <br />
      <label htmlFor="price">Product Price </label>
      <input type="text" ref={product_price} />
      <br />
      <br />
      <label htmlFor="description">Product Description </label>
      <input type="text" ref={product_description} />
      <br />
      <br />
      <label htmlFor="image">Product Image </label>
      <input type="text" ref={product_image} />
      <br />
      <br />
      <label htmlFor="category">Product Category </label>
      <input type="text" ref={product_category} />
      <br />
      <br />
      {selectedProductId ? (
        <button onClick={updateProduct}>Update</button>
      ) : (
        <button onClick={submitProduct}>Submit</button>
      )}
      <div>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Product Title</th>
              <th>Product Price</th>
              <th>Product Description</th>
              <th>Product Image</th>
              <th>Product Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.symbol}</td>
                <td>{product.name}</td>
                <td>{product.color}</td>
                <td>{product.marketCap}</td>
                <td>{product.price}</td>
                <td>
                  <button onClick={() => deleteProduct(product.id)}>Delete</button>
                  <button onClick={() => selectProductForUpdate(product)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
