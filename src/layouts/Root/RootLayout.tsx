import { Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";

const RootLayout = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header
          toggleDesktop={toggleDesktop}
          toggleMobile={toggleMobile}
          mobileOpened={mobileOpened}
          desktopOpened={desktopOpened}
        />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <SideBar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default RootLayout;
