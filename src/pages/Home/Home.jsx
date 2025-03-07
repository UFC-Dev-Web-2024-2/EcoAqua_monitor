import { Box } from "@mui/material";
import {
  WaterDrop,
  Visibility,
  BatteryFull,
  Wifi,
  Sensors,
  Opacity,
} from "@mui/icons-material";
import "../Home/Home.css";
import { useState, useEffect, useMemo } from "react";
import Dados from "../../components/dados";
import PhHistory from "../../components/historyph";
import TurbHistory from "../../components/historyturb";
import TdsHistory from "../../components/historytds";
import BatHistory from "../../components/historybat";
import AjuHistory from "../../components/historyaju";
import StatusCard from "../../components/wifi";
import { getNotification, getSensor, dateTime } from "../../utils/api";
import NothingData from "../../components/NothingData";
import Notifications from "../../components/Notifications";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState([]);
  const [activeTab, setActiveTab] = useState("Dashboard");
  async function getData() {
    const response = await getSensor();
    if (response.length <= 0) {
      return [];
    } else {
      setData(response);
    }
  }
  async function getNotifications() {
    const datanotification = await getNotification();
    if (datanotification.length <= 0) {
      return [];
    } else {
      setNotification(datanotification);
    }
  }

  useEffect(() => {
    if (data.length <= 0) {
      console.log("notification", data);
      getData();
      getNotifications();
    } else {
      const interval = setInterval(() => {
        getData();
        getNotification();
      }, Number(user.sensorTime) * 1000);
      return () => clearInterval(interval);
    }
  }, [data, user]);
  const notificationData = useMemo(() => {
    if (!notification || notification.length === 0) return [];

    return notification.map((item) => ({
      text: item.message,
      time: dateTime(item.createdAt),
      color: "#000000",
    }));
  }, [notification]);
  console.log("notificationData", notificationData);
  const sensor = useMemo(() => {
    {
      if (!data || data.length === 0) return [];
      console.log("data", data);

      const latestData = data[data.length - 1];

      return [
        {
          title: "PH",
          value: `${latestData.pH.toFixed(2)} pH`,
          icon: <WaterDrop sx={{ fontSize: 40, color: "#007BFF" }} />,
          time: dateTime(latestData.createdAt),
        },
        {
          title: "Turbidez",
          value: `${latestData.Turbidez.toFixed(2)} NTU`,
          icon: <Visibility sx={{ fontSize: 40, color: "#000" }} />,
          time: dateTime(latestData.createdAt),
        },
        {
          title: "TDS",
          value: `${latestData.TDS.toFixed(2)} mg/L`,
          icon: <Sensors sx={{ fontSize: 40, color: "#007BFF" }} />,
          time: dateTime(latestData.createdAt),
        },
        {
          title: "Bateria",
          value: `${((latestData.BaterySlave / 4.2) * 100).toFixed(2)}%`, // Convertendo a voltagem para porcentagem
          icon: <BatteryFull sx={{ fontSize: 40, color: "#28a745" }} />,
          time: dateTime(latestData.createdAt),
        },
      ];
    }
  }, [data]);
  console.log("sensor", sensor);

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

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          bgcolor: "#EAF0F6",
          flex: 1,
        }}
      >
        {/* Cabeçalho */}
        <NavBar user={user} />

        <Box sx={{ mt: "100px", display: "flex", flex: 1, p: 3, gap: "20px" }}>
          {/* coluna a esquerda */}
          <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* dados */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            {sensor.length === 0 && activeTab !== "Ajustes" && <NothingData />}
            {activeTab === "Dashboard" && sensor.length > 0 && (
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
            {activeTab === "pH" && sensor.length > 0 && (
              <PhHistory
                historyData={sensor.length > 0 ? historyData("ph") : []}
              />
            )}
            {activeTab === "Turbidez" && sensor.length > 0 && (
              <TurbHistory
                historyData={sensor.length > 0 ? historyData("turb") : []}
              />
            )}
            {activeTab === "TDS" && sensor.length > 0 && (
              <TdsHistory
                historyData={sensor.length > 0 ? historyData("tds") : []}
              />
            )}
            {activeTab === "Bateria" && sensor.length > 0 && (
              <BatHistory
                historyData={sensor.length > 0 ? historyData("bat") : []}
              />
            )}
            {activeTab === "Ajustes" && <AjuHistory />}
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
            <Notifications data={notificationData} />

            {/* Wi-Fi e LoRa */}
            {/* <StatusCard title="Wi-Fi" icon={<Wifi />} defaultStatus={true} />
            <StatusCard title="LoRa" icon={<Opacity />} defaultStatus={true} /> */}
          </Box>
        </Box>
      </Box>
    </>
  );
}
