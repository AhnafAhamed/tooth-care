import "@mantine/core/styles.css";
import "./App.css";
import { MantineProvider, Button, createTheme } from "@mantine/core";

function App() {
  const theme = createTheme({
    shadows: {
      md: "1px 1px 3px rgba(0, 0, 0, .25)",
      xl: "5px 5px 3px rgba(0, 0, 0, .25)",
    },
  });
  return (
    <MantineProvider theme={theme}>
      <h1>Hello World!</h1>
      <Button>Hello</Button>
    </MantineProvider>
  );
}

export default App;
