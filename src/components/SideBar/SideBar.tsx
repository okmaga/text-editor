import React from "react";
import { ScrollArea, Loader, Flex } from "@mantine/core";
import { useNotes } from "../../context/NotesProvider";
import { NoteCard } from "../NoteCard";
import { Note } from "../../types/custom";

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
      {notes.map((note: Note, index: number) => (
        <NoteCard key={index} note={note} />
      ))}
    </ScrollArea>
  );
};

export default SideBar;
