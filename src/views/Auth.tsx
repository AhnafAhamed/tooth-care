import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Modal,
  SimpleGrid,
} from "@mantine/core";
import classes from "./Login.module.css";
import { Receptionist } from "../services/Receptionist";
import { useForm } from "@mantine/form";
import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { ReceptionistManager } from "../services/ReceptionistManager";

const receptionistManager = new ReceptionistManager();

type AuthProps = {
  getReceptionist: (receptionist: Receptionist | undefined) => void;
};

export function Auth({ getReceptionist }: AuthProps) {
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  const loginForm = useForm({
    initialValues: {
      receptionistId: "",
      password: "",
    },
  });

  const registerForm = useForm({
    initialValues: {
      receptionistId: "",
      password: "",
      name: "",
      age: "",
      address: "",
      phone: "",
      nic: "",
    },
  });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginForm.validate();
    if (!loginForm.isValid()) return;
    if (
      !receptionistManager.authenticateReceptionist(
        parseInt(loginForm.values.receptionistId),
        loginForm.values.password
      )
    ) {
      loginForm.setErrors({
        password: "Incorrect Employee ID or Password",
      });
      return;
    }
    const receptionist = receptionistManager.getReceptionistById(
      parseInt(loginForm.values.receptionistId)
    );

    getReceptionist(receptionist);

    //send receptionist to parent component

    navigate("/");
    console.log("Submitted");
  };

  const handleRegistration = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerForm.validate();
    if (!registerForm.isValid()) return;
    const newReceptionist = new Receptionist(
      parseInt(registerForm.values.receptionistId),
      registerForm.values.name,
      parseInt(registerForm.values.age),
      registerForm.values.address,
      parseInt(registerForm.values.phone),
      registerForm.values.nic
    );
    newReceptionist.setPassword(registerForm.values.password);
    receptionistManager.registerReceptionist(newReceptionist);
    registerForm.reset();
    console.log(receptionistManager);
  };

  useEffect(() => {
    const defaultReceptionist = new Receptionist(
      334,
      "Admin",
      30,
      "123 Main St",
      1234567890,
      "1234567890123"
    );
    defaultReceptionist.setPassword("admin");
    receptionistManager.registerReceptionist(defaultReceptionist);
  }, []);

  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Tooth Care Appointment System
        </Title>

        <Text size="md" ta="center" mt={5}>
          Login for Receptionist
        </Text>

        <Text c="dimmed" size="md" ta="center" mt={5}>
          <u>Receptionist ID: 334 - Password: admin</u>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleLogin}>
            <TextInput
              label="Receptionist ID"
              placeholder="Enter ID"
              type="number"
              {...loginForm.getInputProps("receptionistId")}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              {...loginForm.getInputProps("password")}
              required
            />
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
            <Button variant="outline" fullWidth mt="sm" onClick={open}>
              Register - Receptionist
            </Button>
          </form>
        </Paper>
      </Container>
      <Modal
        opened={opened}
        onClose={close}
        title="Register | Receptionist"
        centered
        size="lg"
      >
        <form onSubmit={handleRegistration}>
          <SimpleGrid cols={2} spacing={10}>
            <TextInput
              label="Receptionist ID"
              type="number"
              placeholder="Enter ID"
              {...registerForm.getInputProps("receptionistId")}
              required
            />
            <TextInput
              label="Password"
              placeholder="Enter Password"
              {...registerForm.getInputProps("password")}
              required
            />
            <TextInput
              label="Name"
              placeholder="Enter Name"
              {...registerForm.getInputProps("name")}
              required
            />
            <TextInput
              label="Age"
              placeholder="Enter Age"
              {...registerForm.getInputProps("age")}
              required
            />
            <TextInput
              label="Address"
              placeholder="Enter Address"
              {...registerForm.getInputProps("address")}
              required
            />
            <TextInput
              label="Phone"
              placeholder="Enter Phone Number"
              {...registerForm.getInputProps("phone")}
              required
            />
            <TextInput
              label="NIC"
              placeholder="Enter NIC"
              {...registerForm.getInputProps("nic")}
              required
            />
          </SimpleGrid>
          <Button fullWidth mt="xl" type="submit">
            Register
          </Button>
        </form>
      </Modal>
    </>
  );
}
