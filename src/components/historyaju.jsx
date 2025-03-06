import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { updateAeratorSensorTime } from "../utils/api";
export default function AjuHistory() {
  const user = JSON.parse(localStorage.getItem("user"));
  const aerator = useState(localStorage.getItem("aeratorTime"));
  const sensorTimer = useState(localStorage.getItem("sensorTime"));
  const [aeradorValues, setAeradorValues] = useState(user.aeratorTime);
  const [sensorValues, setSensorValues] = useState(user.sensorTime);
  console.log("aerator", aerator[0]);
  console.log("sensorTimer", sensorTimer[0]);
  async function handleChange() {
    console.log("aeradorValues", aeradorValues);
    console.log("sensorValues", sensorValues);
    await updateAeratorSensorTime(Number(aeradorValues), Number(sensorValues));
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        height: "50%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        {/* Tabela do Aerador */}
        <Box sx={{ flex: 1, maxWidth: "800px", height: "80%" }}>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "12px",
              boxShadow: 3,
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // Garante espaçamento igual entre os itens
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Aerador
            </Typography>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#E3F2FD" }}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    Intervalo de acionamento (s)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ textAlign: "center", padding: "16px" }}>
                    <TextField
                      type="number"
                      value={aeradorValues}
                      onChange={(e) => setAeradorValues(e.target.value)}
                      size="small"
                      sx={{ width: "100%" }} // Faz o campo ocupar toda a largura disponível
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Tabela do Sensor */}
        <Box sx={{ maxWidth: "800px", height: "80%" }}>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "12px",
              boxShadow: 3,
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyItems: "space-between",
              alignItems: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Sensor
            </Typography>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#E3F2FD" }}>
                  <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                    Intervalo de leitura (s)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TextField
                      style={{
                        flex: 1,
                        display: "flex",
                        alignContent: "center",
                      }}
                      type="number"
                      value={sensorValues}
                      onChange={(e) => setSensorValues(e.target.value)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="error"
        sx={{
          mt: 2,
          fontWeight: "bold",
          borderRadius: "8px",
          px: 3,
          height: "40px",
        }}
        onClick={handleChange}
      >
        Salvar
      </Button>
    </Box>
  );
}
