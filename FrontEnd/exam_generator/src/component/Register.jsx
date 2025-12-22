import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    address: "",
    phone: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(form));
    alert("Registered Successfully!");
    window.location.href = "/login";
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, lightpink 0%, #2575fc 100%)",
        padding: "20px"
      }}
    >
      <div
        className="card p-4 shadow-lg border-0"
        style={{
          width: "380px",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.85)",
        }}
      >
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#4b4b4b" }}>
          Create Account
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control rounded-4"
              id="name"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control rounded-4"
              id="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control rounded-4"
              id="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control rounded-4"
              id="age"
              placeholder="Age"
              name="age"
              onChange={handleChange}
            />
            <label htmlFor="age">Age</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control rounded-4"
              id="address"
              placeholder="Address"
              name="address"
              onChange={handleChange}
            />
            <label htmlFor="address">Address</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="tel"
              className="form-control rounded-4"
              id="phone"
              placeholder="Phone"
              name="phone"
              onChange={handleChange}
            />
            <label htmlFor="phone">Phone</label>
          </div>

          {/* Animated button */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 rounded-4 fw-semibold"
            style={{
              background: "linear-gradient(135deg, #4b79a1, #283e51)",
              border: "none",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Register
          </button>
        </form>

        <p className="text-center mt-3" style={{ fontSize: "14px", color: "#555" }}>
          Already have an account? <a href="/login" className="text-primary fw-bold">Login</a>
        </p>
      </div>
    </div>
  );
}
