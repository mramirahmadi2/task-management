import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";
import { getTheme } from "./theme";
import AppRouter from "./routes/AppRouter";
import Header from "./layout/Header";

const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setDarkMode(storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <ThemeProvider theme={getTheme(darkMode ? "dark" : "light")}>
      <CssBaseline />
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <Container sx={{ py: 4 }}>
        <AppRouter />
      </Container>
    </ThemeProvider>
  );
};

export default App;
