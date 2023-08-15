import React, { useState } from 'react'
import axios from 'axios';

function RegisterScreen() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setConfirmPass] = useState('');
  const [success, setSuccess] = useState();
  // const [imurl, setImurl] = useState('');

  async function register(e) {
    e.preventDefault();
    if (password === cPassword) {
      const user = {
        name,
        email,
        // imurl,
        phone,
        password,
        cPassword
      }
      try {
        const result = (await axios.post('http://localhost:5000/register', user)).data;

        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPass('');
        // localStorage.setItem("currentUser", JSON.stringify(result));
        // localStorage.setItem("userName", result.name);
        console.log(result);
        setSuccess(true);
      } catch (error) {
        console.log(error);
      }
    }
    else{
      alert('Confirm password does not match');
    }
  }

  return (
    <div>
      <h2 className='register'>Register</h2>

      {success && <h1 style={{ color: "green" }}>Successfully Register</h1>}

      <input type='text' className='form-control' placeholder='enter name' value={name} 
      onChange={(e) => setName(e.target.value)} />

      <input type='email' className='form-control' placeholder='enter email' value={email} 
      onChange={(e) => setEmail(e.target.value)} />

      <input type='text' className='form-control' placeholder='enter phone number' value={phone}
      onChange={(e) => setPhone(e.target.value)} />

      <input type='text' className='form-control' placeholder='enter password' value={password} 
      onChange={(e) => setPassword(e.target.value)} />

      <input type='text' className='form-control' placeholder='enter confirm password' value={cPassword} 
      onChange={(e) => setConfirmPass(e.target.value)} />

      <button className='reg-btn' onClick={register}>Register</button>
    </div>
  )
}

export default RegisterScreen;