import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductScreen() {
  const [products, setProducts] = useState([]);
  const [editedProducts, setEditedProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await axios.get('http://localhost:5000/gets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(result.data);
      setEditedProducts(result.data.map((product) => ({ ...product })));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
      console.log('Product deleted successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (index) => {
    const updatedProducts = [...editedProducts];
    updatedProducts[index].editing = true;
    setEditedProducts(updatedProducts);
  };

  const handleSave = async (index) => {
    try {
      const editedProduct = editedProducts[index];
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/update/${editedProduct._id}`,
        editedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedProducts = [...editedProducts];
      updatedProducts[index].editing = false;
      setEditedProducts(updatedProducts);
      fetchData();
      console.log('Product updated successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedProducts = [...editedProducts];
    updatedProducts[index][name] = value;
    setEditedProducts(updatedProducts);
  };

  return (
    <div className='table-container'>
      <h2 className='tb-h2'>Product Table Screen</h2>
      <table className='bs'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Price</th>
            <th>Ram</th>
            <th>User Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {editedProducts.map((product, index) => (
            <tr key={product._id}>
              <td data-label='Name'>
                {product.editing ? (
                  <input
                    type='text'
                    name='productname'
                    value={product.productname}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                ) : (
                  product.productname
                )}
              </td>
              <td data-label='Brand'>
                {product.editing ? (
                  <input
                    type='text'
                    name='brand'
                    value={product.brand}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                ) : (
                  product.brand
                )}
              </td>
              <td data-label='Color'>
                {product.editing ? (
                  <input
                    type='text'
                    name='colour'
                    value={product.colour}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                ) : (
                  product.colour
                )}
              </td>
              <td data-label='Price'>
                {product.editing ? (
                  <input
                    type='text'
                    name='price'
                    value={product.price}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                ) : (
                  product.price
                )}
              </td>
              <td data-label='Ram'>
                {product.editing ? (
                  <input
                    type='text'
                    name='ram'
                    value={product.ram}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                ) : (
                  product.ram
                )}
              </td>
              <td data-label='User Name'>{product.userName}</td>
              <td data-label='Edit'>
                {product.editing ? (
                  <button onClick={() => handleSave(index)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(index)}>Edit</button>
                )}</td>
                <td data-label="Delete">
                  <button onClick={() => deleteProduct(product._id)}>
                  Delete
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    </div>
  );
}

export default ProductScreen;
