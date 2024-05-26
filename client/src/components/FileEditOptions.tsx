// Mantine
import { ActionIcon, Menu, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconTrash, IconCursorText } from "@tabler/icons-react";
import DeletionModal from "./DeletionModal";

const FileEditOptions = ({ fileId, parentFolderIds, onEditName, onDelete }) => {
  const iconStyle = { width: rem(16), height: rem(16) };
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Menu>
        <Menu.Target>
          <ActionIcon variant="transparent">
            <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Options</Menu.Label>
          <Menu.Item onClick={() => onEditName(parentFolderIds, fileId)} leftSection={<IconCursorText style={iconStyle} />}>
            Rename
          </Menu.Item>
          <Menu.Item onClick={() => onDelete(parentFolderIds, fileId, "File")} color="red" leftSection={<IconTrash style={iconStyle} />}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {/* <DeletionModal opened={opened} onClose={close} /> */}
    </>
  );
};

export default FileEditOptions;
