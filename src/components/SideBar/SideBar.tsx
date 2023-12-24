import React from "react";
import { ScrollArea, Loader, Flex } from "@mantine/core";
import { useNotes } from "../../context/NotesProvider";
import { NoteCard } from "../NoteCard";
import { Note } from "../../types/custom";

const SideBar: React.FC = () => {
  const { notes, setCurrentNote } = useNotes();

  const handleClick = (note: Note) => {
    setCurrentNote(note);
  };

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
        <NoteCard key={index} note={note} onClick={() => handleClick(note)} />
      ))}
    </ScrollArea>
  );
};

export default SideBar;
