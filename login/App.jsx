import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";

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
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#29405B" }}>
            Bem-vindo de volta!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
