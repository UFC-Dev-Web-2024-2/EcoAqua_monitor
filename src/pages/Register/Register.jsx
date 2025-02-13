import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import "../../styles/global.css";

export default function Register() {
  return (
    <Box
      sx={{
        backgroundColor: "#e5eaed",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Cabeçalho */}
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#f8f9fc", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: "#29405B", fontWeight: "bold", ml: 2 }}
          >
            EcoAqua Monitor
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Container Centralizado */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{ backgroundColor: "#e5eaed" }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              width: "100%",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#29405B", mb: 2 }}
            >
              Cadastre-se!
            </Typography>

            <Box sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Nome"
                variant="outlined"
                margin="normal"
                placeholder="Joao da Silva"
              />
              <TextField
                fullWidth
                label="E-mail"
                variant="outlined"
                margin="normal"
                type="email"
                placeholder="exemplo@gmail.com"
              />
              <TextField
                fullWidth
                label="Senha"
                variant="outlined"
                margin="normal"
                type="password"
                placeholder="12345"
              />
              <TextField
                fullWidth
                label="Confirme a Senha"
                variant="outlined"
                margin="normal"
                type="password"
                placeholder="12345"
              />
              <TextField
                fullWidth
                label="Código de Identificação do módulo"
                variant="outlined"
                margin="normal"
                placeholder="12345"
              />
              <TextField
                fullWidth
                label="SSID da rede Wi-Fi"
                variant="outlined"
                margin="normal"
                placeholder="TP-LINK-3975"
              />
              <TextField
                fullWidth
                label="Senha da rede"
                variant="outlined"
                margin="normal"
                type="password"
                placeholder="12345"
              />

              {/* <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Manter-me conectado"
                sx={{ mt: 1 }}
              /> */}

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
                Cadastrar
              </Button>

              <Typography variant="body2" sx={{ color: "#757575" }}>
                <br></br>
                Já tem conta?{" "}
                <Link to={"/login"} class={"link"}>
                  Entrar
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
