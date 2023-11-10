import { useEffect } from "react";
import { AppointmentList } from "../components/AppointmentList";
import { DashboardLayout } from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Receptionist } from "../services/Receptionist";

type DashboardProps = {
  receptionist: Receptionist | undefined;
};

export function Dashboard({ receptionist }: DashboardProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!receptionist) {
      navigate("/auth");
    }
  }, []);

  return (
    <DashboardLayout>
      <AppointmentList></AppointmentList>
    </DashboardLayout>
  );
}
