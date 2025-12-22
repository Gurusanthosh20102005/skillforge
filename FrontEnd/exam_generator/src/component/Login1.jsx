import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaUser, FaSignInAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1f4068 0%, #162447 100%)",
    padding: "20px",
    fontFamily: "Arial"
  },
  formCard: {
    backgroundColor: "#fff",
    padding: "30px 40px",
    borderRadius: "15px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
    maxWidth: "420px",
    width: "95%",
    textAlign: "center"
  },
  heading: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "25px",
    color: "#222",
  },
  inputGroup: {
    marginBottom: "22px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
    paddingBottom: "6px",
  },
  inputField: {
    width: "100%",
    padding: "8px 0",
    border: "none",
    outline: "none",
    fontSize: "16px",
    backgroundColor: "transparent",
  },
  inputIcon: {
    color: "#888",
    fontSize: "18px",
    marginLeft: "10px",
    cursor: "pointer"
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  authButton: {
    width: "100%",
    padding: "15px",
    borderRadius: "50px",
    border: "none",
    color: "white",
    background: "linear-gradient(45deg, #007bff, #0056b3)",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 4px 12px rgba(0,123,255,0.4)"
  },
  link: { color: '#007bff', fontWeight: 'bold', marginLeft: '5px' }
};

const toastOptions = {
  autoClose: 3000,
  theme: "colored",
  position: "top-right",
};

const Login1 = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const validate = () => {
    const er = {};
    if (!data.email.trim()) er.email = "Email is required";
    if (!data.password.trim()) er.password = "Password required";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
        toast.error("Fill all fields!", toastOptions);
        return;
    }

    setLoading(true);

    try {
        const res = await fetch("http://localhost:8081/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            toast.error(error.message || "Invalid Credentials!", toastOptions);
            setLoading(false);
            return;
        }

       const result = await res.json();

localStorage.setItem("skillforge_token", result.token);
localStorage.setItem("skillforge_role", result.role);

toast.success("Login Successful!", toastOptions);

// Redirect
if (result.role === "Student") {
    navigate("/student/dashboard");
} else if (result.role === "Instructor") {
    navigate("/instructor/dashboard");
} else if (result.role === "Admin") {
    navigate("/admin/dashboard");
}
else navigate("/pagenotfound");
    } catch (error) {
        toast.error("Server not reachable!", toastOptions);
    }

    setLoading(false);
};

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formCard}>
        <h2 style={styles.heading}>LOGIN</h2>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div style={{
            ...styles.inputGroup,
            borderBottom: errors.email ? "1px solid red" : "1px solid #ccc"
          }}>
            <input
              style={styles.inputField}
              type="email"
              name="email"
              placeholder="Enter Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <FaUser style={styles.inputIcon} />
          </div>
          {errors.email && <div style={styles.errorText}>{errors.email}</div>}

          {/* Password */}
          <div style={{
            ...styles.inputGroup,
            borderBottom: errors.password ? "1px solid red" : "1px solid #ccc"
          }}>
            <input
              style={styles.inputField}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <div style={styles.inputIcon} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
          {errors.password && <div style={styles.errorText}>{errors.password}</div>}

          <button type="submit" style={styles.authButton} disabled={isLoading}>
            {isLoading ? "Processing..." : (
              <>
                <FaSignInAlt style={{ marginRight: "8px" }} />
                LOG IN
              </>
            )}
          </button>

        </form>

        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Don’t have an account?
          <Link to="/register" style={styles.link}>Sign Up</Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login1;
