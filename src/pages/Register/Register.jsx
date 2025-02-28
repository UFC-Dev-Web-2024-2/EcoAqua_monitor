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
import { Link, useNavigate } from "react-router-dom";
import "../../styles/global.css";
import { useState } from "react";
import { register } from "../../utils/api";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sensorId, setSensorId] = useState("");
  function handleRegister(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    if (password.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres!");
      return;
    }
    if (sensorId.length < 0) {
      alert("O ID do sensor deve ser preenchido!");
      return;
    }
    setLoading(true);
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      register({ email, password, username, sensorId });
    } catch (error) {
      console.error("Erro ao efetuar login:", error);
    }
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 3000);
  }
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
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="E-mail"
                variant="outlined"
                margin="normal"
                type="email"
                placeholder="exemplo@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Senha"
                variant="outlined"
                margin="normal"
                type="password"
                placeholder="12345"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                fullWidth
                label="Confirme a Senha"
                variant="outlined"
                margin="normal"
                type="password"
                placeholder="12345"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <TextField
                fullWidth
                label="Sensor ID"
                variant="outlined"
                margin="normal"
                placeholder="12345"
                onChange={(e) => setSensorId(e.target.value)}
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
                onClick={handleRegister}
                loading={loading}
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
