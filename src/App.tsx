import "@mantine/core/styles.css";
import "./App.css";
import { Login } from "./views/Login";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./views/Dashboard";
import { Receptionist } from "./services/Receptionist";

function App() {
  const receptionistData = {
    id: 122,
    name: "Gayani",
    age: 24,
    address: "230/1, Galle Road, Colombo 03",
    phoneNumber: 7761234567,
    nic: "20000990889",
    employeeId: 344,
    receptionistId: 1,
  };
  const receptionistGayani = new Receptionist(
    receptionistData.id,
    receptionistData.name,
    receptionistData.age,
    receptionistData.address,
    receptionistData.phoneNumber,
    receptionistData.nic,
    receptionistData.employeeId,
    receptionistData.receptionistId
  );

  receptionistGayani.setReceptionistId(334);
  receptionistGayani.setPassword("admin");

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login receptionist={receptionistGayani} />}
      />
      <Route
        path="/"
        element={<Dashboard receptionist={receptionistGayani} />}
      />
    </Routes>
  );
}

export default App;
