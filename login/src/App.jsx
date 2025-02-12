import React from "react";
import { Box, Typography, Container, Paper, TextField, Button } from "@mui/material";

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

          <Box sx={{ width: "100%", mt: 2 }}>
            <TextField fullWidth label="Seu e-mail" variant="outlined" margin="normal" />
            <TextField fullWidth label="Sua senha" variant="outlined" margin="normal" type="password" />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#29405B",
                "&:hover": { backgroundColor: "#516F91" },
                padding: "10px",
              }}
            >
              ENTRAR
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
