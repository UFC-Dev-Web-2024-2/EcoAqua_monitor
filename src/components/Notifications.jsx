import { Box, Card, CardContent, Typography, Divider } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

export default function Notifications({ data }) {
  return (
    <Card
      sx={{
        borderRadius: "16px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        bgcolor: "white",
        display: "flex",
        height: "300px",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Box
          sx={{
            justifyContent: "space-between",

            alignItems: "center",
            width: "100%",
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

        {data.map((item, idx) => (
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
  );
}
