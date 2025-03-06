import { Box, Typography } from "@mui/material";
import NotInterestedIcon from "@mui/icons-material/NotInterested";

export default function NothingData() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: "bold",
        color: "#2c3e50",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
      >
        Nenhum dado
      </Typography>
      <NotInterestedIcon />
    </Box>
  );
}
