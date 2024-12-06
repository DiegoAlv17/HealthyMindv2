import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { AuthContext } from "../../context/AuthContext";

import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarktModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

const Topbar = () => {
  const { logout } = useContext(AuthContext); 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/*Barra de busqueda */}
      <Box
        display="flex"
        backgroundColor={colors.pinkAccent[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Buscar..." />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/*Barra de iconos */}
      <Box display="flex">
        <IconButton
          onClick={colorMode.toggleColorMode}
          type="button"
          sx={{ p: 1 }}
        >
          {theme.palette.mode === "dark" ? (
            <DarktModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton type="button" sx={{ p: 1 }}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton type="button" sx={{ p: 1 }}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton type="button" sx={{ p: 1 }}>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton onClick={logout} type="button" sx={{ p: 1 }}>
          
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
