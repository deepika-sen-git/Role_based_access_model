import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
   const [formData, setFormData] = useState({
      email: "",
      password:""
    });
  
    const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData, "formData");
      
      const res = await axios.post("http://localhost:3000/login", formData);
      console.log(res);
      localStorage.setItem('token', res.data.token);
      navigate("/profile");

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
       
        <div>
          <label htmlFor="email">Email </label>
          <input type="text" name="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input type="text" name="password" onChange={handleChange} />
        </div>
      
      <button type="submit">
        Login
      </button>
      </form>
    </>
  )
}
