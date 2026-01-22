import React from "react";
import { useState } from "react";
import axios from "axios";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    time: "",
    date: "",
    role: "",
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
      
      const res = await axios.post("http://localhost:3000/register", formData);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Register as Patient</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name </label>
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email </label>
          <input type="text" name="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input type="text" name="password" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="phone">Phone </label>
          <input
            type="number"
            id="phone"
            name="phone"
            maxLength={15}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="time">Time </label>
          <select id="time" name="time" onChange={handleChange}>
            <option value="6-9AM">6-9AM</option>
            <option value="9AM-12PM">9AM-12PM</option>
            <option value="12-3PM">12-3PM</option>
            <option value="3-6PM">3-6PM</option>
            <option value="6-9PM">6-9PM</option>
            <option value="9PM-12AM">9PM-12AM</option>
            <option value="12AM-3AM">12AM-3AM</option>
            <option value="3-6AM">3-6AM</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Date </label>
          <input type="date" name="date" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="role">Register as </label>
          <input
            type="radio"
            id="doctor"
            name="role"
            value={"doctor"}
            onChange={handleChange}
          />
          <label htmlFor="role">Doctor</label>
          <input
            type="radio"
            id="patient"
            name="role"
            value={"patient"}
            onChange={handleChange}
          />
          <label htmlFor="role">Patient</label>
        </div>

      <button type="submit">
        Submit
      </button>
      </form>
    </>
  );
};
