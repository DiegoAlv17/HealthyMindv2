import React from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import GeographyChart from "../../components/GeographyChart";
import useWindowSize from "../../hooks/useWindowSize";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const size = useWindowSize();

  return (
    <Box m="20px">
      
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Header title="DASHBOARD" subtitle="Bienvenidos a tu panel de ADMINISTRADOR" />

        <Box mt={size.width <= 768 ? "10px" : "0"}>
          <Button
            sx={{
              backgroundColor: colors.pinkAccent[700],
              color: colors.grey[100],
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Descargar Reportes
          </Button>
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="600px" // Se aumentó la altura de los bloques a 600px
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn={size.width <= 768 ? "span 12" : "span 6"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="20px"
          height="100%"  // Se asegura de que el bloque tenga altura completa
          maxWidth="100%" // Asegura que el bloque no se desborde
          overflow="hidden" // Asegura que el contenido no se desborde del contenedor
        >
          <BarChart isDashboard={true} style={{ width: "60%", height: "60%" }} />
        </Box>

        <Box
          gridColumn={size.width <= 768 ? "span 12" : "span 6"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="20px"
          height="100%"  // Se asegura de que el bloque tenga altura completa
          maxWidth="100%" // Asegura que el bloque no se desborde
          overflow="hidden" // Asegura que el contenido no se desborde del contenedor
        >
          <PieChart isDashboard={true} style={{ width: "60%", height: "60%" }} />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn={size.width <= 768 ? "span 12" : "span 6"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="20px"
          height="100%"  // Se asegura de que el bloque tenga altura completa
          maxWidth="100%" // Asegura que el bloque no se desborde
          overflow="hidden" // Asegura que el contenido no se desborde del contenedor
        >
          <LineChart isDashboard={true} style={{ width: "60%", height: "60%" }} />
        </Box>

        <Box
          gridColumn={size.width <= 768 ? "span 12" : "span 6"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="20px"
          height="100%"  // Se asegura de que el bloque tenga altura completa
          maxWidth="100%" // Asegura que el bloque no se desborde
          overflow="hidden" // Asegura que el contenido no se desborde del contenedor
        >
          <GeographyChart isDashboard={true} style={{ width: "60%", height: "60%" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;