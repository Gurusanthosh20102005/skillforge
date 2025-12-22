import React, { useState } from "react";
import {toast} from "react-toastify";
function Basic() {
  const [form, setform] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    role: "Student"
  });

  const [errors, setErrors] = useState([]);

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let  isvalid=true;
    if (!form.name.trim()) {
      toast.error("Name is required");
      isvalid=false;
    }

    if (!form.age || isNaN(form.age)) {
       toast.error("Age must be a valid number");
       isvalid=false;
    }

    if (form.role === "Admin" && form.age < 18) {
       toast.error("Admin must be at least 18 years old");
       isvalid=false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
       toast.error("Enter a valid email");
       isvalid=false;
    }

    if (form.password.length < 6) {
       toast.error("Password must be at least 6 characters");
       isvalid=false;
    }

   return isvalid;
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.warn("Form validation failed!");
      return;
    }

    // ✔️ Save to localStorage only if no errors
    localStorage.setItem("RegisteredData", JSON.stringify(form));
    toast.success("Data saved to LocalStorage!");
    console.log(form);
  };

  return (
    <div style={{ width: "300px", margin: "20px" }}>
      <form onSubmit={handlesubmit}>
        
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handlechange}
        />

        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="text"
          name="age"
          value={form.age}
          onChange={handlechange}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          name="email"
          value={form.email}
          onChange={handlechange}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handlechange}
        />

        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={form.role}
          onChange={handlechange}
        >
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
          <option value="Instructor">Instructor</option>
        </select>

        <button type="submit" style={{ marginTop: "10px" }}>
          Submit
        </button>

        {/* Show multiple errors */}
        {errors.length > 0 && (
          <div style={{ color: "red", marginTop: "10px" }}>
            {errors.map((err, index) => (
              <div key={index}>• {err}</div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default Basic;
