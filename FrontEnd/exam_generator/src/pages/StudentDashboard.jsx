import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Data Structures",
    instructor: "Dr. Gayathri",
    image:
      "https://i.pravatar.cc/150?img=32",
    color: "#6C63FF",
  },
  {
    id: 2,
    title: "Operating Systems",
    instructor: "Prof. Glory",
    image:
      "https://i.pravatar.cc/150?img=20",
    color: "#FF6584",
  },
  {
    id: 3,
    title: "Computer Networks",
    instructor: "Dr. Muneera Begum",
    image:
      "https://i.pravatar.cc/150?img=45",
    color: "#2EC4B6",
  },
  {
    id: 4,
    title: "Java",
    instructor: "Prof. Reema",
    image:
      "https://i.pravatar.cc/150?img=10",
    color: "#F4A261",
  },
];

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleDrawer = () => setOpen(!open);
  const toggleTheme = () => setDark(!dark);

  return (
    <Box
      sx={{
        backgroundColor: dark ? "#1e1e1e" : "#f4f6ff",
        minHeight: "100vh",
        padding: "20px",
        transition: "0.3s",
      }}
    >
      {/* TOP BAR */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <MenuIcon sx={{ color: dark ? "white" : "black" }} />
        </IconButton>

        <Typography
          variant="h5"
          sx={{ color: dark ? "white" : "black", fontWeight: "bold" }}
        >
          Welcome Back, Student 🌟
        </Typography>

        <Switch checked={dark} onChange={toggleTheme} />
      </Box>

      {/* DRAWER MENU */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <Box sx={{ width: 250, padding: 2 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
          >
            Menu
          </Typography>
          <List>
            <ListItem button>
              <DashboardIcon sx={{ mr: 1 }} />
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <PersonIcon sx={{ mr: 1 }} />
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button>
              <SettingsIcon sx={{ mr: 1 }} />
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={() => navigate("/login")}>
  <LogoutIcon sx={{ mr: 1 }} />
  <ListItemText primary="Logout" />
</ListItem>

          </List>
        </Box>
      </Drawer>

      {/* COURSES GRID */}
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: 4,
                cursor: "pointer",
              }}
            >
              {/* Color Header Strip */}
              <Box sx={{ height: "70px", backgroundColor: course.color }}></Box>

              <CardContent>
                {/* Instructor Section */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar src={course.image} sx={{ width: 45, height: 45 }} />
                  <Typography sx={{ ml: 2, fontWeight: "600" }}>
                    {course.instructor}
                  </Typography>
                </Box>

                {/* Course Title */}
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {course.title}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
