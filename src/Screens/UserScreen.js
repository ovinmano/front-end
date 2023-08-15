import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const result = await axios.get('http://localhost:5000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setUsers(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  

  const updateUser = async (id, updatedUserData) => {
    try {
      const token = localStorage.getItem('token');
  
      await axios.put(`http://localhost:5000/users/${id}`, updatedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      fetchData();
  
      console.log('User updated successfully');
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleEdit = (user) => {
    const updatedUsers = users.map((u) => {
      if (u._id === user._id) {
        return { ...u, editing: true };
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  const handleSave = (user) => {
    const { _id, name, email, phone } = user;
    const updatedUserData = { name, email, phone };
    updateUser(_id, updatedUserData);
  };

  const handleInputChange = (event, user) => {
    const { name, value } = event.target;
    const updatedUsers = users.map((u) => {
      if (u._id === user._id) {
        return { ...u, [name]: value };
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
  
      await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      fetchData();
      console.log('User deleted successfully');
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className='table-container'>
      <h2 className='tb-h2'>Users Table Screen</h2>
      <table className='bs'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>User ID</th>
            <th>Edit</th>
            <th>Delete</th>
            {/* <th>Product insert</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {user.editing ? (
                  <input
                    type='text'
                    name='name'
                    value={user.name}
                    onChange={(event) => handleInputChange(event, user)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {user.editing ? (
                  <input
                    type='text'
                    name='email'
                    value={user.email}
                    onChange={(event) => handleInputChange(event, user)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {user.editing ? (
                  <input
                    type='text'
                    name='phone'
                    value={user.phone}
                    onChange={(event) => handleInputChange(event, user)}
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td>{user._id}</td>
              <td>
                {user.editing ? (
                  <button onClick={() => handleSave(user)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(user)}>Edit</button>
                )}
              </td>
              <td>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
              {/* <td>
                <Link to="/productinsert"><button>Product insert</button></Link>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    </div>
  );
}

export default UserScreen;
