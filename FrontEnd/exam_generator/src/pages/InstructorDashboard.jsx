import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CampaignIcon from "@mui/icons-material/Campaign";
import LogoutIcon from "@mui/icons-material/Logout";

const InstructorDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", backgroundColor: "#f4f6fb" }}>
      
      {/* ================= SIDEBAR ================= */}
      <Box
        sx={{
          width: 260,
          backgroundColor: "#1e293b",
          color: "white",
          padding: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
          Instructor Panel
        </Typography>

        <Button
          startIcon={<DashboardIcon />}
          sx={{ justifyContent: "flex-start", color: "white", mb: 1 }}
          onClick={() => navigate("/instructor/dashboard")}
        >
          Dashboard
        </Button>

        <Button
          startIcon={<SchoolIcon />}
          sx={{ justifyContent: "flex-start", color: "white", mb: 1 }}
          onClick={() => navigate("/instructor/courses")}
        >
          Courses
        </Button>

        <Button
          startIcon={<AssessmentIcon />}
          sx={{ justifyContent: "flex-start", color: "white", mb: 1 }}
          onClick={() => navigate("/instructor/status")}
        >
          Course Status
        </Button>

        <Button
          startIcon={<CampaignIcon />}
          sx={{ justifyContent: "flex-start", color: "white", mb: 1 }}
          onClick={() => navigate("/instructor/announce")}
        >
          Announcements
        </Button>

        <Divider sx={{ my: 2, backgroundColor: "#334155" }} />

        <Button
          startIcon={<LogoutIcon />}
          sx={{ justifyContent: "flex-start", color: "#f87171" }}
          onClick={() => navigate("/login")}
        >
          Logout
        </Button>
      </Box>

      {/* ================= MAIN CONTENT ================= */}
      <Box sx={{ flex: 1, padding: 4 }}>
        
        {/* Welcome Section */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            padding: 3,
            mb: 4,
            boxShadow: 1,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Welcome, Instructor 👋
          </Typography>
          <Typography color="text.secondary">
            Use the dashboard to quickly manage your teaching activities.
          </Typography>
        </Box>

        {/* Action Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 3,
          }}
        >
          {/* Manage Courses */}
          <Card
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/instructor/courses")}
          >
            <CardContent>
              <SchoolIcon sx={{ fontSize: 38, color: "#2563eb" }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Manage Courses
              </Typography>
              <Typography color="text.secondary">
                Create, edit and organize courses
              </Typography>
            </CardContent>
          </Card>

          {/* Course List */}
          <Card
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/instructor/courses")}
          >
            <CardContent>
              <ListAltIcon sx={{ fontSize: 38, color: "#0f766e" }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                View Course List
              </Typography>
              <Typography color="text.secondary">
                View all published courses
              </Typography>
            </CardContent>
          </Card>

          {/* Status */}
          <Card
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/instructor/status")}
          >
            <CardContent>
              <AssessmentIcon sx={{ fontSize: 38, color: "#16a34a" }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Course Status
              </Typography>
              <Typography color="text.secondary">
                Track student progress
              </Typography>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/instructor/announce")}
          >
            <CardContent>
              <CampaignIcon sx={{ fontSize: 38, color: "#ea580c" }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Announcements
              </Typography>
              <Typography color="text.secondary">
                Post updates to students
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default InstructorDashboard;
