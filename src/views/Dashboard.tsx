import { useEffect } from "react";
import { AppointmentList } from "../components/AppointmentList";
import { DashboardLayout } from "../components/DashboardLayout";
import { Receptionist } from "../services/Receptionist";
import { useNavigate } from "react-router-dom";

type DashboardProps = {
  receptionist: Receptionist;
};

export function Dashboard({ receptionist }: DashboardProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!receptionist.getIsAuthenticated()) {
      navigate("/login");
    }
  });

  return (
    <DashboardLayout>
      <AppointmentList></AppointmentList>
    </DashboardLayout>
  );
}
