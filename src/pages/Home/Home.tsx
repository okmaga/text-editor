import React, { useMemo } from "react";
import { Button, Box } from "@mantine/core";
import Markdown from "react-markdown";
import SimpleMdeReact from "react-simplemde-editor";
import SimpleMDE from "easymde";
import "easymde/dist/easymde.min.css";
import { useNotes } from "../../context/NotesProvider";
import { Note } from "../../types/custom";

const Home: React.FC = () => {
  const { currentNote, editMode, setEditMode, updateNote, setCurrentNote } =
    useNotes();

  const options = useMemo(() => {
    return {
      autosave: {
        enabled: true,
        uniqueId: "MyUniqueID",
        delay: 1000,
        submit_delay: 5000,
        timeFormat: {
          locale: "en-US",
          format: {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          }
        },
        text: "Autosaved: "
      },
      status: ["autosave"],
      indentWithTabs: true,
      minHeight: "500px",
      hideIcons: ["guide", "heading"]
    } as SimpleMDE.Options;
  }, []);

  const handleEdit = () => {
    setEditMode((m) => !m);
  };

  const handleSave = () => {
    setEditMode((m) => !m);
    if (currentNote) {
      updateNote(currentNote);
    }
  };

  const onChange = (value: string) => {
    setCurrentNote((prev: Note | null) => {
      if (prev === null) {
        return prev;
      }
      return {
        ...prev,
        body: value,
        timestamp: Date.now()
      };
    });
  };

  return (
    <div>
      <Box>
        {!editMode && currentNote && <Markdown>{currentNote?.body}</Markdown>}
        {!editMode && currentNote && <Button onClick={handleEdit}>Edit</Button>}
        {editMode && (
          <>
            <SimpleMdeReact
              options={options}
              value={currentNote?.body}
              onChange={onChange}
            />
            <Button onClick={handleSave}>Save</Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default Home;
