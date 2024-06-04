// React
import { useState } from "react";

// Components
import FileTab from "./FileTab";

// Types
import FolderType from "../types/FolderType";
import FileType from "../types/FileType";
import { onDelete, onToggleEdit, onUpdateName, onAdd, onToggleExpand, onSelectFile, onAddFileTab } from "../types/crudFunctionsTypes";

// Mantine
import { Group, TextInput, Text, Button, Divider } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

// Tabler icons
import { IconFolder, IconFolderOpen } from "@tabler/icons-react";
import FolderEditOptions from "./FolderEditOptions";

type FolderTabProps = {
  folder: FolderType;
  selectedFileId: string | undefined;
  paddingLeft: number;
  onDelete: onDelete;
  onToggleEdit: onToggleEdit;
  onUpdateName: onUpdateName;
  onAdd: onAdd;
  onToggleExpand: onToggleExpand;
  onSelectFile: onSelectFile;
  onAddFileTab: onAddFileTab;
};

const isFolder = (item: FolderType | FileType): item is FolderType => {
  return (item as FolderType).isExpand !== undefined;
};

const FolderTab = ({ folder, selectedFileId, paddingLeft, onUpdateName, onToggleExpand, onToggleEdit, onAddFileTab, onAdd, onDelete, onSelectFile }: FolderTabProps) => {
  const [isHover, setIsHover] = useState(false);
  const [newName, setNewName] = useState(folder.name);
  const [newlyCreated, setNewlyCreated] = useState(true);

  return (
    <>
      <Group
        align="center"
        h="2rem"
        style={{ paddingLeft: `${paddingLeft}rem`, cursor: "pointer" }}
        onClick={() => onToggleExpand(folder.parentFolderIds, folder.id, folder.isExpand ? false : true)}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        {folder.isEditingName ? (
          <>
            <TextInput
              size="compact-xs"
              w="215px"
              type="text"
              rightSection={
                newlyCreated ? (
                  <Button.Group>
                    <Button
                      variant="transparent"
                      size="compact-xs"
                      onClick={() => {
                        if (newName.trim() !== "") {
                          onToggleEdit(folder.parentFolderIds, folder.id);
                          onUpdateName(folder.parentFolderIds, folder.id, newName);
                          setNewlyCreated(false);
                        }
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="transparent"
                      size="compact-xs"
                      onClick={() => {
                        onDelete(folder.parentFolderIds, folder.id, "Folder");
                      }}
                    >
                      Cancel
                    </Button>
                  </Button.Group>
                ) : (
                  <Button
                    variant="transparent"
                    size="compact-xs"
                    onClick={() => {
                      if (newName.trim() !== "") {
                        onToggleEdit(folder.parentFolderIds, folder.id);
                        onUpdateName(folder.parentFolderIds, folder.id, newName);
                      }
                    }}
                  >
                    Save
                  </Button>
                )
              }
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </>
        ) : (
          <Group justify="space-between" w="100%">
            <Group>
              {folder.isExpand ? <IconFolderOpen size="1rem" /> : <IconFolder size="1rem" />}
              <Text size="sm" className="name">
                {folder.name}
              </Text>
            </Group>
            <FolderEditOptions folderId={folder.id} parentFolderIds={folder.parentFolderIds} onEditName={onToggleEdit} onAddItem={onAdd} onDelete={onDelete} onToggleExpand={onToggleExpand} />
          </Group>
        )}
      </Group>
      <Divider />
      {folder.items.map((item) => {
        if (isFolder(item)) {
          if (folder.isExpand) {
            return (
              <FolderTab
                key={item.id}
                selectedFileId={selectedFileId}
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
                selectedFileId={selectedFileId}
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
