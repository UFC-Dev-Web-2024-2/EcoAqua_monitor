import React from "react";
import { Box, Typography } from "@mui/material";

export default function App() {
  return (
    <Box
      sx={{
        backgroundColor: "#e5eaed",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#29405B" }}>
        Bem-vindo de volta!
      </Typography>
    </Box>
  );
}
