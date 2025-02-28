import {
  Box,
  Card,
  CardContent,
  Typography,
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
  Opacity,
  ArrowForwardIos,
  ExpandMore,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import "../Home/Home.css";
import { differenceInMinutes, differenceInHours } from "date-fns";
import { useState, useEffect, useMemo } from "react";
import Dados from "../../components/dados";
import PhHistory from "../../components/historyph";
import TurbHistory from "../../components/historyturb";
import TdsHistory from "../../components/historytds";
import BatHistory from "../../components/historybat";
import AjuHistory from "../../components/historyaju";
import StatusCard from "../../components/wifi";
import { useNavigate } from "react-router-dom";
import { getNotification, getSensor } from "../../utils/api";

export default function Home() {
  const navigate = useNavigate();
  const username = useState(localStorage.getItem("username"));
  const [data, setData] = useState();
  const [notification, setNotification] = useState();
  const [activeTab, setActiveTab] = useState("Dashboard");
  async function getData() {
    const response = await getSensor();
    const datanotification = await getNotification();
    setNotification(datanotification);
    setData(response);
  }

  useEffect(() => {
    if (data === null) {
      getData();
    } else {
      const interval = setInterval(() => {
        getData();
      }, 20 * 1000);
      return () => clearInterval(interval);
    }
  }, [data]);
  // const notificationData = useMemo(() => {
  //   if (!notification || notification.length === 0) return [];
  //   const notificationDateTime = new Date(notification.createdAt);
  //     const now = new Date();

  //     const diffMinutes = differenceInMinutes(now, notificationDateTime);
  //     const diffHours = differenceInHours(now, notificationDateTime);

  //     let timeAgo;
  //     if (diffMinutes < 60) {
  //       timeAgo = `Há ${diffMinutes} minutos`;
  //     } else {
  //       timeAgo = `Há ${diffHours} horas`;
  //     }
  //   return notification.map((item) => (

  //     return {
  //     text: item.message,
  //     time: timeAgo,
  //   }
  // ));
  // }, [notification]);
  // console.log("notificationData", notificationData);
  const sensor = useMemo(() => {
    {
      if (!data || data.length === 0) return [];
      console.log("data", data);

      const latestData = data[data.length - 1];
      console.log("latestData", latestData.id);
      const sensorDateTime = new Date(latestData.createdAt);
      const now = new Date();

      const diffMinutes = differenceInMinutes(now, sensorDateTime);
      const diffHours = differenceInHours(now, sensorDateTime);

      let timeAgo;
      if (diffMinutes < 60) {
        timeAgo = `Há ${diffMinutes} minutos`;
      } else {
        timeAgo = `Há ${diffHours} horas`;
      }

      return [
        {
          title: "PH",
          value: `${latestData.pH.toFixed(2)} pH`,
          icon: <WaterDrop sx={{ fontSize: 40, color: "#007BFF" }} />,
          time: timeAgo,
        },
        {
          title: "Turbidez",
          value: `${latestData.Turbidez.toFixed(2)} NTU`,
          icon: <Visibility sx={{ fontSize: 40, color: "#000" }} />,
          time: timeAgo,
        },
        {
          title: "TDS",
          value: `${latestData.TDS.toFixed(2)} mg/L`,
          icon: <Sensors sx={{ fontSize: 40, color: "#007BFF" }} />,
          time: timeAgo,
        },
        {
          title: "Bateria",
          value: `${((latestData.BaterySlave / 4.2) * 100).toFixed(2)}%`, // Convertendo a voltagem para porcentagem
          icon: <BatteryFull sx={{ fontSize: 40, color: "#28a745" }} />,
          time: timeAgo,
        },
      ];
    }
  }, [data]);
  console.log("sensor", sensor);

  function handleLogout() {
    localStorage.removeItem("token"); // Remove o token de autenticação
    navigate("/login"); // Redireciona para login
  }

  function historyData(type) {
    if (type === "ph") {
      return data.map((item) => ({
        timestamp: item.createdAt,
        phValue: item.pH,
      }));
    }
    if (type === "turb") {
      return data.map((item) => ({
        timestamp: item.createdAt,
        turbValue: item.Turbidez,
      }));
    }
    if (type === "tds") {
      return data.map((item) => ({
        timestamp: item.createdAt,
        tdsValue: item.TDS,
      }));
    }
    if (type === "bat") {
      return data.map((item) => ({
        timestamp: item.createdAt,
        batValue: item.BaterySlave,
      }));
    }
  }

  const ajuHistoryAerador = [{ ajuValue: 120 }];

  const ajuHistorySensor = [{ ajuValue: 60 }];

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
              Hello {username}!
            </Typography>
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
            <Avatar alt={username} src="https://via.placeholder.com/40" />
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
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "20px",
                }}
              >
                {sensor.map((sensor, index) => (
                  <Dados key={index} {...sensor} />
                ))}
              </Box>
            )}
            {activeTab === "pH" && (
              <PhHistory historyData={historyData("ph")} />
            )}
            {activeTab === "Turbidez" && (
              <TurbHistory historyData={historyData("turb")} />
            )}
            {activeTab === "TDS" && (
              <TdsHistory historyData={historyData("tds")} />
            )}
            {activeTab === "Bateria" && (
              <BatHistory historyData={historyData("bat")} />
            )}
            {activeTab === "Ajustes" && (
              <AjuHistory
                aeradorData={ajuHistoryAerador}
                sensorData={ajuHistorySensor}
              />
            )}
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
                    <ArrowForwardIos sx={{ fontSize: 18, color: "#bbb" }} />{" "}
                    Notificações
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />

                {[
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
                ].map((item, idx) => (
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
                        bgcolor: item.color || "transparent",
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
                        {item.text}
                      </Typography>
                      <Typography sx={{ fontSize: "12px", color: "#718096" }}>
                        {item.time}
                      </Typography>
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
