// React
import { useState } from "react";

// Types
import FileType from "../types/FileType";
import FileEditOptions from "./FileEditOptions";

// Mantine
import { Button, Divider, Group, Text, TextInput } from "@mantine/core";

type FileTabProps = {
  file: FileType;
  selectedFileId: string | undefined;
  paddingLeft: number;
  onDelete: (arg0: string[], arg1: string, arg2: string) => void;
  onToggleEdit: (arg0: string[], arg1: string) => void;
  onUpdateName: (arg0: string[], arg1: string, arg2: string) => void;
  onSelectFile: (arg0: string, arg1: string[], arg2: string) => void;
  onAddFileTab: (arg0: string, arg1: string, arg2: string[]) => void;
};

const FileTab = ({ file, selectedFileId, paddingLeft, onDelete, onToggleEdit, onAddFileTab, onUpdateName, onSelectFile }: FileTabProps) => {
  const [newName, setNewName] = useState(file.name);
  const [newlyCreated, setNewlyCreated] = useState(true);

  return (
    <>
      <Group className={file.id === selectedFileId ? "file-tab-selected" : "file-tab"} gap="0" h="fit-content" style={{ paddingLeft: `${paddingLeft}rem` }}>
        <Group
          onClick={() => {
            if (!file.isEditingName) {
              onSelectFile(file.id, file.parentFolderIds, file.name);
            }
          }}
          style={{ flexGrow: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {file.isEditingName ? (
            <>
              <TextInput
                size="compact-xs"
                type="text"
                rightSection={
                  newlyCreated ? (
                    <Button.Group>
                      <Button
                        variant="transparent"
                        size="compact-xs"
                        onClick={() => {
                          if (newName.trim() !== "") {
                            onToggleEdit(file.parentFolderIds, file.id);
                            onUpdateName(file.parentFolderIds, file.id, newName);
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
                          onDelete(file.parentFolderIds, file.id, "File");
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
                          onToggleEdit(file.parentFolderIds, file.id);
                          let newNameTrimmed = newName;
                          onUpdateName(file.parentFolderIds, file.id, newName);
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
            <Text size="sm" className="name">
              {file.name}
            </Text>
          )}
        </Group>
        <FileEditOptions fileId={file.id} parentFolderIds={file.parentFolderIds} onEditName={onToggleEdit} onDelete={onDelete} />
      </Group>
      <Divider />
    </>
  );
};

export default FileTab;
