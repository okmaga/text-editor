import { useForm, matchesField, isEmail, hasLength } from "@mantine/form";
import { Button, Stack, TextInput, Box, PasswordInput } from "@mantine/core";
import { useAuth } from "../../../context/AuthProvider";

const RegisterForm: React.FC = () => {
  const { signup } = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },

    validate: {
      email: isEmail("Invalid email"),
      password: hasLength(
        { min: 3, max: 30 },
        "Password must be 3-30 characters long"
      ),
      confirmPassword: matchesField("password", "Passwords are not the same")
    }
  });

  const handleSubmit = () => {
    signup(form.values);
  };

  return (
    <Box
      component="form"
      maw={400}
      mx="xl"
      onSubmit={form.onSubmit(handleSubmit)}
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
      <PasswordInput
        label="Confirm password"
        withAsterisk
        size="md"
        radius="md"
        mt="md"
        {...form.getInputProps("confirmPassword")}
      />

      <Stack h="100" justify="center" align="center">
        <Button size="md" color="gray" type="submit" fullWidth>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterForm;