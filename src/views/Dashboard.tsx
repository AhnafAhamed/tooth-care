import { useEffect } from "react";
import { AppointmentList } from "../components/AppointmentList";
import { DashboardLayout } from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Receptionist } from "../services/Receptionist";
import {
  Flex,
  Button,
  Modal,
  SimpleGrid,
  TextInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import TimeSelector from "../components/TimeSelector";
import { Dentist, ISchedule } from "../services/Dentist";
import { DentistManager } from "../services/DentistManager";

type DashboardProps = {
  receptionist: Receptionist | undefined;
};

const dentistManager = new DentistManager();

export function Dashboard({ receptionist }: DashboardProps) {
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  const dentistForm = useForm({
    initialValues: {
      dentistId: "",
      slmcId: "",
      name: "",
      age: "",
      address: "",
      phone: "",
      nic: "",
      schedules: [{ day: "", startTime: "", endTime: "" }],
    },
  });

  const handleDentistRegistration = () => {
    dentistForm.validate();
    if (!dentistForm.isValid()) return;
    const newDentist = new Dentist(
      parseInt(dentistForm.values.dentistId),
      dentistForm.values.name,
      parseInt(dentistForm.values.age),
      dentistForm.values.address,
      parseInt(dentistForm.values.phone),
      dentistForm.values.nic
    );
    newDentist.setSchedules(dentistForm.values.schedules);
    newDentist.setSlmcId(dentistForm.values.slmcId);
    dentistManager.registerDentist(newDentist);
  };

  const handleSelectedDays = (selectedDays: ISchedule[]) => {
    dentistForm.setValues({
      ...dentistForm.values,
      schedules: selectedDays,
    });
  };

  useEffect(() => {
    console.log(dentistForm.values);
  }, [dentistForm.values]);

  useEffect(() => {
    if (!receptionist) {
      navigate("/auth");
    }
  }, []);

  return (
    <DashboardLayout>
      <Flex justify="flex-end">
        <Button variant="light" onClick={open}>
          Add Dentist
        </Button>
      </Flex>

      <AppointmentList></AppointmentList>
      <Modal
        opened={opened}
        onClose={close}
        title="Register - Dentist"
        centered
        size="2xl"
      >
        <form onSubmit={handleDentistRegistration}>
          <SimpleGrid cols={2} spacing={10}>
            <TextInput
              label="Dentist ID"
              type="number"
              placeholder="Enter ID"
              {...dentistForm.getInputProps("dentistId")}
              required
            />
            <TextInput
              label="SLMC ID"
              placeholder="Enter SLMC ID"
              {...dentistForm.getInputProps("slmcId")}
              required
            />
            <TextInput
              label="Name"
              placeholder="Enter Name"
              {...dentistForm.getInputProps("name")}
              required
            />
            <TextInput
              label="Age"
              placeholder="Enter Age"
              {...dentistForm.getInputProps("age")}
              required
            />
            <TextInput
              label="Address"
              placeholder="Enter Address"
              {...dentistForm.getInputProps("address")}
              required
            />
            <TextInput
              label="Phone"
              placeholder="Enter Phone Number"
              {...dentistForm.getInputProps("phone")}
              required
            />
            <TextInput
              label="NIC"
              placeholder="Enter NIC"
              {...dentistForm.getInputProps("nic")}
              required
            />
          </SimpleGrid>
          <Text ta="center" mt="md">
            Schedule
          </Text>
          <TimeSelector getSelectedDays={handleSelectedDays} />
          <Button fullWidth mt="xl" type="submit">
            Register
          </Button>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
