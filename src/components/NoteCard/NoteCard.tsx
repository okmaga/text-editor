import React from "react";
import { Card, Text, Badge, Button, Group, Tooltip } from "@mantine/core";
import { Note } from "../../types/custom";
import { ActionIcon } from "@mantine/core";
import { IconTrash, IconEdit } from "@tabler/icons-react";

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  let noteDate;

  if (note?.timestamp) {
    noteDate = new Date(note?.timestamp).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{note.title}</Text>
        <Badge variant="light" color="gray">
          {noteDate}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {note.body}
      </Text>

      <Group>
        <Button
          leftSection={<IconEdit size={18} />}
          variant="light"
          color="gray"
          w={130}
          radius="md"
        >
          Edit
        </Button>
        <Tooltip label="Delete note">
          <ActionIcon variant="light" color="red" w={50} size="lg" radius="md">
            <IconTrash size={18} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Card>
  );
};

export default NoteCard;
