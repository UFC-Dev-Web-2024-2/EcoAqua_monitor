import React, { useState } from "react";
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

export default function AjuHistory({ aeradorData, sensorData, onExit }) {
  const [aeradorValues, setAeradorValues] = useState(aeradorData);
  const [sensorValues, setSensorValues] = useState(sensorData);

  const handleAeradorChange = (index, value) => {
    const updatedValues = [...aeradorValues];
    updatedValues[index].ajuValue = parseInt(value) || 0;
    setAeradorValues(updatedValues);
  };

  const handleSensorChange = (index, value) => {
    const updatedValues = [...sensorValues];
    updatedValues[index].ajuValue = parseInt(value) || 0;
    setSensorValues(updatedValues);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        {/* Tabela do Aerador */}
        <Box sx={{ flex: 1, maxWidth: "800px" }}>
          <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: 3, p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Aerador
            </Typography>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#E3F2FD" }}>
                  <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>Intervalo de acionamento (s)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {aeradorValues.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        type="number"
                        value={entry.ajuValue}
                        onChange={(e) => handleAeradorChange(index, e.target.value)}
                        size="small"
                        inputProps={{ min: 1 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Tabela do Sensor */}
        <Box sx={{ flex: 1, maxWidth: "800px" }}>
          <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: 3, p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Sensor
            </Typography>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#E3F2FD" }}>
                  <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>Intervalo de leitura (s)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sensorValues.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        type="number"
                        value={entry.ajuValue}
                        onChange={(e) => handleSensorChange(index, e.target.value)}
                        size="small"
                        inputProps={{ min: 1 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="error"
        onClick={onExit}
        sx={{ mt: 2, fontWeight: "bold", borderRadius: "8px", px: 3 }}
      >
        Sair
      </Button>
    </Box>
  );
}
