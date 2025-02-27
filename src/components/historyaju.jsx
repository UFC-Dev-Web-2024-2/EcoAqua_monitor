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

export default function AjuHistory({ historyData }) {
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
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Ajustes
        </Typography>
        
      </TableContainer>
    </Box>
  );
}
