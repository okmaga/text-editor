import React from "react";
import { Button, Box, Progress } from "@mantine/core";
import useMockData from "../../utils/mockData";
import { useAuth } from "../../context/AuthProvider";

const Home: React.FC = () => {
  const { error, initialize, progress, status } = useMockData();
  const { user } = useAuth();

  const handleClick = () => {
    initialize();
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
    </div>
  );
};

export default Home;
