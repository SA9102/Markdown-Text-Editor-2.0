// Mantine
import { Group, SegmentedControl, ActionIcon, useMantineColorScheme, Divider, VisuallyHidden, Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

// Tabler Icons
import { IconDatabaseImport, IconDeviceFloppy, IconEye, IconFileImport, IconFolderOpen, IconLogout2, IconMoon, IconPencil, IconPencilOff, IconSun } from "@tabler/icons-react";

// Components
import SelectRecentFileButton from "./SelectRecentFileButton";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";

// Utils
import iconStyle from "../utils/iconStyle";

const Toolbar = ({
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
  editorOnLargeScreen,
  setEditorOnLargeScreen,
}) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isMobile = useMediaQuery("(max-width:36em)");

  const buttonSize = isMobile ? "sm" : "md";

  const editorOrViewerComponent = (
    <SegmentedControl
      hiddenFrom="xl"
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
    <>
      <Group align="center" gap="xs" m="0" p="xs">
        <SelectRecentFileButton recentFileTabs={recentFileTabs} onSelectFile={onSelectFile} />

        {editorOrViewerComponent}
        <ActionIcon color="cyan.8" visibleFrom="xl" onClick={() => setEditorOnLargeScreen(!editorOnLargeScreen)}>
          {editorOnLargeScreen ? <IconPencil style={iconStyle} /> : <IconPencilOff style={iconStyle} />}
        </ActionIcon>
        <Divider orientation="vertical" />
        {isLoggedIn ? (
          <>
            <Tooltip label="Save to state">
              <ActionIcon size={buttonSize} color="pink.8" onClick={onSaveToState}>
                <IconDeviceFloppy style={iconStyle} />
              </ActionIcon>
            </Tooltip>
            {canSaveToDB ? (
              <Tooltip label="Save to account">
                <ActionIcon size={buttonSize} color="pink.8" onClick={onSaveToDB}>
                  <IconDatabaseImport style={iconStyle} />
                </ActionIcon>
              </Tooltip>
            ) : (
              <Tooltip label="Save To State">
                <ActionIcon size={buttonSize} disabled color="pink.8" onClick={onSaveToDB}>
                  <IconDatabaseImport style={iconStyle} />
                </ActionIcon>
              </Tooltip>
            )}
            <Tooltip label="Import last-saved files">
              <ActionIcon size={buttonSize} color="pink.8" onClick={onFetchFromDB}>
                <IconFileImport style={iconStyle} />
              </ActionIcon>
            </Tooltip>
            <Divider orientation="vertical" />
            <Tooltip label="Log out">
              <ActionIcon size={buttonSize} color="orange.8" onClick={onLogout}>
                <IconLogout2 style={iconStyle} />
              </ActionIcon>
            </Tooltip>
          </>
        ) : (
          <>
            <LoginButton setIsLoggedIn={setIsLoggedIn} />
            <RegisterButton setIsLoggedIn={setIsLoggedIn} />
          </>
        )}
        <Divider orientation="vertical" />

        <ActionIcon size={buttonSize} color={colorScheme === "light" ? "dark.7" : "gray.7"} onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}>
          {colorScheme === "light" ? <IconMoon style={iconStyle} /> : <IconSun style={iconStyle} />}
        </ActionIcon>
      </Group>
    </>
  );
};

export default Toolbar;
