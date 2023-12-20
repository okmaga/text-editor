import { Burger, Flex, Group } from "@mantine/core";
import { NavProfile } from "./NavProfile";

interface HeaderProps {
  toggleDesktop: () => void;
  toggleMobile: () => void;
  mobileOpened: boolean;
  desktopOpened: boolean;
}

const Header: React.FC<HeaderProps> = ({
  toggleDesktop,
  toggleMobile,
  mobileOpened,
  desktopOpened
}) => {
  return (
    <Flex justify="space-between">
      <Group h="100%" px="md">
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="sm"
          size="sm"
        />
        <Burger
          opened={desktopOpened}
          onClick={toggleDesktop}
          visibleFrom="sm"
          size="sm"
        />
        <h2>notted!</h2>
      </Group>
      <Group>
        <NavProfile />
      </Group>
    </Flex>
  );
};

export default Header;
