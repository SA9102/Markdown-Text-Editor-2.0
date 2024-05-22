// React
import { useState } from "react";

// Custom components
import FileTab from "./FileTab";

// Types
import FolderType from "../types/FolderType";
import FileType from "../types/FileType";

// Mantine
import { ActionIcon, Group } from "@mantine/core";

// Tabler icons
import { IconChevronDown, IconChevronRight, IconFolderFilled, IconFileFilled, IconTrashFilled, IconEdit } from "@tabler/icons-react";

type FolderTabProps = {
  folder: FolderType;
  paddingLeft: number;
  onDelete: (arg0: string[], arg1: string, arg2: string) => void;
  onToggleEdit: (arg0: string[], arg1: string) => void;
  onUpdateName: (arg0: string[], arg1: string, arg2: string) => void;
  onAdd: (arg0: string[], arg1: string, arg2: string) => void;
  onToggleExpand: (arg0: string[], arg1: string) => void;
  onSelectFile: (arg0: string, arg1: string[], arg2: string) => void;
  onAddFileTab: (arg0: string, arg1: string, arg2: string[]) => void;
};

const isFolder = (item: FolderType | FileType): item is FolderType => {
  return (item as FolderType).isExpand !== undefined;
};

const FolderTab = ({ folder, paddingLeft, onUpdateName, onToggleExpand, onToggleEdit, onAddFileTab, onAdd, onDelete, onSelectFile }: FolderTabProps) => {
  const [isHover, setIsHover] = useState(false);
  const [newName, setNewName] = useState(folder.name);
  return (
    <>
      <Group className="folder-tab" style={{ paddingLeft: `${paddingLeft}rem` }} onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}>
        {folder.isEditingName ? (
          <>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <button
              onClick={() => {
                onToggleEdit(folder.parentFolderIds, folder.id);
                onUpdateName(folder.parentFolderIds, folder.id, newName);
              }}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p>
              {folder.isExpand ? (
                <IconChevronDown onClick={() => onToggleExpand(folder.parentFolderIds, folder.id)} />
              ) : (
                <IconChevronRight onClick={() => onToggleExpand(folder.parentFolderIds, folder.id)} />
              )}
              {folder.name}
            </p>
            {isHover && (
              <>
                <ActionIcon color="primary" variant="light" onClick={() => onAdd(folder.parentFolderIds, folder.id, "File")}>
                  <IconFileFilled />
                </ActionIcon>
                <ActionIcon color="primary" variant="light" onClick={() => onAdd(folder.parentFolderIds, folder.id, "Folder")}>
                  <IconFolderFilled />
                </ActionIcon>
                <ActionIcon color="primary" variant="light" onClick={() => onToggleEdit(folder.parentFolderIds, folder.id)}>
                  <IconEdit />
                </ActionIcon>
                <ActionIcon color="primary" variant="light" onClick={() => onDelete(folder.parentFolderIds, folder.id, "folder")}>
                  <IconTrashFilled />
                </ActionIcon>
              </>
            )}
          </>
        )}
      </Group>
      {folder.items.map((item) => {
        if (isFolder(item)) {
          if (folder.isExpand) {
            return (
              <FolderTab
                key={item.id}
                folder={item}
                paddingLeft={paddingLeft + 1}
                onToggleExpand={onToggleExpand}
                onUpdateName={onUpdateName}
                onToggleEdit={onToggleEdit}
                onAddFileTab={onAddFileTab}
                onAdd={onAdd}
                onDelete={onDelete}
                onSelectFile={onSelectFile}
              />
            );
          }
        } else {
          if (folder.isExpand) {
            return (
              <FileTab
                key={item.id}
                file={item}
                paddingLeft={paddingLeft + 1}
                onDelete={onDelete}
                onToggleEdit={onToggleEdit}
                onUpdateName={onUpdateName}
                onAddFileTab={onAddFileTab}
                onSelectFile={onSelectFile}
              />
            );
          }
        }
      })}
    </>
  );
};

export default FolderTab;
