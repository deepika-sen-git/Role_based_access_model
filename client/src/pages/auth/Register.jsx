import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../utils/apiInstance";

export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendOtp = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // const res = await axios.post(
      //   "http://localhost:3000/api/auth/register",
      //   formData,
      // );
      const res = await apiInstance.post('/auth/register', formData);

      if (res.data.success) {
        setOtpVisible(true);
      }
      setLoading(false);

      console.log(res.data);

      alert(res.data.message);
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const verifyOtp = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // const res = await axios.post(
      //   "http://localhost:3000/api/auth/verify-otp",
      //   { email: formData.email, otp: formData.otp },
      // );
      const res = await apiInstance.post('/auth/verify-otp',  { email: formData.email, otp: formData.otp });

      setLoading(false);

      // localStorage.setItem("token", res.data.token);
      // localStorage.setItem("role", formData.role);
      console.log(res.data);

      alert(res.data.message);
      if(res.data.user.role === "doctor"){
 navigate("/doctor-detail");
      }
      else if(res.data.user.role === "patient"){
 navigate("/patient-detail");
      }
     
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h1>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="john@example.com"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        {/* OTP */}
        {otpVisible && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              OTP
            </label>
            <input
              type="text"
              name="otp"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
        )}

        {/* Role */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Register as
          </label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="doctor"
                onChange={handleChange}
                className="accent-blue-600"
                required
              />
              <span>Doctor</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="patient"
                onChange={handleChange}
                className="accent-blue-600"
                required
              />
              <span>Patient</span>
            </label>
          </div>
        </div>

        {/* Button */}
        {!otpVisible &&  <button
          onClick={sendOtp}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "loading..." : "Create Account"}
        </button>}

       { otpVisible && <button
          onClick={verifyOtp}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "loading..." : "Submit"}
        </button> }
      </form>
    </div>
  );
};
