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

export function Login() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Tooth Care Appointment System
      </Title>
      <Text size="md" ta="center" mt={5}>
        Login for Receptionist
      </Text>

      <Text c="dimmed" size="md" ta="center" mt={5}>
        <u>Username: admin - Password: admin</u>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
