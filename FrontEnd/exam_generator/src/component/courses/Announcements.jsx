
import React from "react";
import { Typography, TextField, Button } from "@mui/material";

export default function Announcements() {
  return (
    <>
      <Typography variant="h4">Announcements</Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="Write an announcement..."
        sx={{ mt: 2 }}
      />
      <Button variant="contained" sx={{ mt: 2 }}>
        Send to Students
      </Button>
    </>
  );
}
