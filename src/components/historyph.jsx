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

export default function PhHistory({ historyData }) {
  return (
    <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          maxWidth: "800px",
          borderRadius: "12px",
          boxShadow: 3,
          p: 2,
        }}
      >
        <Table>
          <TableHead>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Histórico de pH
            </Typography>
            <TableRow sx={{ backgroundColor: "#E3F2FD" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Data</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Hora</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Valor pH</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(entry.timestamp).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </TableCell>
                <TableCell>{entry.phValue.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
