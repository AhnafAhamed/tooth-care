import "@mantine/core/styles.css";
import "./App.css";
import { Auth } from "./views/Auth";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./views/Dashboard";
import { Receptionist } from "./services/Receptionist";

function App() {
  const [receptionist, setReceptionist] = useState<Receptionist | undefined>(
    undefined
  );
  const handleReceptionist = (receptionist: Receptionist | undefined) => {
    setReceptionist(receptionist);
    console.log(receptionist);
  };
  return (
    <Routes>
      <Route
        path="/auth"
        element={<Auth getReceptionist={handleReceptionist} />}
      />
      <Route path="/" element={<Dashboard receptionist={receptionist} />} />
    </Routes>
  );
}

export default App;
