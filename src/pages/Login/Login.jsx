import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { googleLogin, login } from "../../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      login({ email, password });
    } catch (error) {
      console.error("Erro ao efetuar login:", error);
    }
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 2000);
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
              Bem-vindo de volta!
            </Typography>

            <Box sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Seu e-mail"
                variant="outlined"
                margin="normal"
                placeholder="exemplo@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Sua senha"
                variant="outlined"
                margin="normal"
                type="password"
                placeholder="12345"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Manter-me conectado"
                sx={{ mt: 1 }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#29405B",
                  "&:hover": { backgroundColor: "#516F91" },
                  padding: "10px",
                }}
                onClick={handleLogin}
                loading={loading}
              >
                ENTRAR
              </Button>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  mt: 2,
                }}
              >
                <Link href="#" class={"link"} variant="body2">
                  Esqueceu a senha?
                </Link>

                <Button
                  variant="outlined"
                  sx={{
                    color: "#757575",
                    borderColor: "#c1c1c1",
                    textTransform: "none",
                    padding: "6px",
                  }}
                  onClick={() => {
                    googleLogin();
                  }}
                >
                  Entrar com Google
                </Button>
              </Box>

              <Typography variant="body2" sx={{ color: "#757575" }}>
                <br></br>
                Ainda não tem conta?{" "}
                <Link to={"/register"} class={"link"}>
                  Cadastre-se
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
