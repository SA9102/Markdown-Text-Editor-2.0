import { Group, SegmentedControl, Button, ActionIcon, useMantineColorScheme, rem, Divider, Notification, VisuallyHidden, ScrollArea } from "@mantine/core";

import { IconDatabaseImport, IconDeviceFloppy, IconEye, IconFileImport, IconFolderOpen, IconLogout2, IconPencil } from "@tabler/icons-react";
import SettingsButton from "./SettingsButton";
import SelectRecentFileButton from "./SelectRecentFileButton";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import iconStyle from "../utils/iconStyle";

const Toolbar = ({
  fileExplorerOpened,
  onToggle,
  editorOrViewer,
  setEditorOrViewer,
  recentFileTabs,
  onSelectFile,
  isLoggedIn,
  setIsLoggedIn,
  onSaveToState,
  onSaveToDB,
  onFetchFromDB,
  onLogout,
  canSaveToDB,
}) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const editorOrViewerComponent = (
    <SegmentedControl
      withItemsBorders={false}
      size="xs"
      value={editorOrViewer}
      onChange={setEditorOrViewer}
      data={[
        {
          value: "editor",
          label: (
            <>
              <IconPencil style={iconStyle} />
              <VisuallyHidden>Editor</VisuallyHidden>
            </>
          ),
        },
        {
          value: "viewer",
          label: (
            <>
              <IconEye style={iconStyle} />
              <VisuallyHidden>Code</VisuallyHidden>
            </>
          ),
        },
      ]}
    />
  );

  return (
    // <ScrollArea.Autosize w="400" h={50}>
    <Group align="center" gap="xs" m="0" p="xs">
      <ActionIcon color="orange.8" onClick={onToggle} aria-label="File Explorer Drawer">
        <IconFolderOpen style={iconStyle} />
      </ActionIcon>
      <SelectRecentFileButton recentFileTabs={recentFileTabs} onSelectFile={onSelectFile} />

      {/* <Button bg="red.5" size="xs" variant="outline"> */}
      {/* <Button size="compact-sm">Login</Button>
          <Button size="compact-sm">Register</Button> */}
      {editorOrViewerComponent}
      <Divider orientation="vertical" />
      {isLoggedIn ? (
        <>
          <ActionIcon color="pink.8" onClick={onSaveToState}>
            <IconDeviceFloppy style={iconStyle} />
          </ActionIcon>
          {canSaveToDB ? (
            <ActionIcon color="pink.8" onClick={onSaveToDB}>
              <IconDatabaseImport style={iconStyle} />
            </ActionIcon>
          ) : (
            <ActionIcon disabled color="pink.8" onClick={onSaveToDB}>
              <IconDatabaseImport style={iconStyle} />
            </ActionIcon>
          )}
          <ActionIcon color="green.8" onClick={onFetchFromDB}>
            <IconFileImport style={iconStyle} />
          </ActionIcon>
          <Divider orientation="vertical" />
          <ActionIcon onClick={onLogout}>
            <IconLogout2 style={iconStyle} />
          </ActionIcon>
        </>
      ) : (
        <>
          <LoginButton setIsLoggedIn={setIsLoggedIn} />
          <RegisterButton setIsLoggedIn={setIsLoggedIn} />
        </>
      )}
      <Divider orientation="vertical" />
      <SettingsButton />
    </Group>
    // </ScrollArea.Autosize>
  );
};

export default Toolbar;
