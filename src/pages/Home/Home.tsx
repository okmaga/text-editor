import React, { useState } from "react";
import { Button, Box } from "@mantine/core";
import Markdown from "react-markdown";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const Home: React.FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState("Initial value");

  const onChange = (value: string) => {
    setValue(value);
  };

  const handleClick = () => {
    setEditMode((m) => !m);
  };
  return (
    <div>
      <Box>
        {!editMode && <Markdown>{value}</Markdown>}
        <Button onClick={handleClick}>Submit</Button>
        <SimpleMdeReact value={value} onChange={onChange} />
      </Box>
    </div>
  );
};

export default Home;
