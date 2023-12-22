import React from "react";
import {
  Button,
  Box,
  Progress,
  TextInput,
  Textarea,
  Group
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useMockData from "../../utils/mockData";
import { useAuth } from "../../context/AuthProvider";
import { useNotes } from "../../context/NotesProvider";

const Home: React.FC = () => {
  const { error, initialize, progress, status } = useMockData();
  const { user } = useAuth();

  const { createNote } = useNotes();

  const form = useForm({
    initialValues: {
      title: "",
      body: ""
    }
  });

  const handleClick = () => {
    initialize();
  };

  const handleSubmit = (values) => {
    createNote(values);
  };
  return (
    <div>
      {user && <h2>Welcome, {user.email}!</h2>}
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {<Progress value={progress} />}</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <Box>
        <Button onClick={handleClick}>load mock posts</Button>
      </Box>
      <Box>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput {...form.getInputProps("title")} />
          <Textarea {...form.getInputProps("body")} />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default Home;
