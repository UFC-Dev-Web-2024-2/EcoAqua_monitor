import { Box, Typography, IconButton, Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function NavBar({ user }) {
  // const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  console.log("userdata", user);
  function handleLogout() {
    localStorage.removeItem("token"); // Remove o token de autenticação
    localStorage.removeItem("user"); // Remove o token de autenticação
    navigate("/login"); // Redireciona para login
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        justifyItems: "center",
        bgcolor: "white",
        p: 1,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        position: "fixed",
        top: 0,
        left: -1,
        height: "64px",
        zIndex: 1000,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#2c3e50",
          ml: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        EcoAqua Monitor
      </Typography>
      {user !== null && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 3 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: "#2c3e50",
              display: "flex",
              alignItems: "center",
            }}
          >
            Hello {user.username}!
          </Typography>
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
          <Avatar alt={user.username} src="https://via.placeholder.com/40" />
        </Box>
      )}
    </Box>
  );
}
