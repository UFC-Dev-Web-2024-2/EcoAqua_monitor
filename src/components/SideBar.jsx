import { Box, Typography, IconButton } from "@mui/material";

import {
  WaterDrop,
  Visibility,
  BatteryFull,
  Sensors,
  Settings,
  Dashboard,
} from "@mui/icons-material";
export default function SideBar({ activeTab, setActiveTab }) {
  return (
    <Box
      sx={{
        width: 400,
        bgcolor: "#EAF0F6",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: "10px",
        gap: "10px",
        height: "600px",
      }}
    >
      {[
        { icon: <Dashboard fontSize="large" />, label: "Dashboard" },
        { icon: <WaterDrop fontSize="large" />, label: "pH" },
        { icon: <Visibility fontSize="large" />, label: "Turbidez" },
        { icon: <Sensors fontSize="large" />, label: "TDS" },
        { icon: <BatteryFull fontSize="large" />, label: "Bateria" },
        { icon: <Settings fontSize="large" />, label: "Ajustes" },
      ].map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "90%",
            px: 2,
            py: 1,
            borderRadius: "16px",
            cursor: "pointer",
            bgcolor: activeTab === item.label ? "#1E3A5F" : "transparent",
            color: activeTab === item.label ? "white" : "#1E3A5F",
            transition: "0.3s",
            fontWeight: "bold",
            "&:hover": {
              bgcolor: activeTab === item.label ? "#162C47" : "#D6E2F0",
            },
          }}
          onClick={() => setActiveTab(item.label)}
        >
          <IconButton sx={{ color: "inherit" }}>{item.icon}</IconButton>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
