import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";
import Dashboard from "./Dashboard";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logins,setlogins] = useState(false);
  function handleLogin(e) {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No user registered!");
      return;
    }

    if (
      savedUser.name === name &&
      savedUser.email === email &&
      savedUser.password === password
    ) {
      alert("Login Successfully!");
      setlogins(true);
    } else {
      alert("Invalid Credentials");
    }
  }
if (logins) {
    return <Dashboard />; 
  }
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
        padding: 2
      }}
    >
      <Card sx={{ width: 380, padding: 2, borderRadius: 4 }} elevation={8}>
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#3f3f3f" }}
          >
            Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                mt: 2,
                py: 1.2,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "16px",
                background: "linear-gradient(135deg, #4b79a1, #283e51)"
              }}
            >
              Login
            </Button>
          </form>

          <Typography
            align="center"
            sx={{ mt: 2, fontSize: "14px", color: "#666" }}
          >
            Don't have an account?{" "}
            <a href="/register" style={{ color: "#1976d2", fontWeight: "bold" }}>
              Register
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
