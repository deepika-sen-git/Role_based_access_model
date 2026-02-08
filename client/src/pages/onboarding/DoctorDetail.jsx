import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../utils/apiInstance";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const DoctorDetail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [doctorDetail, setDoctorDetail] = useState({
    specialization: "",
    degree: "",
    fees: "",
    availableDays: [],
    slots: [{ startTime: "", endTime: "" }],
  });

  // Normal input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetail((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle day
  const toggleDay = (day) => {
    setDoctorDetail((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  // Slot input change
  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...doctorDetail.slots];
    updatedSlots[index][field] = value;

    setDoctorDetail((prev) => ({
      ...prev,
      slots: updatedSlots,
    }));
  };

  // Add slot
  const addSlot = () => {
    setDoctorDetail((prev) => ({
      ...prev,
      slots: [...prev.slots, { startTime: "", endTime: "" }],
    }));
  };

  // Remove slot
  const removeSlot = (index) => {
    setDoctorDetail((prev) => ({
      ...prev,
      slots: prev.slots.filter((_, i) => i !== index),
    }));
  };

  // Validation + submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (doctorDetail.availableDays.length === 0) {
      return setError("Please select at least one available day");
    }

    setError("");
    setLoading(true);
    console.log("doctorDetail", doctorDetail);
    try {

      
      const res = await apiInstance.post(
        "/user/doctor-detail",
        doctorDetail
      );

      if (!res.data.success) {
        return alert(res.data.message);
      }
       localStorage.setItem("role", "doctor");
       localStorage.setItem("isAuthenticated", true);

      navigate("/doctor-dashboard");
    } catch (err) {
      console.log(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-lg"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Doctor Details
        </h2>

        <input
          name="specialization"
          placeholder="Specialization"
          onChange={handleChange}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          name="degree"
          placeholder="Degree"
          onChange={handleChange}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          type="number"
          name="fees"
          placeholder="Consultation Fees"
          onChange={handleChange}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />

        {/* Available Days */}
        <p className="font-medium mb-2">Available Days</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`px-3 py-1 border rounded text-sm
                ${
                  doctorDetail.availableDays.includes(day)
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
            >
              {day}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        {/* Slots */}
        <p className="font-medium mb-2">Time Slots</p>

        {doctorDetail.slots.map((slot, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="time"
              value={slot.startTime}
              onChange={(e) =>
                handleSlotChange(index, "startTime", e.target.value)
              }
              required
              className="w-1/2 border px-2 py-1 rounded"
            />
            <input
              type="time"
              value={slot.endTime}
              onChange={(e) =>
                handleSlotChange(index, "endTime", e.target.value)
              }
              required
              className="w-1/2 border px-2 py-1 rounded"
            />

            {doctorDetail.slots.length > 1 && (
              <button
                type="button"
                onClick={() => removeSlot(index)}
                className="text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addSlot}
          className="text-blue-600 text-sm mb-4"
        >
          + Add Slot
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
