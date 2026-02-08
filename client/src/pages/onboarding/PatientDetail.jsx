import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../utils/apiInstance";

export const PatientDetail = () => {
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 
  const [patientDetail, setPatientDetail] = useState({
    medicalHistory: "",
    age: "",
    gender: "",
    address: "",
    nationality: ""
  });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setPatientDetail({
      ...patientDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      // const res = await axios.post(
      //   "http://localhost:3000/api/user/patient-detail",
      //    patientDetail,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // );
      const res = await apiInstance.post("/user/patient-detail", patientDetail)
     if (!res.data.success) {
        setLoading(false); 
        return alert(res.data.message)
     }
      setLoading(false); 
      console.log(res.data);
      
      localStorage.setItem("role", "patient");
      localStorage.setItem("isAuthenticated", true);
      navigate("/patient-dashboard"); 
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false); 
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Patient Detail
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Medical History
          </label>
          <input
            type="text"
            name="medicalHistory"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Age
          </label>
          <input
            type="number"
            name="age"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleChange}
              className="accent-blue-600"
              required
            />
            <span>MALE</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
              className="accent-blue-600"
              required
            />
            <span>FEMALE</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="other"
              onChange={handleChange}
              className="accent-blue-600"
              required
            />
            <span>OTHERS</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Nationality
          </label>
          <input
            type="text"
            name="nationality"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
