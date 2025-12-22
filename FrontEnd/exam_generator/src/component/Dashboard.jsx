import React from "react";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";

export default function Dashboard() {
  const user = {
    name: "Kavya Suresh",
    points: 120
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f6fa", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>Dashboard</Typography>
        <Box>
          <Typography sx={{ fontWeight: "bold", mr: 2 }}>User: {user.name}</Typography>
          <Typography component="span" sx={{ px: 2, py: 1, backgroundColor: "#1976d2", color: "#fff", borderRadius: 1 }}>
            Points: {user.points}
          </Typography>
        </Box>
      </Box>

      {/* Grid of Cards */}
      <Grid container spacing={3}>
        {/* Learning Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 300, margin: "auto", textAlign: "center", p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Learning</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Access tutorials, courses, and study material here.
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Go to Learning
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Quiz Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 300, margin: "auto", textAlign: "center", p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quiz</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Test your knowledge with quizzes and practice tests.
              </Typography>
              <Button variant="contained" color="success" fullWidth>
                Go to Quiz
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Report Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 300, margin: "auto", textAlign: "center", p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Performance</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Check your progress and scores over time.
              </Typography>
              <Button variant="contained" color="warning" fullWidth>
                View Report
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Extra Section - Announcements */}
        <Grid item xs={12}>
          <Card sx={{ maxWidth: 900, margin: "auto", textAlign: "center", p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Announcements / Updates</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Stay updated with the latest notifications, news, and messages.
              </Typography>
              <Button variant="contained" color="info" fullWidth>
                View Updates
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
