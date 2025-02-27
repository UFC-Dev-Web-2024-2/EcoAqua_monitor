import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import {
  WaterDrop,
  Visibility,
  BatteryFull,
  Wifi,
  Sensors,
  Settings,
  Dashboard,
  Menu,
  Opacity,
  ArrowForwardIos,
  ExpandMore,
} from "@mui/icons-material";
import "../Home/Home.css";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          bgcolor: "#EAF0F6",
        }}
      >
        {/* Cabeçalho */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
            sx={{ fontWeight: "bold", color: "#2c3e50", ml: 3 }}
          >
            EcoAqua Monitor
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 3 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#2c3e50" }}
            >
              Hello!
            </Typography>
            <IconButton>
              <ExpandMore />
            </IconButton>
            <Avatar alt="Arthur" src="https://via.placeholder.com/40" />
          </Box>
        </Box>

        <Box sx={{ mt: "100px", display: "flex", flex: 1, p: 3, gap: "20px" }}>


          {/* coluna a esquerda */}
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
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
          
          {/* dados */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* 4 cards  */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "50px",
              }}
            >
              {[
                {
                  title: "PH",
                  value: "7.1 pH",
                  icon: <WaterDrop sx={{ fontSize: 40, color: "#007BFF" }} />,
                  time: "Há 30 minutos",
                },
                {
                  title: "Turbidez",
                  value: "0.5 ntu",
                  icon: <Visibility sx={{ fontSize: 40, color: "#000" }} />,
                  time: "Há 30 minutos",
                },
                {
                  title: "TDS",
                  value: "200 mg/L",
                  icon: <Sensors sx={{ fontSize: 40, color: "#007BFF" }} />,
                  time: "Há 30 minutos",
                },
                {
                  title: "Bateria",
                  value: "67%",
                  icon: <BatteryFull sx={{ fontSize: 40, color: "#28a745" }} />,
                  time: "Há 30 minutos",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    bgcolor: "white",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    width: "500px",
                    height: "180px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {item.title}
                    </Typography>
                    <IconButton>{item.icon}</IconButton>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "#2c3e50" }}
                  >
                    {item.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.time}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton>
                      <ArrowForwardIos sx={{ fontSize: 18, color: "#bbb" }} />
                    </IconButton>
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>

          {/* coluna a direita */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: 300,
            }}
          >
            {[
              {
                title: "Notificações",
                content: [
                  {
                    text: "pH muito ácido",
                    time: "há 2 horas",
                    color: "#9B2C2C",
                  },
                  {
                    text: "Bateria Completa",
                    time: "há 3 horas",
                    color: "#276749",
                  },
                  {
                    text: "Backup do dia armazenado",
                    time: "há 16 horas",
                    color: "#276749",
                  },
                ],
                icon: <ArrowForwardIos sx={{ fontSize: 18, color: "#bbb" }} />,
              },
              {
                title: "Wi-Fi",
                content: [
                  { text: "Rede: Eduroam UFC" },
                  { text: "Status: conectado" },
                ],
                icon: <Wifi />,
              },
              {
                title: "Lora",
                icon: <Opacity />,
                content: [{ text: "Status: conectado" }],
              },
            ].map((item, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  bgcolor: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "15px",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#2c3e50" }}
                    >
                      {item.icon} {item.title}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />

                  {item.content.map((textItem, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        mt: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: textItem.color || "transparent",
                          borderRadius: "50%",
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#2c3e50",
                          }}
                        >
                          {textItem.text}
                        </Typography>
                        {textItem.time && (
                          <Typography
                            sx={{ fontSize: "12px", color: "#718096" }}
                          >
                            {textItem.time}
                          </Typography>
                        )}
                      </Box>
                    </Typography>
                  ))}
                </CardContent>

                {/* lora e wifi */}
                {item.title !== "Notificações" && (
                  <Box
                    sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}
                  >
                    {item.icon}
                    <Switch
                      defaultChecked
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#1E3A5F",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            bgcolor: "#1E3A5F",
                          },
                      }}
                    />
                  </Box>
                )}
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
