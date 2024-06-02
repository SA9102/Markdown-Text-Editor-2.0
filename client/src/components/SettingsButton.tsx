// Mantine
import { Menu, ActionIcon, useMantineColorScheme } from "@mantine/core";

// Tabler Icons
import { IconAdjustments, IconEyeCode, IconMoon, IconPencilCode, IconSun } from "@tabler/icons-react";

// Utils
import iconStyle from "../utils/iconStyle";

const SettingsButton = () => {
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
          <Menu.Item onClick={() => setColorScheme("light")} leftSection={<IconSun style={iconStyle} />}>
            Light mode
          </Menu.Item>
        ) : (
          <Menu.Item onClick={() => setColorScheme("dark")} leftSection={<IconMoon style={iconStyle} />}>
            Dark mode
          </Menu.Item>
        )}
        <Menu.Item onClick={() => {}} leftSection={<IconPencilCode style={iconStyle} />}>
          Editor Font
        </Menu.Item>
        <Menu.Item onClick={() => {}} leftSection={<IconEyeCode style={iconStyle} />}>
          Viewer Font
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default SettingsButton;
