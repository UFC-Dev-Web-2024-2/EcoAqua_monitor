import { Card, CardContent, Typography, Box, Switch } from "@mui/material";
import { useState } from "react";


export default function StatusCard({ title, icon, initialStatus = true }) {
  const [isConnected, setIsConnected] = useState(initialStatus);

  return (
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
            {icon} {title}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#2c3e50", mt: 1 }}>
          Status: {isConnected ? "Conectado" : "Desconectado"}
        </Typography>
      </CardContent>

      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        {icon}
        <Switch
          checked={isConnected}
          onChange={() => setIsConnected(!isConnected)}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#1E3A5F",
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              bgcolor: "#1E3A5F",
            },
          }}
        />
      </Box>
    </Card>
  );
}
