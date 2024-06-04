// Mantine
import { ActionIcon, Menu, rem } from "@mantine/core";

// Types
import { onToggleEdit, onDelete } from "../types/crudFunctionsTypes";

// Tabler Icons
import { IconDotsVertical, IconTrash, IconCursorText } from "@tabler/icons-react";

type props = {
  fileId: string;
  parentFolderIds: string[];
  onEditName: onToggleEdit;
  onDelete: onDelete;
};

const FileEditOptions = ({ fileId, parentFolderIds, onEditName, onDelete }: props) => {
  const iconStyle = { width: rem(16), height: rem(16) };

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
    </>
  );
};

export default FileEditOptions;
