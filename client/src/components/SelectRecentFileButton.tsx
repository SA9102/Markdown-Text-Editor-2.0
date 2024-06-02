// Mantine
import { ActionIcon, Button, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

// Tabler Icons
import { IconFileTime } from "@tabler/icons-react";

const SelectRecentFileButton = ({ recentFileTabs, onSelectFile }) => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <ActionIcon color="cyan.8" aria-label="Select recently-opened file" onClick={open}>
        <IconFileTime style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
      <Modal
        opened={opened}
        onClose={close}
        title="Select recently-opened file"
        transitionProps={{ transition: "fade", duration: 200, timingFunction: "ease" }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Stack>
          {recentFileTabs.length > 0 ? (
            recentFileTabs.map((file) => {
              return (
                <Button
                  key={file.id}
                  onClick={() => {
                    onSelectFile(file.id, file.parentFolderIds, file.name);
                    close();
                  }}
                >
                  {file.name}
                </Button>
              );
            })
          ) : (
            <Text size="sm">No recently-opened files.</Text>
          )}
        </Stack>
      </Modal>
    </>
  );
};

export default SelectRecentFileButton;
