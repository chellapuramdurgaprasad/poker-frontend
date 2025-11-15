import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    mobile: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // later: connect to backend API
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            name="dob"
            type="date"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="bg-green-600 py-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
