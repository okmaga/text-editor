import React from "react";
import { Button, Box, Progress } from "@mantine/core";
import useMockData from "../../utils/mockData";

const Home: React.FC = () => {
  const { error, initialize, progress, status } = useMockData();

  const handleClick = () => {
    console.log("lgo");
    initialize();
  };
  return (
    <div>
      <h1>Welcome</h1>
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

export default Home;
