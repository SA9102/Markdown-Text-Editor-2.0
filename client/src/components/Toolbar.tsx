import { Group, SegmentedControl, Button, ActionIcon, useMantineColorScheme, rem } from "@mantine/core";

import { IconFolderOpen } from "@tabler/icons-react";
import SettingsButton from "./SettingsButton";

const Toolbar = ({ fileExplorerOpened, onToggle, editorOrViewer, setEditorOrViewer }) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <Group align="center" gap="xs" m="0" p="xs" bg={colorScheme === "light" ? "dark.1" : "dark"}>
      <ActionIcon onClick={onToggle} aria-label="File Explorer Drawer">
        <IconFolderOpen style={{ width: rem(16), height: rem(16) }} />
      </ActionIcon>
      <SegmentedControl
        withItemsBorders={false}
        size="xs"
        value={editorOrViewer}
        onChange={setEditorOrViewer}
        bg={colorScheme === "light" ? "dark.2" : "dark.9"}
        data={[
          { label: "Editor", value: "editor" },
          { label: "Viewer", value: "viewer" },
        ]}
      />

      <SettingsButton />
      {/* <Button bg="red.5" size="xs" variant="outline"> */}
      {/* <Button size="compact-sm">Login</Button>
          <Button size="compact-sm">Register</Button> */}
      <Button.Group>
        <Button size="xs">Login</Button>
        <Button size="xs">Register</Button>
      </Button.Group>
    </Group>
  );
};

export default Toolbar;
