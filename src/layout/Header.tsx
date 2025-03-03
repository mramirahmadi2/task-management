import { AppBar, Toolbar, Typography, IconButton, Switch } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleTheme }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Management
        </Typography>
        <IconButton color="inherit">
          {darkMode ? <DarkMode /> : <LightMode />}
        </IconButton>
        <Switch checked={darkMode} onChange={toggleTheme} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
