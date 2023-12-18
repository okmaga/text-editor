import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import {
  Button,
  Stack,
  TextInput,
  Box,
  PasswordInput,
  Text
} from "@mantine/core";
import { useAuth } from "../../../context/AuthProvider";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentialsError, setCredentialsError] = useState();

  const form = useForm({
    initialValues: {
      email: "",
      password: ""
    }
  });

  const handleSubmit = async () => {
    try {
      await login(form.values);
      navigate("/");
    } catch (e) {
      setCredentialsError(e.message);
    }
  };

  const handleChange = () => {
    setCredentialsError(undefined);
  };

  return (
    <Box
      component="form"
      maw={400}
      mx="xl"
      onSubmit={form.onSubmit(handleSubmit)}
      onChange={handleChange}
    >
      <TextInput
        label="Email"
        withAsterisk
        mt="md"
        size="md"
        radius="md"
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Password"
        withAsterisk
        mt="md"
        size="md"
        radius="md"
        {...form.getInputProps("password")}
      />

      <Stack h="100" justify="center" align="center">
        <Button
          disabled={credentialsError}
          size="md"
          color="gray"
          type="submit"
          fullWidth
        >
          Log in
        </Button>
      </Stack>
      {credentialsError && <Text color="red">{credentialsError}</Text>}
    </Box>
  );
};

export default LoginForm;
