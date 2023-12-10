import {
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  rem,
  Button,
  Flex,
  TextInput,
  Modal,
  NativeSelect,
  SimpleGrid,
  Switch,
  Title,
  Center,
  Stack,
  MultiSelect,
} from "@mantine/core";
import { DateInput, DateTimePicker, DateValue } from "@mantine/dates";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Dentist } from "../services/Dentist";
import { useForm } from "@mantine/form";
import { Patient } from "../services/Patient";
import { Appointment } from "../services/Appointment";
import { AppointmentManager } from "../services/AppointmentManager";
import { treatments } from "../services/TreatmentFactory";

type AppointmentListProps = {
  dentists: Dentist[];
};

const appointmentManager = AppointmentManager.getInstance();

export function AppointmentList({ dentists }: AppointmentListProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [invoiceModal, { open: openInvoiceModal, close: closeInvoiceModal }] =
    useDisclosure(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();
  const [treatmentNames, setTreatmentNames] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);

  const rows =
    appointments.length === 0 ? (
      <Table.Tr>
        <Table.Td colSpan={5}>
          <Text ta="center">No appointments found</Text>
        </Table.Td>
      </Table.Tr>
    ) : (
      appointments.map((appointment) => (
        <Table.Tr key={appointment.getId()}>
          <Table.Td align="left">
            <Group gap="sm">
              <Text fz="sm" fw={500}>
                {appointment.getId()}
              </Text>
            </Group>
          </Table.Td>

          <Table.Td align="left">
            <Text fz="sm" fw={500}>
              {appointment.getPatientName()}
            </Text>
          </Table.Td>
          <Table.Td align="left">
            <Text fz="sm" fw={500}>
              {appointment.getDentistName()}
            </Text>
          </Table.Td>
          <Table.Td align="left">
            <Text fz="sm">{appointment.getPatientPhone()}</Text>
          </Table.Td>
          <Table.Td>
            <Group gap={0} justify="flex-end">
              {appointment.getIsTreatmentPaid() ? (
                <Badge color="green" variant="light">
                  PAID
                </Badge>
              ) : (
                <Badge
                  color="cyan"
                  variant="light"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleAppointmentPayment(appointment.getId())}
                >
                  Accept Payment
                </Badge>
              )}
              <ActionIcon variant="subtle" color="gray">
                <IconPencil
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                  onClick={() => handleEditClick(appointment.getId())}
                />
              </ActionIcon>
              <ActionIcon variant="subtle" color="red">
                <IconTrash
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>
          </Table.Td>
        </Table.Tr>
      ))
    );

  const appointmentForm = useForm({
    initialValues: {
      dentist: dentists[0],
      patientName: "",
      patientAge: "",
      patientAddress: "",
      patientPhone: "",
      patientNIC: "",
      patientRegistrationFee: false,
      appointmentTime: "",
      treatments: [treatments[0]],
    },
  });

  const addAppointment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const patient = new Patient(
      appointmentForm.values.patientName,
      parseInt(appointmentForm.values.patientAge),
      appointmentForm.values.patientAddress,
      parseInt(appointmentForm.values.patientPhone),
      appointmentForm.values.patientNIC
    );

    const appointment = new Appointment(
      appointmentForm.values.appointmentTime,
      patient,
      appointmentForm.values.dentist
    );
    appointment.payRegistration();
    appointment.setTreatment(appointmentForm.values.treatments);
    appointmentManager.addAppointment(appointment);

    setAppointments(appointmentManager.getAllAppointments());

    console.log(appointmentManager.getAllAppointments());
  };

  const editAppointment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    appointmentManager.editAppointment(
      selectedAppointment?.getId() || 0,
      appointmentForm.values.appointmentTime,
      appointmentForm.values.patientName,
      parseInt(appointmentForm.values.patientAge),
      appointmentForm.values.patientAddress,
      parseInt(appointmentForm.values.patientPhone),
      appointmentForm.values.patientNIC,
      appointmentForm.values.dentist,
      appointmentForm.values.treatments
    );

    setAppointments(appointmentManager.getAllAppointments());
  };

  const handleFilterByAppointmentId = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(appointmentManager.getAllAppointments());
    const appointmentId: number = parseInt(e.target.value);
    const appointment = appointmentManager.getAppointmentById(appointmentId);
    if (appointment) {
      setAppointments([appointment]);
    } else {
      setAppointments(appointmentManager.getAllAppointments());
    }
  };

  const handleFilterByAppointmentDate = (value: DateValue) => {
    if (value) {
      const filteredAppointments =
        appointmentManager.getAppointmentByDate(value);
      if (!filteredAppointments) return;
      setAppointments(filteredAppointments);
    } else {
      setAppointments(appointmentManager.getAllAppointments());
    }
  };

  const handleAppointmentPayment = (appointmentId: number) => {
    setSelectedAppointment(
      appointmentManager.getAppointmentById(appointmentId)
    );
    openInvoiceModal();
  };

  const handleEditClick = (appointmentId: number) => {
    setSelectedAppointment(
      appointmentManager.getAppointmentById(appointmentId)
    );
    setEditMode(true);

    const selectedAppointment =
      appointmentManager.getAppointmentById(appointmentId);

    if (!selectedAppointment) return;
    appointmentForm.setValues({
      ...appointmentForm.values,
      dentist: selectedAppointment.dentist,
      patientName: selectedAppointment.patient.name,
      patientAge: selectedAppointment.patient.age.toString(),
      patientAddress: selectedAppointment.patient.address,
      patientPhone: selectedAppointment.patient.phone.toString(),
      patientNIC: selectedAppointment.patient.NIC,
      patientRegistrationFee: selectedAppointment.getIsRegistrationPaid(),
      appointmentTime: selectedAppointment.time,
      treatments: selectedAppointment.getTreatments() || [],
    });
    open();
  };

  useEffect(() => {
    appointmentForm.setValues({
      ...appointmentForm.values,
      dentist: dentists[0],
    });
  }, [dentists]);

  useEffect(() => {
    const uniqueTreatmentNames = new Set(treatmentNames);

    treatments.forEach((treatment) => {
      uniqueTreatmentNames.add(treatment.name);
    });

    setTreatmentNames([...uniqueTreatmentNames]);
  }, [treatments]);

  useEffect(() => {
    if (opened) return;
    setEditMode(false);
  }, [opened]);

  return (
    <div>
      <Flex justify="space-between" align="flex-end" mb={60} mt={48}>
        {" "}
        <DateInput
          onChange={handleFilterByAppointmentDate}
          label="Filter by date"
          placeholder="Enter date"
          clearable
        />
        <TextInput
          label="Filter by Appointment ID"
          type="number"
          placeholder="Search"
          onChange={handleFilterByAppointmentId}
        />
        <Button onClick={open}>Make Appointment</Button>
      </Flex>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm" striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Appointment ID</Table.Th>
              <Table.Th>Patient</Table.Th>
              <Table.Th>Doctor</Table.Th>
              <Table.Th>Patient Phone</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Modal
        opened={opened}
        onClose={close}
        title={editMode ? "Edit Appointment" : "Make Appointment"}
        centered
        size="xl"
      >
        {appointmentForm.values.dentist ? (
          <form onSubmit={editMode ? editAppointment : addAppointment}>
            <NativeSelect
              label="Select Dentist"
              onChange={(event) => {
                dentists.find((dentist) => {
                  if (dentist.name === event.currentTarget.value) {
                    appointmentForm.setValues({
                      ...appointmentForm.values,
                      dentist: dentist,
                    });
                  }
                });
              }}
              data={dentists.map((dentist) => ({
                value: dentist.name,
                label: dentist.name,
              }))}
            />
            <MultiSelect
              data={treatmentNames}
              label="Select Treatments"
              placeholder="Select Treatments"
              value={appointmentForm.values.treatments.map(
                (treatment) => treatment.name
              )}
              onChange={(event) => {
                const selectedTreatments = treatments.filter((treatment) =>
                  event.includes(treatment.name)
                );
                if (selectedTreatments.length > 0) {
                  appointmentForm.setValues((values) => ({
                    ...values,
                    treatments: selectedTreatments,
                  }));
                }
              }}
            />
            <Text mt={16} fw={500} size="sm">
              Availability
            </Text>
            <SimpleGrid cols={4}>
              {appointmentForm.values?.dentist
                ?.getSchedules()
                .map((schedule) => {
                  return (
                    <Button
                      key={schedule.day}
                      variant="light"
                      color="blue"
                      fullWidth
                      mt="md"
                      radius="md"
                    >
                      {schedule.day} <br />
                      {schedule.startTime} - {schedule.endTime}
                    </Button>
                  );
                })}
            </SimpleGrid>
            <DateTimePicker
              mt={16}
              label="Pick date and time"
              placeholder="Pick date and time"
              {...appointmentForm.getInputProps("appointmentTime")}
            />
            <TextInput
              mt={16}
              label="Patient Name"
              placeholder="Enter Patient Name"
              {...appointmentForm.getInputProps("patientName")}
              required
            />
            <TextInput
              mt={16}
              type="number"
              label="Patient Age"
              placeholder="Enter Patient Age"
              {...appointmentForm.getInputProps("patientAge")}
              required
            />
            <TextInput
              mt={16}
              label="Patient Address"
              placeholder="Enter Patient Address"
              {...appointmentForm.getInputProps("patientAddress")}
              required
            />
            <TextInput
              mt={16}
              label="Patient Phone"
              type="number"
              placeholder="Enter Patient Phone"
              {...appointmentForm.getInputProps("patientPhone")}
              required
            />
            <TextInput
              mt={16}
              label="Patient NIC"
              placeholder="Enter Patient NIC"
              {...appointmentForm.getInputProps("patientNIC")}
              required
            />
            <Switch
              mt={16}
              required
              {...appointmentForm.getInputProps("patientRegistrationFee")}
              label="Regestration Fee of 1000/= received"
            />
            <Button fullWidth mt="xl" type="submit">
              {editMode ? "Edit Appointment" : "Make Appointment"}
            </Button>
          </form>
        ) : (
          <Text ta="center" size="md" c="red">
            Please add atleast 1 dentist inorder to make an appointment
          </Text>
        )}
      </Modal>
      <Modal
        opened={invoiceModal}
        onClose={closeInvoiceModal}
        title="Accept Payment"
        centered
        size="xl"
      >
        <Center>
          {selectedAppointment && (
            <Stack>
              <Title>Invoice</Title>
              <Table
                verticalSpacing="sm"
                striped
                withTableBorder
                withColumnBorders
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Appointment ID</Table.Th>
                    <Table.Th>Patient</Table.Th>
                    <Table.Th>Dentist</Table.Th>
                    <Table.Th>Treatment</Table.Th>
                    <Table.Th>Fee</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>{selectedAppointment?.getId()}</Table.Td>
                    <Table.Td>{selectedAppointment?.getPatientName()}</Table.Td>
                    <Table.Td>{selectedAppointment?.getDentistName()}</Table.Td>
                    <Table.Td>
                      {selectedAppointment.getTreatments()?.map((treatment) => {
                        return (
                          <Text>
                            {treatment.name} <br />
                          </Text>
                        );
                      })}
                    </Table.Td>
                    <Table.Td>
                      {selectedAppointment.getTreatments()?.map((treatment) => {
                        return (
                          <Text>
                            - {treatment.cost} /= <br />
                          </Text>
                        );
                      })}
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td colSpan={3}>
                      <Text size="lg" fw={700}>
                        Total
                      </Text>
                    </Table.Td>
                    <Table.Td colSpan={2}>
                      <Text size="xl" fw={700} ta="right">
                        {selectedAppointment.getAppointmentFee()}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
              <Button
                fullWidth
                mt="xl"
                color="green"
                onClick={() => {
                  appointmentManager.payAppointment(
                    selectedAppointment.getId()
                  );
                  setAppointments(appointmentManager.getAllAppointments());
                  closeInvoiceModal();
                }}
              >
                Accept Payment
              </Button>
            </Stack>
          )}
        </Center>
      </Modal>
    </div>
  );
}
