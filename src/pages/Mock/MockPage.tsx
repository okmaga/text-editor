import React from "react";
import useMockData from "../../utils/mockData";
import { Button, Box, Progress } from "@mantine/core";

export const MockPage: React.FC = () => {
  const { error, initialize, progress, status } = useMockData();
  const handleClick = () => {
    initialize();
  };

  return (
    <div>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {<Progress value={progress} />}</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <Box>
        <Button onClick={handleClick}>load mock posts</Button>
      </Box>
    </div>
  );
};
