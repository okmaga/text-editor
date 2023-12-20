import { NavLink, useNavigate } from "react-router-dom";
import classes from "./NavProfile.module.css";
import { useAuth } from "../../../context/AuthProvider";
import { UnstyledButton, Text, Avatar, Group, Menu, rem } from "@mantine/core";
import { IconLogout, IconChevronDown } from "@tabler/icons-react";

export const NavProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <span className="nav-profile">
      {!user && (
        <>
          <NavLink className={classes.link} to={"/login"}>
            Log in
          </NavLink>
        </>
      )}

      {user && (
        <Menu shadow="md">
          <Menu.Target>
            <UnstyledButton>
              <Group gap={7}>
                <Avatar alt={user.name} radius="xl" size={30} />
                <Text fw={500} size="sm" lh={1} mr={3}>
                  {user.email}
                </Text>
                <IconChevronDown
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconLogout
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
              onClick={() => logout()}
            >
              Log out!
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </span>
  );
};
