import { useState } from "react";
import { AppointmentList } from "../components/AppointmentList";
import { DashboardLayout } from "../components/DashboardLayout";
import { Button, Flex } from "@mantine/core";
import { DateInput } from "@mantine/dates";

export function Dashboard() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <DashboardLayout>
      <Flex justify="space-between">
        {" "}
        <DateInput
          value={date}
          onChange={setDate}
          placeholder="Filter Appointments"
        />
        <Button mb={48}>Make Appointment</Button>
      </Flex>

      <AppointmentList></AppointmentList>
    </DashboardLayout>
  );
}
