import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import classes from "./Login.module.css";
import { Receptionist } from "../services/Receptionist";
import { useForm } from "@mantine/form";
import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  receptionist: Receptionist;
};

export function Login({ receptionist }: LoginProps) {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      receptionistId: "",
      password: "",
    },

    validate: {
      receptionistId: (value: string) =>
        parseInt(value) !== receptionist.getReceptionistId()
          ? "Receptionist ID is incorrect"
          : null,
      password: (value) =>
        value !== receptionist.getPassword() ? "Password is incorrect" : null,
    },
  });

  useEffect(() => {
    console.log(receptionist);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validate();
    console.log(form.values);
    if (!form.isValid()) return;
    receptionist.setIsAuthenticated(true);
    navigate("/");
    console.log("Submitted");
  };

  return (
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
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Receptionist ID"
            placeholder="Enter ID"
            {...form.getInputProps("receptionistId")}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...form.getInputProps("password")}
            required
            mt="md"
          />
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
