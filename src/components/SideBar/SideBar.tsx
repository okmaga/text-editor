import React from "react";
import { ScrollArea, Loader, Flex } from "@mantine/core";
import { useNotes } from "../../context/NotesProvider";
import { NoteCard } from "../NoteCard";

const SideBar: React.FC = () => {
  const { notes } = useNotes();

  if (!notes) {
    return (
      <Flex justify="center">
        <Loader size="sm" color="gray" />
      </Flex>
    );
  }

  return (
    <ScrollArea>
      {notes.map((note, index) => (
        <NoteCard key={index} note={note} />
      ))}
    </ScrollArea>
  );
};

export default SideBar;
