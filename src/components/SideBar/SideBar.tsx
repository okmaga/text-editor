import React from "react";
import { Skeleton } from "@mantine/core";

const SideBar: React.FC = () => {
  return (
    <>
      {Array(15)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} h={28} mt="sm" animate={false} />
        ))}
    </>
  );
};

export default SideBar;
