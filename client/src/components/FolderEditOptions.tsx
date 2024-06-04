// Mantine
import { ActionIcon, Menu, rem } from "@mantine/core";

// Types
import { onToggleEdit, onAdd, onDelete, onToggleExpand } from "../types/crudFunctionsTypes";

// Tabler Icons
import { IconDotsVertical, IconFile, IconFolder, IconTrash, IconCursorText } from "@tabler/icons-react";

// Utils
import iconStyle from "../utils/iconStyle";

type props = {
  folderId: string;
  parentFolderIds: string[];
  onEditName: onToggleEdit;
  onAddItem: onAdd;
  onDelete: onDelete;
  onToggleExpand: onToggleExpand;
};

const FolderEditOptions = ({ folderId, parentFolderIds, onEditName, onAddItem, onDelete, onToggleExpand }: props) => {
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
          <Menu.Item onClick={() => onEditName(parentFolderIds, folderId)} leftSection={<IconCursorText style={iconStyle} />}>
            Rename
          </Menu.Item>

          <Menu.Item
            onClick={() => {
              onToggleExpand(parentFolderIds, folderId, true);
              onAddItem(parentFolderIds, folderId, "File");
            }}
            leftSection={<IconFile style={iconStyle} />}
          >
            Add File
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              onToggleExpand(parentFolderIds, folderId, true);
              onAddItem(parentFolderIds, folderId, "Folder");
            }}
            leftSection={<IconFolder style={iconStyle} />}
          >
            Add Folder
          </Menu.Item>
          <Menu.Item onClick={() => onDelete(parentFolderIds, folderId, "Folder")} color="red" leftSection={<IconTrash style={iconStyle} />}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default FolderEditOptions;
