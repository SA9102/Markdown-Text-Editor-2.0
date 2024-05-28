import { useContext } from "react";

import { Menu, ActionIcon, rem, useCombobox, Combobox, useMantineColorScheme } from "@mantine/core";
import { IconAdjustments, IconMoon, IconSun } from "@tabler/icons-react";

const SettingsButton = () => {
  const combobox = useCombobox();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon aria-label="Settings" variant="light">
          <IconAdjustments style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        {colorScheme === "dark" ? (
          <Menu.Item onClick={() => setColorScheme("light")} leftSection={<IconSun style={{ width: rem(16), height: rem(16) }} />}>
            Light mode
          </Menu.Item>
        ) : (
          <Menu.Item onClick={() => setColorScheme("dark")} leftSection={<IconMoon style={{ width: rem(16), height: rem(16) }} />}>
            Dark mode
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default SettingsButton;
