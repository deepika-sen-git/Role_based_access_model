import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    //     .container{
    //   border: 2px solid black;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    //   height: 100vh;
    //    border-radius: 2px solid blck
    // }

    <div className="border flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit}>
        <div className="">
          <h1>Register</h1>
          <div>
            <label htmlFor="name">Full Name </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="border"
            />
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

          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
