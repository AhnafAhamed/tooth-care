import "@mantine/core/styles.css";
import "./App.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { Login } from "./views/Login";

function App() {
  const theme = createTheme({
    shadows: {
      md: "1px 1px 3px rgba(0, 0, 0, .25)",
      xl: "5px 5px 3px rgba(0, 0, 0, .25)",
    },
  });
  return (
    <MantineProvider theme={theme}>
      <Login />
    </MantineProvider>
  );
}

export default App;
