import { Card, Box, Typography, IconButton } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

export default function Dados({ title, value, icon, time }) {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: "16px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "500px",  
        height: "200px", 
        minHeight: "140px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <IconButton>{icon}</IconButton>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {time}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton>
          <ArrowForwardIos sx={{ fontSize: 18, color: "#bbb" }} />
        </IconButton>
      </Box>
    </Card>
  );
}
