import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../utils/api";
import NavBar from "../../components/NavBar";

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

      <NavBar user={null} />

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
          sx={{ backgroundColor: "#e5eaed", width: "500px" }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
              borderRadius: 2,
              width: "100%",
              height: "50%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#29405B",
                mb: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              Bem-vindo de volta!
            </Typography>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
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
                control={
                  <Checkbox
                    color="primary"
                    sx={{ verticalAlign: "middle" }} // Alinha verticalmente o checkbox
                  />
                }
                label={
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Manter-me conectado
                  </span>
                }
                sx={{ display: "flex", alignItems: "center", gap: 1 }} // Garante alinhamento
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
                <Link href="#" className={"link"} variant="body2">
                  Esqueceu a senha?
                </Link>

                {/* <Button
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
                </Button> */}
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: "#757575",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <br></br>
                Ainda não tem conta?{" "}
                <Link to={"/register"} className={"link"}>
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
