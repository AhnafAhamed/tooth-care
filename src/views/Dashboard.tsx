import { AppointmentList } from "../components/AppointmentList";
import { DashboardLayout } from "../components/DashboardLayout";

export function Dashboard() {
  return (
    <DashboardLayout>
      <AppointmentList></AppointmentList>
    </DashboardLayout>
  );
}
