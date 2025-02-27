import { Box, Card, CardContent, Typography, Switch, IconButton, Avatar, Divider, } from "@mui/material";
import { WaterDrop, Visibility, BatteryFull, Wifi, Sensors, Settings, Dashboard, Menu, Opacity, ArrowForwardIos, ExpandMore, } from "@mui/icons-material";
import "../Home/Home.css";
import { useState } from "react";
import Dados from "../../components/dados";
import PhHistory from "../../components/historyph";
import TurbHistory from "../../components/historyturb";
import TdsHistory from "../../components/historytds";
import BatHistory from "../../components/historybat";
import AjuHistory from "../../components/historyaju";
import StatusCard from "../../components/wifi";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const sensors = [
    { title: "PH", value: "7.1 pH", icon: <WaterDrop sx={{ fontSize: 40, color: "#007BFF" }} />, time: "Há 30 minutos" },
    { title: "Turbidez", value: "0.5 NTU", icon: <Visibility sx={{ fontSize: 40, color: "#000" }} />, time: "Há 30 minutos" },
    { title: "TDS", value: "200 mg/L", icon: <Sensors sx={{ fontSize: 40, color: "#007BFF" }} />, time: "Há 30 minutos" },
    { title: "Bateria", value: "67%", icon: <BatteryFull sx={{ fontSize: 40, color: "#28a745" }} />, time: "Há 30 minutos" },
  ];

  const phHistoryData = [
    { timestamp: "2024-02-26T08:30:00", phValue: 7.1 },
    { timestamp: "2024-02-26T10:15:00", phValue: 6.9 },
    { timestamp: "2024-02-26T12:45:00", phValue: 7.3 },
    { timestamp: "2024-02-26T14:20:00", phValue: 7.0 },
    { timestamp: "2024-02-26T16:05:00", phValue: 6.8 },
  ];

  const turbHistoryData = [
    { timestamp: "2024-02-26T08:30:00", turbValue: 307 },
    { timestamp: "2024-02-26T10:15:00", turbValue: 243 },
    { timestamp: "2024-02-26T12:45:00", turbValue: 678 },
    { timestamp: "2024-02-26T14:20:00", turbValue: 150 },
    { timestamp: "2024-02-26T16:05:00", turbValue: 190 },
  ];
  const tdsHistoryData = [
    { timestamp: "2024-02-26T08:30:00", tdsValue: 200 },
    { timestamp: "2024-02-26T10:15:00", tdsValue: 250 },
    { timestamp: "2024-02-26T12:45:00", tdsValue: 311 },
    { timestamp: "2024-02-26T14:20:00", tdsValue: 190 },
    { timestamp: "2024-02-26T16:05:00", tdsValue: 212 },
  ];
  const batHistoryData = [
    { timestamp: "2024-02-26T08:30:00", batValue: 100},
    { timestamp: "2024-02-26T10:15:00", batValue: 90 },
    { timestamp: "2024-02-26T12:45:00", batValue: 80 },
    { timestamp: "2024-02-26T14:20:00", batValue: 69 },
    { timestamp: "2024-02-26T16:05:00", batValue: 40 },
  ];
  const ajuHistoryData = [
    { timestamp: "2024-02-26T08:30:00", ajuValue: 100},
    
  ];

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
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            {activeTab === "Dashboard" && (
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", }}>
                {sensors.map((sensor, index) => (
                  <         Dados key={index} {...sensor} />
                ))}
              </Box>
            )}
            {activeTab === "pH" && <PhHistory historyData={phHistoryData} />}
            {activeTab === "Turbidez" && <TurbHistory historyData={turbHistoryData} />}
            {activeTab === "TDS" && <TdsHistory historyData={tdsHistoryData} />}
            {activeTab === "Bateria" && <BatHistory historyData={batHistoryData} />}
            {activeTab === "Ajustes" && <AjuHistory historyData={ajuHistoryData} />}
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
            {/* Notificações */}
            <Card
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
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                    <ArrowForwardIos sx={{ fontSize: 18, color: "#bbb" }} /> Notificações
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />

                {[
                  { text: "pH muito ácido", time: "há 2 horas", color: "#9B2C2C" },
                  { text: "Bateria Completa", time: "há 3 horas", color: "#276749" },
                  { text: "Backup do dia armazenado", time: "há 16 horas", color: "#276749" },
                ].map((item, idx) => (
                  <Typography
                    key={idx}
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center", gap: "8px", mt: 1 }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        bgcolor: item.color || "transparent",
                        borderRadius: "50%",
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontWeight: "bold", fontSize: "14px", color: "#2c3e50" }}>
                        {item.text}
                      </Typography>
                      <Typography sx={{ fontSize: "12px", color: "#718096" }}>{item.time}</Typography>
                    </Box>
                  </Typography>
                ))}
              </CardContent>
            </Card>

            {/* Wi-Fi e LoRa */}
            <StatusCard title="Wi-Fi" icon={<Wifi />} defaultStatus={true} />
            <StatusCard title="LoRa" icon={<Opacity />} defaultStatus={true} />
          </Box>


        </Box>
      </Box>
    </>
  );
}
