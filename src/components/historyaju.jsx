import React from "react";
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
} from "@mui/material";

export default function AjuHistory({ aeradorData, sensorData }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
      {/* Tabela do Aerador */}
      <Box sx={{ flex: 1, maxWidth: "800px" }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "12px",
            boxShadow: 3,
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Aerador
          </Typography>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#E3F2FD" }}>
                <TableCell sx={{ fontWeight: "bold" , whiteSpace: "nowrap" }}>Intervalo de acionamento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aeradorData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Typography>{entry.ajuValue.toFixed(0)}</Typography>
                      <Typography variant="caption">Seg</Typography>
                    </Box>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Tabela do Sensor */}
      <Box sx={{ flex: 1, maxWidth: "800px" }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "12px",
            boxShadow: 3,
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Sensor
          </Typography>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#E3F2FD" }}>
               
                <TableCell sx={{ fontWeight: "bold" , whiteSpace: "nowrap" }}>Intervalo de leitura</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sensorData.map((entry, index) => (
                <TableRow key={index}>
                 <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography>{entry.ajuValue.toFixed(0)}</Typography>
                    <Typography variant="caption">Seg</Typography>
                  </Box>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
