import React, { useState } from 'react';
import axios from 'axios';

function ProductInserScreen() {
  const [productname, setProductName] = useState('');
  const [brand, setProductBrand] = useState('');
  const [colour, setProductColour] = useState('');
  const [price, setProductPrice] = useState('');
  const [ratings, setProductRating] = useState('');
  const [offers, setProductOffers] = useState('');
  const [ram, setProductRam] = useState('');

  async function addProduct(e) {
    e.preventDefault();
    const newProduct = {
      productname,
      brand,
      colour,
      price,
      ratings,
      offers,
      ram
    };

    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');

      // Include the token in the request headers
      const response = await axios.post('http://localhost:5000/insert', newProduct, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data);
      setProductName("");
      setProductBrand("");
      setProductColour("");
      setProductPrice("");
      setProductRating("");
      setProductOffers("");
      setProductRam("");
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Product Insert</h2>
      <input type="text" className="form-control" placeholder="enter product name" value={productname} onChange={(e) => setProductName(e.target.value)} />
      <input type="text" className="form-control" placeholder="enter brand" value={brand} onChange={(e) => setProductBrand(e.target.value)} />
      <input type="text" className="form-control" placeholder="enter product colour" value={colour} onChange={(e) => setProductColour(e.target.value)} />
      <input type="text" className="form-control" placeholder="enter product price" value={price} onChange={(e) => setProductPrice(e.target.value)} />
      <input type="text" className="form-control" placeholder="enter product ratings" value={ratings} onChange={(e) => setProductRating(e.target.value)} />
      <input type="text" className="form-control" placeholder="enter product offers" value={offers} onChange={(e) => setProductOffers(e.target.value)} />
      <input type="text" className="form-control" placeholder="enter product ram" value={ram} onChange={(e) => setProductRam(e.target.value)} />
      <button className="reg-btn" onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default ProductInserScreen;
