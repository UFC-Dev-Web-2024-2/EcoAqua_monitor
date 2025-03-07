import { Box, Card, CardContent, Typography, Divider } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

export default function Notifications({ data }) {
  console.log("data", data);
  return (
    <Card
      sx={{
        borderRadius: "16px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        bgcolor: "white",
        height: "300px",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#2c3e50", flex: 0 }}
          >
            <ArrowForwardIos sx={{ fontSize: 18, color: "#bbb" }} />{" "}
            Notificações
          </Typography>
          {data.length > 0 &&
            data.map((item, idx) => (
              <Typography
                key={idx}
                variant="body2"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
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
                <Box sx={{ display: "flex", flexDirection: "column" }}>
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
        </Box>

        {data.length <= 0 && (
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              mt: 1,
            }}
          >
            Nenhuma notificação
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
