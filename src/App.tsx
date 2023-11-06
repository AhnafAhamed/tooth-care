import "@mantine/core/styles.css";
import "./App.css";
import { Login } from "./views/Login";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./views/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
